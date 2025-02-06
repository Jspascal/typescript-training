import { PostComment } from "../models/PostComment";
import { CommentStorage } from "../storages/CommentStorage";
import { CommentQueryParams, PaginatedResult } from "../types/common.types";
import { PostService } from "./PostService";
import { UserService } from "./UserService";
import { CreateCommentDTO, UpdateCommentDTO } from "../dtos/comment.dtos";

export interface ICommentService {
  createComment(comment: CreateCommentDTO): Promise<PostComment>;
  updateComment(
    id: string,
    comment: PostComment
  ): Promise<PostComment | undefined>;
  deleteComment(id: string): Promise<boolean>;
  listComments(
    params: CommentQueryParams
  ): Promise<PaginatedResult<PostComment>>;
}

export class CommentService implements ICommentService {
  private storage: CommentStorage;
  private userService: UserService;
  private postService: PostService;

  constructor() {
    this.storage = new CommentStorage();
    this.userService = new UserService();
    this.postService = new PostService();
  }

  async createComment(data: CreateCommentDTO): Promise<PostComment> {
    const newComment = new PostComment(
      Date.now().toString(),
      data.content,
      data.authorId,
      data.postId,
      0,
      new Date()
    );
    this.storage.add(newComment);
    return Promise.resolve(newComment);
  }

  async updateComment(
    id: string,
    data: UpdateCommentDTO
  ): Promise<PostComment | undefined> {
    const comment = this.storage.get(id);
    if (!comment) return undefined;
    comment.content = data.content ?? comment.content;
    comment.editedAt = new Date();
    this.storage.update(id, comment);
    return comment;
  }

  async deleteComment(id: string): Promise<boolean> {
    return this.storage.delete(id);
  }

  async listComments(
    params: CommentQueryParams
  ): Promise<PaginatedResult<PostComment>> {
    const comments = this.storage.findByPostId(params.postId);
    const total = comments.length;
    const currentPage = params.currentPage ?? 1;
    const itemsPerPage = params.itemsPerPage ?? 10;
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const data = comments.slice(start, end);
    return {
      items: data,
      total,
      currentPage,
      totalPages: Math.ceil(total / itemsPerPage),
      hasNext: currentPage * itemsPerPage < total,
      hasPrevious: currentPage > 1,
    };
  }
}
