import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetError,
} from "react-hook-form";

export type LoginFormFieldsType = {
  email: string;
  password: string;
  remember?: boolean;
};

export type PasswordFieldsType = {
  password?: string;
  confirmPassword?: string;
};

export type LoginFormPropsType = {
  errors: FieldErrors<LoginFormFieldsType>;
  register: UseFormRegister<LoginFormFieldsType>;
  handleSubmit: UseFormHandleSubmit<LoginFormFieldsType, LoginFormFieldsType>;
  isLoading: boolean;
  login: (_data: LoginFormFieldsType) => void;
  setError: UseFormSetError<LoginFormFieldsType>;
};
