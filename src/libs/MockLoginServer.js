function login(email, password) {
  return (
    (email.toLowerCase() === "admin@admin.com" ? true : false) &&
    (password.toLowerCase() === "admin" ? true : false)
  );
}

export default login;
