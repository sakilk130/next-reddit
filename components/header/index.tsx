import {
  ChevronDownIcon,
  HomeIcon,
  SearchIcon,
  MenuIcon,
} from "@heroicons/react/solid";
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { data } = useSession();

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
          <SearchIcon className="h-5 w-5" />
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
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerphoneIcon className="icon" />
      </div>
      <div className="hidden lg:flex border px-2 py-1 cursor-pointer">
        {data ? (
          <div
            onClick={() => signOut()}
            className="hidden cursor-pointer items-center space-x-2 border border-gray-100 p-2 lg:flex "
          >
            <div className="relative h-5 w-5 flex-shrink-0">
              <Image
                objectFit="contain"
                src="/images/reddit-logo.png"
                layout="fill"
                alt=""
              />
            </div>

            <div className="flex-1 text-xs">
              <p className="truncate">{data.user?.name}</p>
              <p className="text-gray-400">1 Karma</p>
            </div>
            <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400" />
          </div>
        ) : (
          <div onClick={() => signIn()} className="flex gap-2">
            <div className="relative h-5 w-5 flex-shrink-0">
              <Image
                objectFit="contain"
                src="/images/reddit-logo.png"
                layout="fill"
                alt=""
              />
            </div>
            <p className="text-gray-500 hover:text-gray-700 ">Sign In</p>
          </div>
        )}
      </div>

      <div className="mx-5 flex items-center lg:hidden">
        <MenuIcon className="icon" />
      </div>
    </div>
  );
};

export default Header;
