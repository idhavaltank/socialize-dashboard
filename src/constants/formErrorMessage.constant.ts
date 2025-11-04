export enum EmailError {
  required = "Email is required",
  valid = "Email is not in valid format",
}

export enum PasswordError {
  required = "Password is required",
  valid = "Must contain 12 characters, one uppercase, one lowercase, one number and one special case character",
  confirm_required = "Password confirmation is required",
  minLengthReq = "At least 12 characters",
  upperLowerReq = "At least 1 uppercase and 1 lowercase",
  numberReq = "At least 1 number",
  specialCharReq = "At least 1 special character.",
  match = "Password and confirm password must match",
}

export enum BasicErrorMessage {
  numberOnly = "Please enter only number",
  name = "Name is required",
  first_name = "First name is required",
  last_name = "Last name is required",
  description = "Description is required",
}

export const LoginSchemaError = {
  userName: BasicErrorMessage.first_name,
  password: PasswordError,
};
