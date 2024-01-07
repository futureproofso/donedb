export function base64EncodeWeb(text: string) {
    return btoa(text);
}

export function base64DecodeWeb(encoded: string) {
    return atob(encoded);
}

export function base64Encode(text: string) {
    return Buffer.from(text).toString('base64');
}

export function base64Decode(encoded: string) {
    return Buffer.from(encoded, 'base64').toString('utf-8');
}
