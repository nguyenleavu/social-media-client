import { MESSAGES } from "@/constants/messages";
import { PASSWORD_REGEX } from "@/constants/regex";
import * as yup from "yup";

export const authSchema = yup.object({
  email: yup
    .string()
    .required(MESSAGES.EMAIL_IS_REQUIRED)
    .email(MESSAGES.EMAIL_IS_INVALID),
  name: yup
    .string()
    .required(MESSAGES.NAME_IS_REQUIRED)
    .min(6, MESSAGES.NAME_MUST_BE_FROM_6_TO_255)
    .max(255, MESSAGES.NAME_MUST_BE_FROM_6_TO_255),
  date_of_birth: yup.string().required(MESSAGES.DATE_OF_BIRTH_IS_REQUIRED),
  password: yup
    .string()
    .required(MESSAGES.PASSWORD_IS_REQUIRED)
    .min(8, MESSAGES.PASSWORD_MUST_BE_FROM_8_TO_255)
    .max(255, MESSAGES.PASSWORD_MUST_BE_FROM_8_TO_255)
    .matches(PASSWORD_REGEX, MESSAGES.PASSWORD_MUST_BE_STRONG),
  confirm_password: yup
    .string()
    .required(MESSAGES.CONFIRM_PASSWORD_IS_REQUIRED)
    .min(8, MESSAGES.CONFIRM_PASSWORD_MUST_BE_FROM_8_TO_255)
    .max(255, MESSAGES.CONFIRM_PASSWORD_MUST_BE_FROM_8_TO_255)
    .oneOf([yup.ref("password")], MESSAGES.CONFIRM_PASSWORD_DOES_NOT_MATCH),
});

export const loginSchema = authSchema.omit([
  "confirm_password",
  "date_of_birth",
  "name",
]);

export const forgotPasswordSchema = authSchema.pick(["email"]);

export const resetPasswordSchema = authSchema.pick([
  "password",
  "confirm_password",
]);

export type RegisterForm = yup.InferType<typeof authSchema>;

export type LoginForm = yup.InferType<typeof loginSchema>;

export type ForgotPasswordForm = yup.InferType<typeof forgotPasswordSchema>;

export type ResetPasswordForm = yup.InferType<typeof resetPasswordSchema>;
