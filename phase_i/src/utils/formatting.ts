export function createSlug(title: string): string {
  return title.toLowerCase().replace(/ /g, "-");
}

export function createPostExcerpt(content: string): string {
  return content.slice(0, 150) + "...";
}
