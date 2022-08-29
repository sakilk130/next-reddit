import { useSession } from "next-auth/react";
import React from "react";
import Avatar from "../avater";
import { PhotographIcon } from "@heroicons/react/outline";
import { LinkIcon } from "@heroicons/react/solid";

const PostBox = () => {
  const { data: session } = useSession();

  return (
    <form className="sticky top-16 z-50 rounded-md border border-gray-300 bg-white p-2">
      <div className="flex items-center space-x-3">
        <Avatar />
        <input
          className="w-full px-2 h-10 outline-none bg-gray-100"
          type="text"
          placeholder={`${
            session?.user?.name
              ? `${session?.user?.name} what's up`
              : `Please login`
          }`}
        />
        <PhotographIcon className="h-6 w-6 cursor-pointer hover:bg-gray-100 hover:rounded-full" />
        <LinkIcon className="h-6 w-6 cursor-pointer hover:bg-gray-100 hover:rounded-full" />
      </div>
    </form>
  );
};

export default PostBox;
