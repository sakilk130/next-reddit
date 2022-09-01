import { useQuery } from "@apollo/client";
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
  console.log(data);
  return (
    <div>
      {!loading &&
        posts?.map((post: IPost) => <Post key={post.id} post={post} />)}
    </div>
  );
};

export default Feed;
