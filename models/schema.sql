DROP DATABASE IF EXISTS postitDB;
CREATE DATABASE postitDB;

USE postitDB;

CREATE TABLE posts
(
	id int NOT NULL AUTO_INCREMENT,
	author VARCHAR(40) NOT NULL,
    postTitle VARCHAR(255) NOT NULL,
	upvotes INT NOT NULL,
    content VARCHAR(255) NOT NULL,
    comments VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO posts (author, postTitle, upvotes, content, comments) VALUES ('Bobby', 'Check out my new car!', 5, 'I bought it at the Irvine dealer hahah', 'Cool Dude!');
INSERT INTO posts (author, postTitle, upvotes, content, comments) VALUES ('Billy', 'This is a title!', 50, 'This is a cool comment!', 'Wow!');
