import { User } from "../models/User";

export class UserStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  add(user: User): void {
    this.users.set(user.id, user);
  }

  get(id: string): User | undefined {
    return this.users.get(id);
  }

  update(id: string, user: User): boolean {
    if (this.users.has(id)) {
      this.users.set(id, user);
      return true;
    }
    return false;
  }

  delete(id: string): boolean {
    if (this.users.has(id)) {
      this.users.delete(id);
      return true;
    }
    return false;
  }

  list(): User[] {
    return Array.from(this.users.values());
  }
}
