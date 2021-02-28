const pgClient = require ('../../db')
const schema = process.env.db_schema

const userCount = 100000
const followCount = 51
const postCount = 10

genUser = ()=> {

    pgClient.query(`
        DROP TABLE IF EXISTS ${schema}.User;
        CREATE TABLE IF NOT EXISTS ${schema}.User (
            id SERIAL PRIMARY KEY,
            name CHARACTER VARYING(60) NOT NULL,
            email CHARACTER VARYING(60) NOT NULL,
            deleted boolean DEFAULT false
        );
        DROP TABLE IF EXISTS ${schema}.Follow;
        CREATE TABLE IF NOT EXISTS ${schema}.Follow (
            user_id INTEGER,
            follower_id INTEGER
        );
    `)
    .then(res => {
        console.log(res)
        for (let i = 1 ; i <= userCount; i++ ){
            let name = Math.random().toString(36).substring(2);
            let domain = Math.random().toString(36).substring(9);

            // follower for the user
            let queryFollow = ''
            randInt = Math.floor(Math.random() * (userCount - followCount)) + 1
            for (let j = randInt ; j <= followCount + randInt; j++ ){
                user_id = i
                if (user_id != j){
                    queryFollow = queryFollow + `
                        INSERT INTO ${schema}.Follow values (${user_id}, ${j});
                    `
                }
            }

            pgClient.query(`
                INSERT INTO ${schema}.User values (DEFAULT, '${name}', '${name}@${domain}.com', false);
                ${queryFollow}
            `)
            .then(user => {
                console.log(user.rows)
            }).catch(e => console.error(e.stack))
        }

    }).catch(e => console.error(e.stack))
}

genPost = ()=> {
    pgClient.query(`
        DROP TABLE IF EXISTS ${schema}.Post;
        CREATE TABLE IF NOT EXISTS ${schema}.Post (
            id SERIAL PRIMARY KEY,
            title CHARACTER VARYING(255) NOT NULL,
            body CHARACTER VARYING(255) NOT NULL,
            user_id INTEGER,
            like_count INTEGER,
            dislike_count INTEGER,
            deleted boolean DEFAULT false,
            ts TIMESTAMP
        );
    `)
    .then(res => {
        console.log(res)
        for (let i = 1 ; i <= userCount; i++ ){
            // post for the user
            let queryPost = ''
            for (let j = 1 ; j <= postCount; j++ ){
                user_id = i
                post_no = ((i-1)*10)+j
                queryPost = queryPost + `
                    INSERT INTO ${schema}.Post values (DEFAULT, 'Sample post Title ${post_no}', 
                    'This is a sample Post Body ${post_no}', ${user_id}, ${Math.floor(Math.random() * postCount) + 1}, 
                    ${Math.floor(Math.random() * postCount) + 1}, DEFAULT, now() - interval '${postCount-j} hours ${postCount-j} minutes' );
                `
            }

            pgClient.query(`${queryPost}`)
            .then(post => {
                // console.log(post.rows)
            }).catch(e => console.error(e.stack))
        }

    }).catch(e => console.error(e.stack))
}

generator = (param) => {
    console.log(param);
    
    if (param == 'all'){

    }else if (param == 'user'){
        genUser()
    }else if (param == 'post'){
        genPost()
    }
}

module.exports = generator

