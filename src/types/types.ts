/* Server and Global State */

export interface PostType {
  id: string;
  title: string;
  body: string;
}

export interface GetPostsSuccessResponse {
  status: "success";
  results: number;
  data: {
    posts: PostType[];
  };
}

export interface AddPostSuccessResponse {
  status: "success";
  data: {
    post: PostType;
  };
}

export interface DeletePostsSuccessResponse {
  status: "success";
  message: string;
}
