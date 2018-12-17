export declare class TokenService {
    sign(user: any): any;
    verify(token: string): any;
    decode(token: string): any;
    getSecretKey(data: any): string;
}
