export class User implements User {
  id: string;
  username: string;
  email: string;
  joinDate: Date;
  isAdmin?: boolean;

  constructor(
    username: string,
    email: string,
    joinDate: Date = new Date(),
    isAdmin?: boolean
  ) {
    this.id = this.generateUniqueId();
    this.username = username;
    this.email = email;
    this.joinDate = joinDate;
    this.isAdmin = isAdmin;
  }

  createUsername(firstName: string, lastName: string): string {
    return `${firstName}.${lastName}`;
  }

  isValidEmail(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
  }

  generateUniqueId(): string {
    return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  }
}
