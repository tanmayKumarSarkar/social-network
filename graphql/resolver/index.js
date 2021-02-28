const pgClient = require ('../../db')
const schema = process.env.db_schema

const root = {
    getUser : ({email}) => {
        return pgClient.query(`select * from ${schema}.user where email = '${email}'`)
        .then(users => {
            // console.log(users)
            return pgClient.query(`select * from ${schema}.user where id in 
            (select follower_id from ${schema}.Follow where user_id = ${users.rows[0].id})`)
            .then(followers => {
                // console.log(followers.rows)
                let tempUser = users.rows[0]
                tempUser.followers = followers.rows
                // console.log(tempUser)
                return tempUser
            })
            // return users.rows[0]
        })
        .catch(e => console.error(e.stack))
    },
    users : ()=> {
        return pgClient.query(`select * from ${schema}.user`)
            .then(users => {
                console.log(users.rows)
                return users.rows
            })
            .catch(e => console.error(e.stack))
    },

    getFollowers : ({id}) => {
        return pgClient.query(`select * from ${schema}.user where id in 
            (select follower_id from ${schema}.Follow where user_id = ${id})`)
        .then(followers => {
            console.log(followers)
            console.log(followers.rowCount)
            return followers.rowss
        }).catch(e => console.error(e.stack))
    },

    getFollowerPosts : ({user_id, pageSize, pageNumber}) => {
        let postQuery = `
            select pst.*, usr.name from ${schema}.Post pst, ${schema}.User usr where user_id in 
            (select follower_id from ${schema}.Follow where user_id = ${user_id})
            and pst.user_id = usr.id order by ts desc
            LIMIT ${pageSize} OFFSET ${pageSize*(pageNumber-1)};
            select count(1) from ${schema}.Post where user_id in 
            (select follower_id from ${schema}.Follow where user_id = ${user_id});
        `
        return pgClient.query(postQuery)
        .then(posts => {
            // console.log(posts.rows)
            console.log(posts[0].rowCount)
            return {
                posts : posts[0].rows,
                page : {
                    totalRecordCount : posts[1].rows[0].count,
                    currentRecordCount : posts[0].rowCount,
                    totalPages : Math.ceil(posts[1].rows[0].count/pageSize),
                    currentPage : pageNumber
                }
            }
        }).catch(e => console.error(e.stack))
    },

    getFollowerPostsA : ({user_id, pageSize, pageNumber}) => {
        let postQuery = `
            select pst.*, usr.name from ${schema}.Post pst, ${schema}.User usr where user_id in 
            (select follower_id from ${schema}.Follow where user_id = ${user_id})
            and pst.user_id = usr.id order by DATE_TRUNC('hour', ts::timestamp) desc, like_count desc, dislike_count asc
            LIMIT ${pageSize} OFFSET ${pageSize*(pageNumber-1)};
            select count(1) from ${schema}.Post where user_id in 
            (select follower_id from ${schema}.Follow where user_id = ${user_id});
        `
        return pgClient.query(postQuery)
        .then(posts => {
            console.log(posts)
            console.log(posts[0].rowCount)
            console.log(posts[1].rows)
            return {
                posts : posts[0].rows,
                page : {
                    totalRecordCount : posts[1].rows[0].count,
                    currentRecordCount : posts[0].rowCount,
                    totalPages : Math.ceil(posts[1].rows[0].count/pageSize),
                    currentPage : pageNumber
                }
            }
        }).catch(e => console.error(e.stack))
    },

    getUserPosts : ({id}) => {
        return pgClient.query(`select * from ${schema}.Post where user_id = ${id};`)
        .then(posts => {
            // console.log(posts.rows)
            console.log(posts.rowCount)
            return posts.rows
        }).catch(e => console.error(e.stack))
    },

    hello: () => {
        pgClient.query(`select * from ${schema}.user`)
            .then(result => {
                console.log(result)
            })
            .catch(e => console.error(e.stack))
        return 'Hello world!';
    },
};

module.exports = root