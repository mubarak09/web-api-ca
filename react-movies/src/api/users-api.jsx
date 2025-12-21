export const login = (username, password) => {
  return fetch("http://localhost:8080/api/users", {
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: JSON.stringify({ username, password }),
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((err) => {
        throw new Error(err.msg || err.message || "Login failed");
      });
    }
    return response.json();
  });
};


export const signup = (username, password) => {
  return fetch("http://localhost:8080/api/users?action=register", {
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: JSON.stringify({ username, password }),
  }).then((response) => {
    if (!response.ok) {
      return response.json().then((err) => {
        throw new Error(err.msg || err.message || "Signup failed");
      });
    }
    return response.json();
  });
};
