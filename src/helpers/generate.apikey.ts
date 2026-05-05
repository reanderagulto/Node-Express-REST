/**
 * @deprecated This file is deprecated. Use utils/crypto.ts instead.
 * This file is kept for backward compatibility only.
 */

import { generateApiKey as generateApiKeyUtil } from "../utils/crypto";

export const generateApiKey = () => {
  return generateApiKeyUtil();
};
