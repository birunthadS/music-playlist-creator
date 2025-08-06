export const getUsers = () => {
  return JSON.parse(localStorage.getItem("users")) || [];
};


export const saveUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};


export const signupUser = (username, password) => {
  const users = getUsers();
  if (users.find((u) => u.username === username)) {
    return { success: false, message: "Username already exists!" };
  }
  users.push({ username, password });
  saveUsers(users);
  return { success: true, message: "Signup successful!" };
};


export const loginUser = (username, password) => {
  const users = getUsers();
  const user = users.find((u) => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem("currentUser", username);
    return { success: true };
  }
  return { success: false, message: "Invalid credentials!" };
};


export const getCurrentUser = () => {
  return localStorage.getItem("currentUser");
};


export const logoutUser = () => {
  localStorage.removeItem("currentUser");
};
