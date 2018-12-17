import { UserEntity } from '../user/user.entity';
export declare class BookEntity {
    id: string;
    title: string;
    googleId: string;
    authors: string[];
    description: string;
    imageUrl: string;
    userId: string;
    created: Date;
    user: UserEntity;
}
