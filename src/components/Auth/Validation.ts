interface ValidationProps {
  password: string | undefined;
  confirm_password: string | undefined;
}

interface ValidationResult {
  pass_match: boolean;
  pass_length: boolean;
  pass_small: boolean;
  pass_digit: boolean;
  pass_capital: boolean;
  special: boolean;
}

export const Validation = ({
  password,
  confirm_password,
}: ValidationProps): ValidationResult => {
  const obj: ValidationResult = {
    pass_match: false,
    pass_length: false,
    pass_small: false,
    pass_digit: false,
    pass_capital: false,
    special: false,
  };
  if (!password) return obj;
  if (confirm_password && password === confirm_password) obj.pass_match = true;
  if (password.length >= 8) obj.pass_length = true;
  if (password.search(/[a-z]/) >= 0) obj.pass_small = true;
  if (password.search(/[0-9]/) >= 0) obj.pass_digit = true;
  if (password.search(/[A-Z]/) >= 0) obj.pass_capital = true;
  if (password.search(/[!@#$%^&*]/) >= 0) obj.special = true;
  return obj;
};
