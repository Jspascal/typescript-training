type CreateUserDTO = {
  username: string;
  email: string;
};

type UpdateUserDTO = {
  username?: string;
  email?: string;
};

export { CreateUserDTO, UpdateUserDTO };
