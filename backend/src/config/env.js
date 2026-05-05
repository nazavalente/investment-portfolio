import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";

const configDirectory = dirname(fileURLToPath(import.meta.url));
const backendDirectory = resolve(configDirectory, "../..");

config({ path: resolve(backendDirectory, ".env") });
