import { UserService } from "./services/UserService";
import { PostService } from "./services/PostService";
import { CommentService } from "./services/CommentService";
import { handleError } from "./utils/exception-handler";
import { CreatePostDTO } from "./dtos/post.dtos";
import { CreateUserDTO } from "./dtos/user.dtos";
import { CreateCommentDTO } from "./dtos/comment.dtos";

const userService = new UserService();
const postService = new PostService();
const commentService = new CommentService();

async function main() {
  console.log("Welcome to the Blog Management System!");

  try {
    const userData: CreateUserDTO[] = [
      { username: "Alice", email: "alice@example.com" },
      { username: "Bob", email: "bob@example.com" },
    ];
    const user1 = await userService.createUser(userData[0]);
    const user2 = await userService.createUser(userData[1]);

    const postData: CreatePostDTO[] = [
      {
        title: "First Post",
        authorId: user1.id,
        content: "This is the content of the first post",
        tags: [],
      },
      {
        title: "Second Post",
        content: "This is the content of the second post",
        authorId: user2.id,
        tags: [],
      },
    ];
    const post1 = await postService.createPost(postData[0]);
    const post2 = await postService.createPost(postData[1]);

    const commentData: CreateCommentDTO[] = [
      { content: "Great post!", authorId: user1.id, postId: post1.id },
      { content: "Thanks for sharing!", authorId: user2.id, postId: post2.id },
    ];

    const comment1 = await commentService.createComment(commentData[0]);
    const comment2 = await commentService.createComment(commentData[1]);

    console.log("First comment: ", comment1);

    const searchResults = postService.searchPosts("First", {});
    console.log(
      "Search Results:",
      JSON.stringify((await searchResults).items, null, 2)
    );

    console.log(
      "All Users:",
      JSON.stringify((await userService.listUsers({})).items, null, 2)
    );

    console.log(
      "All Posts:",
      JSON.stringify((await postService.listPosts({})).items, null, 2)
    );

    console.log(
      "Comments for Post 2:",
      JSON.stringify(
        (await commentService.listComments({ postId: post2.id })).items,
        null,
        2
      )
    );
  } catch (error) {
    console.error(handleError(error));
  }
}

main();
