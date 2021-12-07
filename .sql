CREATE DATABASE "quickVid";


-- organization table


CREATE TABLE users(
    id TEXT UNIQUE NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "mail" TEXT NOT NULL UNIQUE,
    "hash" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);


-- product table

CREATE TABLE posts(
    id TEXT UNIQUE NOT NULL PRIMARY KEY,
    "userName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "videoImage" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Payment table

CREATE TABLE comments(
    id TEXT UNIQUE NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userImg" TEXT NOT NULL,
    "postTitle" TEXT NOT NULL,
    "postImg" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);












