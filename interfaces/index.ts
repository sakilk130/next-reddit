export interface IComment {
  id: number;
  post_id: number;
  text: string;
  username: string;
  created_at: string;
}

export interface IVote {
  id: number;
  post_id: number;
  upvote: boolean;
  username: string;
}

export interface ISubreddit {
  id: number;
  topic: string;
  created_at: string;
}

export interface IPost {
  id: number;
  body: string;
  title: string;
  username: string;
  image: string;
  subreddit: ISubreddit;
  commentList: [IComment];
  voteList: [IVote];
  subreddit_id: number;
  created_at: string;
}
