#Social Networking Demo App


Starting Page: http://localhost:5000/

GraphQL API : http://localhost:5000/graphql

Express API: http://localhost:5000/api/v1

Data Generation API: http://localhost:5000/api/v1/datagen/{all/user/post}


#Some GraphQL Queries:

{
  getFollowerPosts(user_id:1, pageSize:10, pageNumber:1){
    posts{
      id
      title
      body
      user_id
      name
      like_count
      dislike_count
      ts
    }
    page{
      currentRecordCount
      totalRecordCount
      totalPages
      currentPage
    }
  }
}


