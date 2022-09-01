import {
  BookmarkIcon,
  ChatAltIcon,
  DotsHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon } from "@heroicons/react/solid";
import moment from "moment";
import { IPost } from "../../interfaces";
import Avatar from "../avater";

interface IPostProps {
  post: IPost;
}

const Post = ({ post }: IPostProps) => {
  return (
    <div className="flex gap-2 border border-gray-400 shadow-sm bg-white mt-6 p-3 rounded-lg hover:border-2 hover:cursor-pointer">
      <div className="flex flex-col items-center">
        <div className="hover:bg-gray-300 p-1">
          <ArrowNarrowUpIcon className="h-6 w-6 cursor-pointer text-gray-500" />
        </div>
        <p>{post.voteList.length}</p>
        <div className="hover:bg-gray-300 p-1">
          <ArrowNarrowDownIcon className="h-6 w-6 cursor-pointer text-gray-500" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Avatar
            small={true}
            url={`https://avatars.dicebear.com/api/human/${post.username}.svg`}
          />
          <p className="font-bold">{post.subreddit?.topic}</p>
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
  );
};

export default Post;
