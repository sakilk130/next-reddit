import { useMutation, useQuery } from "@apollo/client";
import {
  BookmarkIcon,
  ChatAltIcon,
  DotsHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon } from "@heroicons/react/solid";
import moment from "moment";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ADD_VOTE } from "../../graphql/mutations";
import { GET_VOTE_BY_POST_ID } from "../../graphql/queries";
import { IPost, IVote } from "../../interfaces";
import Avatar from "../avater";

interface IPostProps {
  post: IPost;
}

const Post = ({ post }: IPostProps) => {
  const { data: session } = useSession();
  const [vote, setVote] = useState<boolean>();

  const { data, loading } = useQuery(GET_VOTE_BY_POST_ID, {
    variables: {
      id: post?.id,
    },
  });
  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_VOTE_BY_POST_ID, "getVoteUsingPost_id"],
  });

  const upVoteHandler = async (isVote: boolean) => {
    if (!session) {
      toast.error("You must be logged in to vote");
      return;
    }

    if (vote && isVote) {
      toast.error("You have already voted");
      return;
    }
    if (vote === false && !isVote) {
      toast.error("You have already voted");
      return;
    }
    const notifier = toast.loading("Upvoting...");
    try {
      await addVote({
        variables: {
          post_id: post.id,
          username: session?.user?.name,
          upvote: isVote,
        },
      });
      toast.success("Vote successfully!", {
        id: notifier,
      });
    } catch (error) {
      toast.error("Error upvoting!", {
        id: notifier,
      });
    }
  };

  useEffect(() => {
    if (data) {
      data?.getVoteUsingPost_id?.forEach((vote: IVote) => {
        if (vote.username === session?.user?.name) {
          if (vote.upvote) {
            setVote(true);
          } else {
            setVote(false);
          }
        }
      });
    }
  }, [data]);

  return (
    <Link href={`/post/${post.id}`}>
      <div className="flex gap-2 border shadow-sm bg-white mt-6 p-3 rounded-lg hover:cursor-pointer">
        <div className="flex flex-col items-center">
          <div className="hover:bg-gray-300 p-1">
            <ArrowNarrowUpIcon
              onClick={() => upVoteHandler(true)}
              className={`h-6 w-6 cursor-pointer text-gray-500 ${
                vote === true && "text-red-400"
              }`}
            />
          </div>
          <p>{post.voteList.length}</p>
          <div className="hover:bg-gray-300 p-1">
            <ArrowNarrowDownIcon
              onClick={() => upVoteHandler(false)}
              className={`h-6 w-6 cursor-pointer text-gray-500 ${
                vote === false && "text-blue-400"
              }`}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Avatar
              small={true}
              url={`https://avatars.dicebear.com/api/human/${post.username}.svg`}
            />
            <Link href={`/subreddit/${post.subreddit.topic}`}>
              <p className="font-bold hover:text-blue-600">
                {post.subreddit?.topic}
              </p>
            </Link>
            <p className="text-sm font-thin">
              - Posted by {post.username}{" "}
              {moment(new Date(post.created_at)).startOf("hour").fromNow()}
            </p>
          </div>
          <div>
            <p className="font-bold">{post.title}</p>
            <p className="text-xs text-gray-800">{post.body}</p>
          </div>
          {post.image && (
            <div>
              <img className="w-full" src={post.image} alt={post.title} />
            </div>
          )}
          <div className="flex items-center gap-3 text-gray-400 ">
            <div className="flex gap-2 hover:bg-gray-200 p-1 cursor-pointer rounded-sm">
              <ChatAltIcon className="h-6 w-6" />
              <p className="hidden sm:inline"> 1 Comments</p>
            </div>
            <div className="flex gap-2 hover:bg-gray-200 p-1 cursor-pointer rounded-sm">
              <GiftIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Award</p>
            </div>
            <div className="flex gap-2 hover:bg-gray-200 p-1 cursor-pointer rounded-sm">
              <ShareIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Share</p>
            </div>
            <div className="flex gap-2 hover:bg-gray-200 p-1 cursor-pointer rounded-sm">
              <BookmarkIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Save</p>
            </div>
            <div className="flex gap-2 hover:bg-gray-200 p-1 cursor-pointer rounded-sm">
              <DotsHorizontalIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
