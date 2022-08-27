import {
  Bars3Icon,
  BellIcon,
  ChatBubbleLeftIcon,
  ChevronDownIcon,
  GlobeAltIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  SparklesIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="sticky top-0 z-50 flex items-center bg-white px-4 py-2 shadow-md">
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <Link href="/">
          <Image objectFit="contain" src="/images/logo.jpg" layout="fill" />
        </Link>
      </div>
      <div className="flex ml-2 gap-2 items-center  xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5 cursor-pointer" />
        <p className=" hidden flex-1 lg:inline cursor-pointer">Home</p>
        <ChevronDownIcon className="h-5 w-5 mr-3" />
      </div>
      <div className="flex flex-1 items-center bg-gray-200 p-2 gap-2 rounded-sm">
        <form className="flex gap-2 flex-1">
          <MagnifyingGlassIcon className="h-5 w-5" />
          <input
            type="text"
            className="flex-1 w-full bg-transparent border-none outline-none"
            placeholder="Search"
          />
          <input type="submit" hidden />
        </form>
      </div>

      <div className="mx-5 hidden items-center space-x-2 text-gray-500 lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeAltIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatBubbleLeftIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
      </div>

      <div className="hidden lg:flex border px-2 py-1 cursor-pointer">
        <div className="flex gap-2">
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              objectFit="contain"
              src="/images/reddit-logo.png"
              layout="fill"
              alt=""
            />
          </div>
          <p className="text-gray-500 hover:text-gray-700 ">Login</p>
        </div>
      </div>

      <div className="mx-5 flex items-center lg:hidden">
        <Bars3Icon className="icon" />
      </div>
    </div>
  );
};

export default Header;
