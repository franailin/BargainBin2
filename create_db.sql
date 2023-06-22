# create login table 
CREATE TABLE author (
	author_id INT UNSIGNED NOT NULL auto_increment,
    # need not null, or will error "Field 'author_id' doesn't have a default value"
    PRIMARY KEY (author_id),
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    username VARCHAR(20),
    pwd VARCHAR(40)
);
# set where author_id starts
ALTER TABLE author auto_increment=1001;

#DROP TABLE author;

SELECT * FROM author;

#INSERT INTO author (first_name, last_name, username, pwd) VALUES ('A', 'B', 'U', 'V');
