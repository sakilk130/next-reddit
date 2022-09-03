import { gql } from "@apollo/client";

export const ADD_POST = gql`
  mutation MyMutation(
    $title: String!
    $image: String!
    $body: String!
    $subreddit_id: ID!
    $username: String!
  ) {
    insertPost(
      title: $title
      image: $image
      body: $body
      subreddit_id: $subreddit_id
      username: $username
    ) {
      id
      title
      image
      body
      username
      subreddit_id
      created_at
    }
  }
`;

export const ADD_SUBREDDIT = gql`
  mutation MyMutation($topic: String!) {
    insertSubreddit(topic: $topic) {
      id
      topic
      created_at
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation MyMutation($text: String!, $username: String!, $post_id: ID!) {
    insertComment(text: $text, username: $username, post_id: $post_id) {
      created_at
      id
      post_id
      text
      username
    }
  }
`;

export const ADD_VOTE = gql`
  mutation MyMutation($upvote: Boolean!, $username: String!, $post_id: ID!) {
    insertVote(upvote: $upvote, username: $username, post_id: $post_id) {
      id
      post_id
      username
      upvote
    }
  }
`;

export const DELETE_VOTE_BY_ID = gql`
  mutation MyMutation($id: ID!) {
    deleteVote(id: $id) {
      id
    }
  }
`;
