import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../../graphql/queries";
import { IPost } from "../../interfaces";
import Post from "../post";

const Feed = () => {
  const { data, loading, error } = useQuery(GET_ALL_POSTS);

  return (
    <div>
      {data &&
        data?.getPostList?.map((post: IPost) => (
          <Post key={post.id} post={post} />
        ))}
    </div>
  );
};

export default Feed;
