import { useQuery } from "@apollo/client";
import { DotSpinner } from "@uiball/loaders";
import type { NextPage } from "next";
import Head from "next/head";
import Feed from "../components/feed";
import PostBox from "../components/post-box";
import TopCommunities from "../components/top-communities";
import { GET_SUBREDDITS_WITH_LIMIT } from "../graphql/queries";
import { ISubreddit } from "../interfaces";

const Home: NextPage = () => {
  const { data, loading } = useQuery(GET_SUBREDDITS_WITH_LIMIT, {
    variables: {
      limit: 5,
    },
  });

  return (
    <div className="my-7 mx-auto max-w-5xl">
      <Head>
        <title>Next Reddit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PostBox />
      <div className="flex min-w-[500px]">
        <Feed />
        <div className="sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
          <p className="text-md mb-1 p-4 pb-3 font-bold">Top Communities</p>
          {loading ? (
            <div className="flex w-full items-center justify-center p-10 text-xl">
              <DotSpinner size={50} color="#FF4501" />
            </div>
          ) : (
            data?.getSubredditsWithLimit.map(
              (subreddit: ISubreddit, index: number) => (
                <TopCommunities topic={subreddit.topic} index={index} />
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
