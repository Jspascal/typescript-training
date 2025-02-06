import { User } from "./User";

export class BlogPost implements BlogPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  tags: string[];
  comments: Comment[];
  publishedDate: Date;
  lastModified?: Date;
  status: "draft" | "published" | "archived";
  private contentHistory: string[] = [];

  constructor(
    title: string,
    content: string,
    authorId: string,
    tags: string[],
    publishedDate: Date,
    lastModified?: Date,
    status: "draft" | "published" | "archived" = "draft"
  ) {
    this.id = this.generateUniqueId();
    this.title = title;
    this.content = content;
    this.authorId = authorId;
    this.tags = tags;
    this.publishedDate = publishedDate;
    this.lastModified = lastModified;
    this.status = status;
  }

  generateUniqueId(): string {
    return `${Date.now()}-${Math.random()}`;
  }

  private sanitizeContent(content: string): string {
    return content;
  }

  public getExcerpt(length: number): string {
    return this.sanitizeContent(this.content).slice(0, length);
  }

  public getReadingTime(): number {
    const words = this.content.split(" ").length;
    return Math.ceil(words / 200);
  }

  public update(newContent: string): void {
    this.contentHistory.push(this.content);
    this.content = newContent;
    this.lastModified = new Date();
  }

  public addComment(comment: Comment): void {
    this.comments.push(comment);
  }
}
