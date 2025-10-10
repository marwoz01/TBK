// Globalne dane
let orders = [];
let processingErrors = [];
let validationResults = {};

// Funkcja dodająca zamówienie
function addOrder(customerId, items, discount, region) {
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
}

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
function calculateRegionalStats() {
  let stats = {};

  for (let i = 0; i < orders.length; i++) {
    if (orders[i].processed) {
      let region = orders[i].region;

      if (!stats[region]) {
        stats[region] = {
          totalRevenue: 0,
          orderCount: 0,
          itemsSold: 0,
          averageOrderValue: 0,
        };
      }

      stats[region].totalRevenue += orders[i].total;
      stats[region].orderCount++;

      for (let j = 0; j < orders[i].items.length; j++) {
        stats[region].itemsSold += orders[i].items[j].quantity;
      }
    }
  }

  // Obliczanie średniej wartości zamówienia
  for (let region in stats) {
    stats[region].averageOrderValue =
      stats[region].totalRevenue / stats[region].orderCount;
  }

  return stats;
}

// Znajdowanie najbardziej dochodowych klientów
function getTopCustomers(limit) {
  let customerTotals = {};

  for (let i = 0; i < orders.length; i++) {
    if (orders[i].processed) {
      let customerId = orders[i].customerId;

      if (!customerTotals[customerId]) {
        customerTotals[customerId] = {
          customerId: customerId,
          totalSpent: 0,
          orderCount: 0,
        };
      }

      customerTotals[customerId].totalSpent += orders[i].total;
      customerTotals[customerId].orderCount++;
    }
  }

  // Konwersja do tablicy
  let customerArray = [];
  for (let customerId in customerTotals) {
    customerArray.push(customerTotals[customerId]);
  }

  // Sortowanie (bubble sort dla demonstracji)
  for (let i = 0; i < customerArray.length; i++) {
    for (let j = i + 1; j < customerArray.length; j++) {
      if (customerArray[i].totalSpent < customerArray[j].totalSpent) {
        let temp = customerArray[i];
        customerArray[i] = customerArray[j];
        customerArray[j] = temp;
      }
    }
  }

  // Zwracanie tylko top N
  let topCustomers = [];
  for (let i = 0; i < Math.min(limit, customerArray.length); i++) {
    topCustomers.push(customerArray[i]);
  }

  return topCustomers;
}

// Generowanie raportu sprzedaży
function generateSalesReport(startDate, endDate) {
  let report = {
    period: {
      start: startDate,
      end: endDate,
    },
    summary: {
      totalOrders: 0,
      totalRevenue: 0,
      totalItems: 0,
      averageOrderValue: 0,
    },
    regionalBreakdown: {},
    topProducts: [],
  };

  let productSales = {};

  for (let i = 0; i < orders.length; i++) {
    if (
      orders[i].processed &&
      orders[i].timestamp >= startDate &&
      orders[i].timestamp <= endDate
    ) {
      report.summary.totalOrders++;
      report.summary.totalRevenue += orders[i].total;

      // Agregacja według regionu
      if (!report.regionalBreakdown[orders[i].region]) {
        report.regionalBreakdown[orders[i].region] = {
          orders: 0,
          revenue: 0,
        };
      }
      report.regionalBreakdown[orders[i].region].orders++;
      report.regionalBreakdown[orders[i].region].revenue += orders[i].total;

      // Liczenie produktów
      for (let j = 0; j < orders[i].items.length; j++) {
        let item = orders[i].items[j];
        report.summary.totalItems += item.quantity;

        if (!productSales[item.name]) {
          productSales[item.name] = {
            name: item.name,
            quantity: 0,
            revenue: 0,
          };
        }
        productSales[item.name].quantity += item.quantity;
        productSales[item.name].revenue += item.price * item.quantity;
      }
    }
  }

  if (report.summary.totalOrders > 0) {
    report.summary.averageOrderValue =
      report.summary.totalRevenue / report.summary.totalOrders;
  }

  // Konwersja produktów do tablicy i sortowanie
  for (let productName in productSales) {
    report.topProducts.push(productSales[productName]);
  }

  for (let i = 0; i < report.topProducts.length; i++) {
    for (let j = i + 1; j < report.topProducts.length; j++) {
      if (report.topProducts[i].revenue < report.topProducts[j].revenue) {
        let temp = report.topProducts[i];
        report.topProducts[i] = report.topProducts[j];
        report.topProducts[j] = temp;
      }
    }
  }

  return report;
}

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
