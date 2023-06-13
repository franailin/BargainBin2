# create login table 
CREATE TABLE author (
	author_id INT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    username VARCHAR(20),
    passwrod VARCHAR(40)
);

DROP TABLE author;

SELECT * FROM author;
