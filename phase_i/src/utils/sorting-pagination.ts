import { PaginatedResult, PaginationParams } from "../types/common.types";
import { BlogPost } from "../types/blog.types";

export function sortPosts(
  posts: BlogPost[],
  params: PaginationParams
): PaginatedResult<BlogPost> {
  const { sortBy, sortOrder, page, pageSize } = params;
  const sortedPosts = posts.sort((a, b) => {
    if (sortBy === "date") {
      return sortOrder === "asc"
        ? a.publishedDate.getTime() - b.publishedDate.getTime()
        : b.publishedDate.getTime() - a.publishedDate.getTime();
    } else if (sortBy === "title") {
      return sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
  });
  const total = sortedPosts.length;
  const totalPages = Math.ceil(total / pageSize);
  const hasNext = page < totalPages;
  const hasPrevious = page > 1;
  const currentPage = hasNext ? page : totalPages;
  return {
    items: sortedPosts.slice((page - 1) * pageSize, page * pageSize),
    total,
    currentPage,
    totalPages,
    hasNext,
    hasPrevious,
  };
}

export function paginatePosts(
  posts: BlogPost[],
  params: PaginationParams
): PaginatedResult<BlogPost> {
  const { page, pageSize } = params;
  const total = posts.length;
  const totalPages = Math.ceil(total / pageSize);
  const hasNext = page < totalPages;
  const hasPrevious = page > 1;
  const currentPage = hasNext ? page : totalPages;
  return {
    items: posts.slice((page - 1) * pageSize, page * pageSize),
    total,
    currentPage,
    totalPages,
    hasNext,
    hasPrevious,
  };
}
