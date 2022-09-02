import { useMutation, useQuery } from "@apollo/client";
import { DotSpinner } from "@uiball/loaders";
import moment from "moment";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Avatar from "../../components/avater";
import Post from "../../components/post";
import { ADD_COMMENT } from "../../graphql/mutations";
import { GET_POST_BY_ID } from "../../graphql/queries";
import { IComment, IPost } from "../../interfaces";

interface IFormData {
  text: string;
  username: string;
  post_id: number;
}

const PostPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data }: any = useQuery(GET_POST_BY_ID, {
    variables: {
      id: router.query.id,
    },
  });
  const [insertComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_ID, "getPostListByPostId"],
  });

  const post: IPost = data?.getPost;
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<IFormData>();

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    const notifier = toast.loading("Submitting comment...");
    try {
      await insertComment({
        variables: {
          text: data.text,
          post_id: router.query.id,
          username: session?.user?.name,
        },
      });
      reset();

      toast.success("Comment successfully!", {
        id: notifier,
      });
    } catch (error) {
      toast.error("Error submitting comment!", {
        id: notifier,
      });
      console.log(error);
    }
  };

  if (!post)
    return (
      <div className="flex w-full items-center justify-center p-10 text-xl">
        <DotSpinner size={50} color="#FF4501" />
      </div>
    );

  return (
    <>
      <Head>
        <title>{post?.title}</title>
      </Head>
      <div className="my-7 max-w-5xl mx-auto">
        <Post post={post} />
        <div className="-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16">
          <p>
            Comment as{" "}
            <span className="text-orange-500">{session?.user?.name}</span>
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              {...register("text", { required: true })}
              className={`w-full h-32 p-2 border border-gray-300 rounded-md mt-2 outline-none ${
                errors.text ? "border-red-500" : ""
              }`}
              placeholder={
                session
                  ? "What are your thoughts?"
                  : "Please sign in to comment"
              }
              disabled={!session}
            />
            {errors.text && (
              <p className="text-red-500 text-sm">Field is required</p>
            )}
            <button
              type="submit"
              className="w-full p-2 bg-orange-500 text-white rounded-md mt-1"
              disabled={!session || isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Comment"}
            </button>
          </form>
          {post?.commentList.map((comment: IComment) => (
            <div
              key={comment.id}
              className="relative  flex items-center space-x-3 mt-3"
            >
              <hr className="absolute top-10 left-7 z-0 h-16 border ml-2" />
              <div className="z-50">
                <Avatar
                  url={`https://avatars.dicebear.com/api/human/${comment.username}.svg`}
                />
              </div>
              <div className="p-2">
                <p className="font-thin text-sm">
                  {comment.username} {moment(comment.created_at).fromNow()}
                </p>
                <p className="text-gray-800">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostPage;
