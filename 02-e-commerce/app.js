// Globalne dane
let orders = [];
let processingErrors = [];
let validationResults = {};

// Funkcja dodająca zamówienie
const addOrder = (customerId, items, discount, region) => {
  let order = {
    id: orders.length + 1,
    customerId: customerId,
    items: items,
    discount: discount,
    region: region,
    timestamp: Date.now(),
    processed: false,
  };
  orders.push(order);
  return order;
};

// Walidacja zamówienia
const validateOrder = (order) => {
  let errors = [];

  const customerErrors =
    !order.customerId || order.customerId.length < 3
      ? ["Invalid customer ID"]
      : [];
  errors = [...errors, ...customerErrors];

  const itemsErrors =
    !order.items || order.items.length === 0 ? ["No items in order"] : [];
  errors = [...errors, ...itemsErrors];

  const itemErrors = (order.items || [])
    .map((item) => [
      !item.price || item.price <= 0
        ? `Invalid price for item: ${item.name}`
        : null,
      !item.quantity || item.quantity <= 0
        ? `Invalid quantity for item: ${item.name}`
        : null,
    ])
    .reduce((acc, arr) => acc.concat(arr), [])
    .filter(Boolean);
  errors = [...errors, ...itemErrors];

  const discountErrors =
    order.discount && (order.discount < 0 || order.discount > 100)
      ? ["Invalid discount percentage"]
      : [];
  errors = [...errors, ...discountErrors];

  return { isValid: errors.length === 0, errors };
};

// Obliczanie całkowitej wartości zamówienia
const calculateOrderTotal = (order) => {
  const subtotal = (order.items || []).reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const discountAmount = order.discount ? subtotal * (order.discount / 100) : 0;

  const taxBase = subtotal - discountAmount;
  const tax =
    order.region === "EU"
      ? taxBase * 0.23
      : order.region === "US"
      ? taxBase * 0.08
      : order.region === "Asia"
      ? taxBase * 0.15
      : 0;

  return taxBase + tax;
};

// Przetwarzanie wszystkich zamówień
const processAllOrders = (orders = []) =>
  orders.reduce(
    (acc, order) => {
      if (!order.processed) {
        const isValid = validateOrder(order);

        return isValid
          ? {
              ...acc,
              processed: acc.processed + 1,
              results: [
                ...acc.results,
                {
                  ...order,
                  processed: true,
                  total: calculateOrderTotal(order),
                },
              ],
            }
          : {
              ...acc,
              failed: acc.failed + 1,
              errors: [
                ...acc.errors,
                { orderId: order.id, errors: validationResults[order.id] },
              ],
            };
      }

      return acc;
    },
    { processed: 0, failed: 0, results: [], errors: [] }
  );

// Filtrowanie zamówień według klienta i regionu
const getCustomerOrdersByRegion = (orders, customerId, region) => {
  return orders.filter(
    (order) =>
      order.customerId === customerId &&
      order.region === region &&
      order.processed
  );
};

// Obliczanie statystyk sprzedaży według regionów
const calculateRegionalStats = (orders) => {
  const byRegion = (orders || [])
    .filter((order) => order && order.processed)
    .reduce((acc, order) => {
      const region = order.region;
      const prev = acc[region] || {
        totalRevenue: 0,
        orderCount: 0,
        itemsSold: 0,
      };

      const itemsQty = (order.items || []).reduce(
        (sum, it) => sum + (it.quantity || 0),
        0
      );

      const next = {
        ...prev,
        totalRevenue: prev.totalRevenue + (order.total || 0),
        orderCount: prev.orderCount + 1,
        itemsSold: prev.itemsSold + itemsQty,
      };

      return { ...acc, [region]: next };
    }, {});

  const withAverages = Object.keys(byRegion).reduce((acc, region) => {
    const r = byRegion[region];
    const avg = r.orderCount ? r.totalRevenue / r.orderCount : 0;
    return { ...acc, [region]: { ...r, averageOrderValue: avg } };
  }, {});

  return withAverages;
};

// Znajdowanie najbardziej dochodowych klientów
const getTopCustomers = (orders, limit) => {
  orders
    .filter((o) => o.processed)
    .reduce((acc, { customerId, total }) => {
      const existing = acc.find((c) => c.customerId === customerId);
      return existing
        ? acc.map((c) =>
            c.customerId === customerId
              ? {
                  ...c,
                  totalSpent: c.totalSpent + total,
                  orderCount: c.orderCount + 1,
                }
              : c
          )
        : [...acc, { customerId, totalSpent: total, orderCount: 1 }];
    }, [])
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, limit);
};

// Generowanie raportu sprzedaży
const generateSalesReport = (orders, startDate, endDate) => {
  const period = { start: startDate, end: endDate };

  const inRange = (o) =>
    o?.processed && o.timestamp >= startDate && o.timestamp <= endDate;

  const selected = (orders ?? []).filter(inRange);

  // Podsumowanie
  const summaryBase = selected.reduce(
    (acc, o) => ({
      totalOrders: acc.totalOrders + 1,
      totalRevenue: acc.totalRevenue + (o.total ?? 0),
      totalItems:
        acc.totalItems +
        (o.items ?? []).reduce((s, it) => s + (it.quantity ?? 0), 0),
      averageOrderValue: 0,
    }),
    { totalOrders: 0, totalRevenue: 0, totalItems: 0, averageOrderValue: 0 }
  );

  const summary = {
    ...summaryBase,
    averageOrderValue:
      summaryBase.totalOrders > 0
        ? summaryBase.totalRevenue / summaryBase.totalOrders
        : 0,
  };

  // Rozbicie regionalne
  const regionalBreakdown = selected.reduce((acc, o) => {
    const r = o.region ?? "unknown";
    const prev = acc[r] ?? { orders: 0, revenue: 0 };
    return {
      ...acc,
      [r]: {
        orders: prev.orders + 1,
        revenue: prev.revenue + (o.total ?? 0),
      },
    };
  }, {});

  // Top produkty
  const productMap = selected
    .flatMap((o) =>
      (o.items ?? []).map((it) => ({
        name: it.name,
        quantity: it.quantity ?? 0,
        revenue: (it.price ?? 0) * (it.quantity ?? 0),
      }))
    )
    .reduce(
      (acc, p) => ({
        ...acc,
        [p.name]: {
          name: p.name,
          quantity: (acc[p.name]?.quantity ?? 0) + p.quantity,
          revenue: (acc[p.name]?.revenue ?? 0) + p.revenue,
        },
      }),
      {}
    );

  const topProducts = Object.values(productMap).sort(
    (a, b) => b.revenue - a.revenue
  );

  return {
    period,
    summary,
    regionalBreakdown,
    topProducts,
  };
};

// Przykład użycia:
addOrder(
  "CUST001",
  [
    { name: "Laptop", price: 1200, quantity: 1 },
    { name: "Mouse", price: 25, quantity: 2 },
  ],
  10,
  "EU"
);

addOrder(
  "CUST002",
  [
    { name: "Keyboard", price: 80, quantity: 1 },
    { name: "Monitor", price: 300, quantity: 2 },
  ],
  5,
  "US"
);

addOrder("CUST001", [{ name: "Headphones", price: 150, quantity: 1 }], 0, "EU");

console.log("Processing:", processAllOrders());
console.log("Top Customers:", getTopCustomers(5));
console.log("Regional Stats:", calculateRegionalStats());
