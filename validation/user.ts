import { MESSAGES } from "@/constants/messages";
import * as yup from "yup";

export const userSchema = yup.object({
  name: yup
    .string()
    .required(MESSAGES.NAME_IS_REQUIRED)
    .min(6, MESSAGES.NAME_MUST_BE_FROM_6_TO_255)
    .max(255, MESSAGES.NAME_MUST_BE_FROM_6_TO_255),
  bio: yup
    .string()
    .required(MESSAGES.BIO_IS_REQUIRED)
    .min(6, MESSAGES.BIO_MUST_BE_FROM_6_TO_255)
    .max(2000, MESSAGES.BIO_MUST_BE_FROM_6_TO_255),
});

export type EditUserForm = yup.InferType<typeof userSchema>;
