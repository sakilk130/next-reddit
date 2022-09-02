import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Post from "../../components/post";
import { GET_POST_BY_ID } from "../../graphql/queries";
import { IPost } from "../../interfaces";

const PostPage = () => {
  const router = useRouter();
  const { data }: any = useQuery(GET_POST_BY_ID, {
    variables: {
      id: router.query.id,
    },
  });
  const post: IPost = data?.getPost;

  return (
    <div className="my-7 max-w-5xl mx-auto">
      <Post post={post} />
    </div>
  );
};

export default PostPage;
