import { ChevronUpIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Avatar from "../avater";

interface ITopCommunitiesProps {
  topic: string;
  index: number;
}

const TopCommunities = ({ topic, index }: ITopCommunitiesProps) => {
  return (
    <div className="flex items-center space-x-2 border-t bg-white px-4 py-2 last:rounded-b">
      <p>{index + 1}</p>
      <ChevronUpIcon className="h-4 w-4 flex-shrink-0 text-green-400" />
      <Avatar url={`https://avatars.dicebear.com/api/human/${topic}.svg`} />
      <p className="flex-1 truncate">r/{topic}</p>
      <Link href={`/subreddit/${topic}`}>
        <div className="cursor-pointer rounded-full bg-blue-500 px-3 text-white">
          View
        </div>
      </Link>
    </div>
  );
};

export default TopCommunities;
