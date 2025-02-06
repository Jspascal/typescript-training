type CreateCommentDTO = {
  content: string;
  postId: string;
  authorId: string;
};

type UpdateCommentDTO = {
  content?: string;
};

export { CreateCommentDTO, UpdateCommentDTO };
