import { useQuery } from "@apollo/client";
import { DotSpinner } from "@uiball/loaders";
import { GET_ALL_POSTS, GET_POST_BY_SUBREDDIT } from "../../graphql/queries";
import { IPost } from "../../interfaces";
import Post from "../post";

interface IFeedProps {
  subreddit?: string;
}
const Feed = ({ subreddit }: IFeedProps) => {
  const { data, loading, error } = subreddit
    ? useQuery(GET_POST_BY_SUBREDDIT, {
        variables: {
          subreddit: subreddit,
        },
      })
    : useQuery(GET_ALL_POSTS);
  const posts = data?.getPostList || data?.getPostListBySubreddit;

  if (loading) {
    return (
      <div className="flex w-full items-center justify-center p-10 text-xl">
        <DotSpinner size={50} color="#FF4501" />
      </div>
    );
  }

  return (
    <div>
      {posts?.map((post: IPost) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
