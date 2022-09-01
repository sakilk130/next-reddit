import type { NextPage } from "next";
import Head from "next/head";
import Feed from "../components/feed";
import PostBox from "../components/post-box";

const Home: NextPage = () => {
  return (
    <div className="my-7 mx-auto max-w-5xl">
      <Head>
        <title>Next Reddit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PostBox />
      <Feed />
    </div>
  );
};

export default Home;
