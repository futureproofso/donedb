import { PasswordGenerationService } from "./poly/passwordGeneration.js"

export function createPass(polyfills: { getRandomValues: any }) {
    const service = new PasswordGenerationService(polyfills.getRandomValues);
    return service.generatePassword();
}

export function createAuthKey(polyfills: {base64Encode: (text: string) => string}, user: string, pass: string) {
    return polyfills.base64Encode(`${user}:${pass}`);
}
