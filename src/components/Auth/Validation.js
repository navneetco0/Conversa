export const Validation = ({ password, confirm_password }) => {
  const obj = {};
  if (confirm_password && password !== confirm_password) obj.pass_match = true;
  if (password.length >= 8) obj.pass_length = true;
  if (password.search(/[a-z]/) >= 0) obj.pass_small = true;
  if (password.search(/[0-9]/) >= 0) obj.pass_digit = true;
  if (password.search(/[A-Z]/) >= 0) obj.capital = true;
  if (password.search(/[!@#$%^&*]/) >= 0) obj.special = true;
  return obj;
};

// if(password.search(/[A-Z]/) < 0) obj.capital = "Password must contain at least one capital letter";
// if(password !== confirm_password) obj.password = "Password doesn't match";
// if(password.length < 8) obj.password = "Password must be at least 8 characters";
// if(password.search(/[a-z]/) < 0) obj.password = "Password must contain at least one smaller letter";
// if(password.search(/[0-9]/) < 0) obj.password = "Password must contain at least one digit";
// if(password.search(/[!@#$%^&*]/) < 0) obj.password = "Password must contain at least one special character";
