-- migrate:up
CREATE TABLE news (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    headline VARCHAR(255) NOT NULL,
    body VARCHAR(4096) NOT NULL,
    link VARCHAR(255) NULL,
    picture_id int NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (picture_id) REFERENCES files(id) ON DELETE RESTRICT ON UPDATE RESTRICT
);

-- migrate:down
DROP TABLE news;