
CREATE TABLE user(
    user_id INT NOT NULL AUTO_INCREMENT,
    user_username VARCHAR(20),
    user_first_name VARCHAR(32),
    user_last_name VARCHAR(32),
    user_email VARCHAR(64),
    user_description VARCHAR(511),
    user_avatar_url VARCHAR(255),
    user_salt CHAR(126),
    user_password CHAR(255),
    user_force_pw_change BIT(1),
    user_force_name_change BIT(1),
    user_guest BIT(1),
    CONSTRAINT user_pk PRIMARY KEY (user_id)
);