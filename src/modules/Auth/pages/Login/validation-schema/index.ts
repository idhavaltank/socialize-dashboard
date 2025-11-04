// ** Packages **
import * as yup from "yup";

// ** Constant **
import {
  EmailError,
  PasswordError,
} from "../../../../../constants/formErrorMessage.constant";

// ** Util **
import { isValidEmail } from "../../../../../utils";

export const LoginSchemaError = Object.freeze({
  email: EmailError,
  password: PasswordError.required,
});

export const emailTestValidate = (v: string | null | undefined, value: any) => {
  const currentValue = v?.trim();

  if (!currentValue) {
    return value?.createError({ message: EmailError.required });
  }

  if (!isValidEmail(currentValue)) {
    return value?.createError({ message: EmailError.valid });
  }

  return true;
};

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .required(LoginSchemaError.email.required)
      .email(LoginSchemaError.email.valid)
      .lowercase()
      .test("email", emailTestValidate),
    password: yup.string().required(LoginSchemaError.password),
  })
  .required();
