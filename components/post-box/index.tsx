import { useMutation } from "@apollo/client";
import { PhotographIcon } from "@heroicons/react/outline";
import { LinkIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import client from "../../apollo-client";
import { ADD_POST, ADD_SUBREDDIT } from "../../graphql/mutations";
import { GET_SUBREDDIT_BY_TOPIC } from "../../graphql/queries";
import Avatar from "../avater";

interface IFormData {
  title: string;
  body: string;
  image: string;
  subreddit: string;
}

const PostBox = () => {
  const { data: session } = useSession();
  const [isImageBoxOpen, setIsImageBoxOpen] = useState(false);
  const [insertSubreddit] = useMutation(ADD_SUBREDDIT);
  const [insertPost] = useMutation(ADD_POST);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IFormData>();

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    const notifier = toast.loading("Creating post...");
    try {
      const {
        data: { getSubredditListByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: data.subreddit,
        },
      });
      if (getSubredditListByTopic.length === 0) {
        const {
          data: { insertSubreddit: newSubreddit },
        } = await insertSubreddit({
          variables: {
            topic: data.subreddit,
          },
        });
        const {
          data: { insertPost: newPost },
        } = await insertPost({
          variables: {
            title: data.title,
            body: data.body,
            image: data.image || "",
            subreddit_id: newSubreddit.id,
            username: session?.user?.name,
          },
        });
      } else {
        const {
          data: { insertPost: newPost },
        } = await insertPost({
          variables: {
            title: data.title,
            body: data.body,
            image: data.image || "",
            subreddit_id: getSubredditListByTopic[0].id,
            username: session?.user?.name,
          },
        });
      }
      toast.success("Post created!", {
        id: notifier,
      });
    } catch (error) {
      toast.error("Error creating post!", {
        id: notifier,
      });
      console.log(error);
    }
  };

  return (
    <form
      className="sticky top-16 z-50 rounded-md border border-gray-300 bg-white p-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center space-x-3">
        <Avatar />
        <input
          {...register("title", { required: true })}
          className="w-full px-2 h-10 outline-none bg-gray-100"
          type="text"
          placeholder={`${
            session?.user?.name
              ? `${session?.user?.name} what's up`
              : `Please login`
          }`}
        />
        <PhotographIcon
          className="h-6 w-6 cursor-pointer hover:bg-gray-100 hover:rounded-full"
          onClick={() => setIsImageBoxOpen(!isImageBoxOpen)}
        />
        <LinkIcon className="h-6 w-6 cursor-pointer hover:bg-gray-100 hover:rounded-full" />
      </div>
      {watch("title") && (
        <>
          <div className="flex mt-2 items-center">
            <label className="min-w-[90px]">Body</label>
            <textarea
              {...register("body", { required: false })}
              className="w-full bg-gray-100 outline-none p-2"
              placeholder="Text (Optional)"
            />
          </div>

          {isImageBoxOpen && (
            <div className="flex mt-2 items-center">
              <label className="min-w-[90px]">Image URL</label>
              <input
                {...register("image", { required: false })}
                type="text"
                className="w-full bg-gray-100 outline-none p-2"
                placeholder="Optional"
              />
            </div>
          )}
          <div className="flex mt-2 items-center">
            <label className="min-w-[90px]">Subreddit</label>
            <input
              {...register("subreddit", { required: true })}
              type="text"
              className="w-full bg-gray-100 outline-none p-2"
              placeholder="i.g /r/react"
            />
          </div>

          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.title?.type === "required" && (
                <p>- A Post Title is required</p>
              )}

              {errors.subreddit?.type === "required" && (
                <p>- A Subreddit is required</p>
              )}
            </div>
          )}
          <div>
            <button
              className="w-full bg-blue-500 text-white p-1 rounded-md mt-4"
              type="submit"
              disabled={!!errors.title || isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Create Post"}
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default PostBox;
