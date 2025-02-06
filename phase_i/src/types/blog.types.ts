export interface User {
  id: string;
  username: string;
  email: string;
  joinDate: Date;
  isAdmin?: boolean;

  createUsername(firstName: string, lastName: string): string;
  isValidEmail(email: string): boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  tags: string[];
  comments: Comment[];
  publishedDate: Date;
  lastModified?: Date;
  status: "draft" | "published" | "archived";

  generateUniqueId(): string;
}

export interface PostCommet {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  likes: number;
  createdAt: Date;
  editedAt?: Date;
}
