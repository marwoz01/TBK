const users = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    email: "admin@library.local",
    role: "admin",
    preferences: { theme: "dark", language: "pl" },
  },
  {
    id: 2,
    username: "user",
    password: "user1234",
    email: "user@library.local",
    role: "user",
    preferences: { theme: "light", language: "en" },
  },
];

let nextId = 3;

function findById(id) {
  return users.find((u) => u.id === Number(id)) || null;
}

function findByUsername(username) {
  return users.find((u) => u.username === username) || null;
}

function isUsernameTaken(username, excludeUserId = null) {
  const existing = findByUsername(username);
  if (!existing) return false;
  if (excludeUserId == null) return true;
  return existing.id !== Number(excludeUserId);
}

function create({ username, password, email, role = "user", preferences }) {
  const newUser = {
    id: nextId++,
    username,
    password,
    email,
    role,
    preferences: preferences || { theme: "light", language: "pl" },
  };

  users.push(newUser);
  return newUser;
}

function update(id, patch) {
  const user = findById(id);
  if (!user) return null;

  const { id: _ignored, ...safePatch } = patch || {};

  if (safePatch.username !== undefined) user.username = safePatch.username;
  if (safePatch.password !== undefined) user.password = safePatch.password;
  if (safePatch.email !== undefined) user.email = safePatch.email;
  if (safePatch.role !== undefined) user.role = safePatch.role;

  if (safePatch.preferences !== undefined) {
    user.preferences = {
      ...(user.preferences || {}),
      ...(safePatch.preferences || {}),
    };
  }

  return user;
}

module.exports = {
  findById,
  findByUsername,
  isUsernameTaken,
  create,
  update,
  _users: users,
};
