import * as nodeCrypto from "crypto";

export function createUser(): string {
    return `#${nodeCrypto.randomUUID()}`;
}