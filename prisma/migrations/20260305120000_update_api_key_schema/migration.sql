-- Ensure digest functions are available for hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Rename old ApiKey table if it exists
ALTER TABLE IF EXISTS "ApiKey" RENAME TO "api_keys";

-- AlterTable
ALTER TABLE "api_keys" ADD COLUMN "keyHash" TEXT NOT NULL DEFAULT '';
ALTER TABLE "api_keys" ADD COLUMN "userId" INTEGER;
ALTER TABLE "api_keys" ADD COLUMN "lastUsedAt" TIMESTAMP(3);

-- Populate existing API key hashes using sha256
UPDATE "api_keys"
SET "keyHash" = encode(digest("key", 'sha256'), 'hex')
WHERE "keyHash" = '';

ALTER TABLE "api_keys" ALTER COLUMN "keyHash" SET NOT NULL;

-- Enforce uniqueness after migration data population
CREATE UNIQUE INDEX "api_keys_keyHash_key" ON "api_keys"("keyHash");

-- Add table map comment
COMMENT ON TABLE "api_keys" IS '';