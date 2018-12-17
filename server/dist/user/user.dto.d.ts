export declare class UserForLoginDTO {
    username: string;
    password: string;
}
export declare class UserForRegisterDTO {
    username: string;
    password: string;
    email: string;
    address: string;
    city: string;
}
export declare class UserForReturnDTO {
    id: string;
    username: string;
    created: Date;
    city: string;
    token?: string;
    booksCount?: number;
    tradeCount?: number;
}
