import { User } from "./User";

export class PostComment implements PostComment {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  likes: number;
  createdAt: Date;
  editedAt?: Date;

  constructor(
    id: string,
    content: string,
    authorId: string,
    postId: string,
    likes: number,
    createdAt: Date,
    editedAt?: Date
  ) {
    this.id = id;
    this.content = content;
    this.authorId = authorId;
    this.postId = postId;
    this.createdAt = createdAt;
    this.editedAt = editedAt;
    this.likes = likes;
  }
}
