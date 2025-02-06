type CreatePostDTO = {
  title: string;
  authorId: string;
  content: string;
  tags: string[];
};

type UpdatePostDTO = {
  title?: string;
  content?: string;
  tags?: string[];
  status?: "draft" | "published" | "archived";
  publishedDate?: Date;
};

export { CreatePostDTO, UpdatePostDTO };
