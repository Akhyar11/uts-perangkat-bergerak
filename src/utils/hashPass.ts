import { createHash } from "crypto";

export function hashPassword(password: string) {
  const data = `${password}`;
  const hash = createHash("sha256").update(data).digest("hex");
  return hash;
}

export function verifyPassword(password: string, storedHash: any) {
  const data = `${password}`;
  const hash = createHash("sha256").update(data).digest("hex");
  if (hash === storedHash) {
    return true;
  } else {
    return false;
  }
}
