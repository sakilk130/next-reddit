import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query MyQuery {
    getPostList {
      id
      body
      title
      username
      image
      created_at
      subreddit {
        id
        topic
      }
      commentList {
        created_at
        id
        text
        username
      }
      voteList {
        id
        upvote
        username
      }
    }
  }
`;

export const GET_POST_BY_SUBREDDIT = gql`
  query MyQuery($subreddit: String!) {
    getPostListBySubreddit(subreddit: $subreddit) {
      id
      body
      title
      username
      image
      created_at
      subreddit {
        id
        topic
      }
      commentList {
        created_at
        id
        text
        username
      }
      voteList {
        id
        upvote
        username
      }
    }
  }
`;

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`;
