import { BlogPost } from "./blog.types";

export interface TagStats {
  name: string;
  count: number;
  lastUsed: Date;
}

export interface SearchResult {
  post: BlogPost;
  relevanceScore: number;
  matchedTerms: string[];
  highlightedContent: string;
  frequency: number;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy: "date" | "title" | "popularity";
  sortOrder: "asc" | "desc";
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface PostQueryParams {
  title?: string;
  content?: string;
  tags?: string[];
  author?: string;
  status?: "draft" | "published" | "archived";
  currentPage?: number;
  itemsPerPage?: number;
  date?: {
    start?: Date;
    end?: Date;
  };
}

export interface UserQueryParams {
  username?: string;
  email?: string;
  currentPage?: number;
  itemsPerPage?: number;
  joinDate?: {
    start?: Date;
    end?: Date;
  };
}

export interface CommentQueryParams {
  postId?: string;
  currentPage?: number;
  itemsPerPage?: number;
  sort?: "date" | "relevance";
  sortOrder?: "asc" | "desc";
}
