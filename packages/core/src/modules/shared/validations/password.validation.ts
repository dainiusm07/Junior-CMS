import { string } from "yup";

export const passwordValidation = string().min(6);
