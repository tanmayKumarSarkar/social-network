-- DROP TABLE IF EXISTS test.User;
CREATE TABLE IF NOT EXISTS test.User (
    id SERIAL PRIMARY KEY,
    name CHARACTER VARYING(60) NOT NULL,
    email CHARACTER VARYING(60) NOT NULL,
    deleted boolean DEFAULT false
);

-- DROP TABLE IF EXISTS test.Follow;
CREATE TABLE IF NOT EXISTS test.Follow (
    user_id INTEGER,
    follower_id INTEGER --user follows person
);

-- DROP TABLE IF EXISTS test.Post;
CREATE TABLE IF NOT EXISTS test.Post (
    id SERIAL PRIMARY KEY,
    title CHARACTER VARYING(255) NOT NULL,
    body CHARACTER VARYING(255) NOT NULL,
    user_id INTEGER,
    like_count INTEGER,
    dislike_count INTEGER,
    deleted boolean DEFAULT false,
    ts TIMESTAMP
);

-- DROP TABLE IF EXISTS test.Comment;
CREATE TABLE IF NOT EXISTS test.Comment (
    id SERIAL PRIMARY KEY,
    text CHARACTER VARYING(255) NOT NULL,
    user_id INTEGER,
    post_id INTEGER,
    deleted boolean DEFAULT false,
    ts TIMESTAMP
);