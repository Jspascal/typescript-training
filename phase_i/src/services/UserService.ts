import { User } from "../models/User";
import { UserStorage } from "../storages/UserStorage";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/user.dtos";
import { PaginatedResult, UserQueryParams } from "../types/common.types";

export interface IUserService {
  createUser(data: CreateUserDTO): Promise<User>;
  updateUser(id: string, user: UpdateUserDTO): Promise<User | undefined>;
  deleteUser(id: string): Promise<boolean>;
  getUserById(id: string): Promise<User>;
  listUsers(params: UserQueryParams): Promise<PaginatedResult<User>>;
}

export class UserService implements IUserService {
  private storage: UserStorage;

  constructor() {
    this.storage = new UserStorage();
  }

  async createUser(data: CreateUserDTO): Promise<User> {
    const newUser: User = new User(data.username, data.email);
    this.storage.add(newUser);
    return newUser;
  }

  async updateUser(id: string, data: UpdateUserDTO): Promise<User | undefined> {
    const user = this.storage.get(id);
    if (!user) return undefined;
    user.username = data.username ?? user.username;
    user.email = data.email ?? user.email;
    this.storage.update(id, user);
    return user;
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.storage.delete(id);
  }

  async getUserById(id: string): Promise<User> {
    const user = this.storage.get(id);
    if (!user) throw new Error("User not found");
    return user;
  }

  async listUsers(params: UserQueryParams): Promise<PaginatedResult<User>> {
    const users = this.storage.list();
    const currentPageNumber = params.currentPage || 1;
    const itemsPerPage = params.itemsPerPage || 10;
    const totalItems = users.length;
    const offset = (currentPageNumber - 1) * itemsPerPage;
    const paginatedUsers = users.slice(offset, offset + itemsPerPage);
    return {
      items: paginatedUsers,
      total: totalItems,
      hasNext: currentPageNumber * itemsPerPage < totalItems,
      hasPrevious: currentPageNumber > 1,
      currentPage: currentPageNumber,
      totalPages: Math.ceil(totalItems / itemsPerPage),
    };
  }
}
