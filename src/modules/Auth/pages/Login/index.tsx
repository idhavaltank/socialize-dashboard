import { Form, Input, Button, Card } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import useLoginService from "./hooks/useLoginService";

import { EmailError } from "../../../../constants/formErrorMessage.constant";

import type { LoginFormFieldsType } from "./types";

import { loginSchema } from "./validation-schema";

import { decodeFromBase64, isValidEmail, parseData } from "../../../../utils";

const { Item: FormItem } = Form;

const Login = () => {
  const methods = useForm<LoginFormFieldsType>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const { loginUser, isLoading, } = useLoginService({ setError });

  useEffect(() => {
    const rememberMeString: string | null = localStorage.getItem("remember-me");
    const rememberMeValue = parseData(
      rememberMeString
    ) as LoginFormFieldsType | null;

    if (rememberMeValue && rememberMeValue.email && rememberMeValue.password) {
      reset({
        ...rememberMeValue,
        password: decodeFromBase64(rememberMeValue.password),
      });
    }
  }, [reset]);

  const onSubmit = (value: LoginFormFieldsType) => {
    if (isValidEmail(value.email)) {
      const loginData = { email: value.email, password: value.password };
      loginUser(loginData);
    } else {
      setError("email", { type: "custom", message: EmailError.valid });
    }
  };

  return (
    <div>
      <Card
        title="Login"
        style={{
          maxWidth: 445,
          margin: "auto",
          borderRadius: 20,
          padding: 24,
        }}
        styles={{
          header: { textAlign: "center" },
          body: { padding: "24px 48px" },
        }}
        variant="borderless"
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <FormItem
            label="Email"
            validateStatus={errors.email ? "error" : ""}
            help={errors.email?.message}
            required
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="email"
                  placeholder="Enter your email"
                  maxLength={60}
                  prefix={<i className="icon-user" />}
                  disabled={isLoading}
                />
              )}
            />
          </FormItem>

          <FormItem
            label="Password"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
            required
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  iconRender={(visible) =>
                    visible ? (
                      <i className="icon-eye-open" />
                    ) : (
                      <i className="icon-eye-close" />
                    )
                  }
                  disabled={isLoading}
                />
              )}
            />
          </FormItem>

          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading || isSubmitting}
              style={{ minWidth: 135 }}
              block
            >
              Login
            </Button>
          </FormItem>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
