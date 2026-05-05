/**
 * @deprecated This file is deprecated. Use utils/validation.ts instead.
 * This file is kept for backward compatibility only.
 */

import { validateEmail as validateEmailUtil } from "../utils/validation";

export const validateEmail = (email: string) => {
  return validateEmailUtil(email);
};
