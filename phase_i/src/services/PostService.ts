import { CreatePostDTO, UpdatePostDTO } from "../dtos/post.dtos";
import {
  PostQueryParams,
  PaginatedResult,
  SearchResult,
} from "../types/common.types";
import { PostStorage } from "../storages/PostStorage";
import { User } from "../models/User";
import { BlogPost } from "../models/BlogPost";
import { searchPosts } from "../utils/search-helpers";

export interface IPostService {
  createPost(data: CreatePostDTO): Promise<BlogPost>;
  updatePost(id: string, data: UpdatePostDTO): Promise<BlogPost>;
  deletePost(id: string): Promise<boolean>;
  getPostById(id: string): Promise<BlogPost>;
  listPosts(params: PostQueryParams): Promise<PaginatedResult<BlogPost>>;
  searchPosts(
    query: string,
    params: PostQueryParams
  ): Promise<PaginatedResult<SearchResult>>;
}

export class PostService implements IPostService {
  private storage: PostStorage;

  constructor() {
    this.storage = new PostStorage();
  }

  async createPost(data: CreatePostDTO): Promise<BlogPost> {
    const newPost: BlogPost = new BlogPost(
      data.title,
      data.content,
      data.authorId,
      data.tags,
      new Date(),
      undefined,
      "draft"
    );
    this.storage.add(newPost);
    return newPost;
  }

  async updatePost(id: string, data: UpdatePostDTO): Promise<BlogPost> {
    const existingPost = await this.getPostById(id);
    const updatedPost: BlogPost = new BlogPost(
      existingPost.title,
      existingPost.content,
      existingPost.authorId,
      data.tags || existingPost.tags,
      data.publishedDate || existingPost.publishedDate,
      existingPost.lastModified,
      data.status || existingPost.status
    );
    const success = this.storage.update(id, updatedPost);
    if (!success) throw new Error("Post not found");
    return updatedPost;
  }

  async deletePost(id: string): Promise<boolean> {
    return this.storage.delete(id);
  }

  async getPostById(id: string): Promise<BlogPost> {
    const post = this.storage.get(id);
    if (!post) throw new Error("Post not found");
    return post;
  }

  async listPosts(params: PostQueryParams): Promise<PaginatedResult<BlogPost>> {
    const allPosts = this.storage.list();
    const currentPageNumber = params.currentPage || 1;
    const itemsPerPage = params.itemsPerPage || 10;
    const totalItems = allPosts.length;
    const offset = (currentPageNumber - 1) * itemsPerPage;
    const paginatedPosts = allPosts.slice(offset, offset + itemsPerPage);
    return {
      items: paginatedPosts,
      total: totalItems,
      hasNext: currentPageNumber * itemsPerPage < totalItems,
      hasPrevious: currentPageNumber > 1,
      currentPage: currentPageNumber,
      totalPages: Math.ceil(totalItems / itemsPerPage),
    };
  }

  async searchPosts(
    query: string,
    params: PostQueryParams
  ): Promise<PaginatedResult<SearchResult>> {
    const allPosts = this.storage.list();
    const filteredPosts = searchPosts(query, allPosts);
    const currentPageNumber = params.currentPage || 1;
    const itemsPerPage = params.itemsPerPage || 10;
    const totalItems = allPosts.length;
    const offset = (currentPageNumber - 1) * itemsPerPage;
    const paginatedPosts = filteredPosts.slice(offset, offset + itemsPerPage);
    return {
      items: paginatedPosts,
      total: totalItems,
      hasNext: currentPageNumber * itemsPerPage < totalItems,
      hasPrevious: currentPageNumber > 1,
      currentPage: currentPageNumber,
      totalPages: Math.ceil(totalItems / itemsPerPage),
    };
  }
}
