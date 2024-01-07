export async function createUser(): Promise<string> {
        const userAgentHash = await sha256Web(window.navigator.userAgent);
        return `${userAgentHash}#${window.crypto.randomUUID()}`;
}

export async function sha256Web(message: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  let hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}