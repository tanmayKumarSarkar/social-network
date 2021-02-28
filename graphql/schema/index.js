var { buildSchema } = require('graphql');

const schema = buildSchema(`

  type Query {
    getUser (email: String!) : User
    users: [User]
    getFollowers(id: Int) : [User]
    getFollowerPosts (user_id: Int, pageSize: Int, pageNumber: Int): FollowerPosts
    getFollowerPostsA (user_id: Int, pageSize: Int, pageNumber: Int): FollowerPostsA
    getUserPosts (id: Int): [Post] 
    hello: String
  }

  type User {
    id: Int
    name: String
    email: String
    followers: [User]
    deleted: Boolean
  }

  type Post {
    id: Int!
    title: String!
    body: String!
    user_id: String
    name: String
    comments: [Comment] 
    like_count: Int
    dislike_count: Int
    deleted: Boolean
    ts: Date
  }

  type FollowerPosts{
    posts: [Post]
    page : Page
  }

  type FollowerPostsA{
    posts: [Post]
    page : Page
  }

  type Page {
    currentRecordCount : Int
    totalRecordCount : Int
    totalPages : Int
    currentPage : Int
  }

  type Comment {
    id: Int!
    text: String!
    user: User
    post: Post
    deleted: Boolean
    ts: Date
  }

  scalar Date

`);

module.exports = schema