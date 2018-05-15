DELIMITER $$
CREATE PROCEDURE prepare_data2()
BEGIN
  DECLARE i INT DEFAULT 1;

  WHILE i < 100 DO
    INSERT INTO user (user_username) VALUES ('testuser');
    SET i = i + 1;
  END WHILE;
END$$
DELIMITER ;