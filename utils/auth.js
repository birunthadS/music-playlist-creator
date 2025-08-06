// Get all users
export const getUsers = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("users")) || [];
};

// Save users to localStorage
export const saveUsers = (users) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("users", JSON.stringify(users));
};

// Signup user
export const signupUser = (username, password) => {
  if (typeof window === "undefined") return { success: false, message: "Client only" };

  const users = getUsers();
  if (users.find((u) => u.username === username)) {
    return { success: false, message: "Username already exists!" };
  }
  users.push({ username, password });
  saveUsers(users);
  return { success: true, message: "Signup successful!" };
};

// Login user
export const loginUser = (username, password) => {
  if (typeof window === "undefined") return { success: false, message: "Client only" };

  const users = getUsers();
  const user = users.find((u) => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem("currentUser", username);
    return { success: true };
  }
  return { success: false, message: "Invalid credentials!" };
};

// Get current logged-in user
export const getCurrentUser = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("currentUser");
};

// Logout user
export const logoutUser = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("currentUser");
};
