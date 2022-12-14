import Head from "next/head";
import { useRouter } from "next/router";
import Avatar from "../../components/avater";
import Feed from "../../components/feed";
import PostBox from "../../components/post-box";

const Subreddit = () => {
  const {
    query: { subreddit },
  } = useRouter();

  return (
    <>
      <Head>
        <title>{subreddit}</title>
      </Head>
      <div className={`h-24 bg-red-400 p-8`}>
        <div className="-mx-8 mt-10 bg-white">
          <div className="mx-auto flex max-w-5xl items-center space-x-4 pb-3">
            <div className="-mt-5">
              <Avatar
                large={true}
                url={`https://avatars.dicebear.com/api/human/${subreddit}.svg`}
              />
            </div>
            <div className="py-2">
              <h1 className="text-3xl font-semibold">
                Welcome to the r/{subreddit} subreddit
              </h1>
              <p className="text-sm text-gray-400">r/{subreddit}</p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-5 max-w-5xl pb-10">
          <PostBox subreddit={subreddit as string} />
          <Feed subreddit={subreddit as string} />
        </div>
      </div>
    </>
  );
};

export default Subreddit;
