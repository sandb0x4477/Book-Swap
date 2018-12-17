import { User } from './user.model';

export class Book {
  id: string;
  title: string;
  googleId: string;
  authors: string[];
  description: string;
  imageUrl: string;
  userId: string;
  created: Date;
}

export class BookLatest {
  books: Book[];
  bookCount: number;
  page: string;
}

export class BooksForUser {
  books: Book[];
  user: User;
}
