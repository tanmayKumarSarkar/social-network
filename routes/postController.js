global.fetch = require("node-fetch");

const getUserDetails = (req, res, next)=> {
    let email = req.query.email
    let query = `
    {
        getUser(email: "${email}"){
          id
          name
          email
          followers{
            id
            name
            email
          }
        }
    }
    `
    return fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query
        })
    })
    .then(r => r.json())
    .then(data => {
        console.log(data.data.getUser)
        return res.render('home', {
            user : data.data.getUser
        })
    });
}

const getFollowerPosts = (req, res, next)=> {
    let id = req.query.id
    let pagesize = req.query.pagesize || 10
    let pageno = req.query.pageno || 1

    let query = `
    {
        getFollowerPosts(user_id:${id}, pageSize:${pagesize}, pageNumber:${pageno}){
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
    `
    return fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query
        })
    })
    .then(r => r.json())
    .then(data => {
        console.log(data.data.getFollowerPosts)
        return res.render('posts', {
            data : data.data.getFollowerPosts,
            userid : id,
            pagesize: pagesize
        })
    });
}

module.exports = {
    getUserDetails,
    getFollowerPosts
}