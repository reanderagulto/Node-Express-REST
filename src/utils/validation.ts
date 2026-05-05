import { z } from "zod";

// Email validation schema
export const emailSchema = z.string().email("Invalid email format");

// Password validation schema - requires 12+ chars, uppercase, lowercase, number, special character
export const passwordSchema = z
  .string()
  .min(12, "Password must be at least 12 characters long")
  .regex(/^(?=.*[a-z])/, "Password must contain at least one lowercase letter")
  .regex(/^(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
  .regex(/^(?=.*\d)/, "Password must contain at least one number")
  .regex(
    /^(?=.*[@$!%*?&])/,
    "Password must contain at least one special character (@$!%*?&)",
  );

export const validateEmail = (email: string): boolean => {
  try {
    emailSchema.parse(email);
    return true;
  } catch {
    return false;
  }
};

export const validatePassword = (password: string): boolean => {
  try {
    passwordSchema.parse(password);
    return true;
  } catch {
    return false;
  }
};

export const getPasswordError = (password: string): string | null => {
  try {
    passwordSchema.parse(password);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0]?.message || "Invalid password";
    }
    return "Invalid password";
  }
};

export const getEmailError = (email: string): string | null => {
  try {
    emailSchema.parse(email);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0]?.message || "Invalid email";
    }
    return "Invalid email";
  }
};
