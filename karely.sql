
DROP TABLE IF EXISTS karely_cause_action_fundraising;
DROP TABLE IF EXISTS karely_cause_action_product;
DROP TABLE IF EXISTS karely_cause_action_todo;
DROP TABLE IF EXISTS karely_cause_member;
DROP TABLE IF EXISTS karely_cause_comment;
DROP TABLE IF EXISTS karely_cause_update;
DROP TABLE IF EXISTS karely_cause;

DROP TABLE IF EXISTS karely_user_stat;
DROP TABLE IF EXISTS karely_user_setting;
DROP TABLE IF EXISTS karely_user_session;
DROP TABLE IF EXISTS karely_user_group_link;
DROP TABLE IF EXISTS karely_user;
DROP TABLE IF EXISTS karely_user_group;

CREATE TABLE karely_user_group(
	id SERIAL PRIMARY KEY,
	group_name VARCHAR(50) UNIQUE,
	created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE karely_user(
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	email VARCHAR(255) UNIQUE,
	phone_number VARCHAR(255) UNIQUE,
	password VARCHAR(50),
	avatar TEXT,
	biography TEXT,
	account_type INT NOT NULL DEFAULT 0,
	created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE karely_user_group_link(
	id SERIAL PRIMARY KEY,
	group_id INT4 REFERENCES karely_user_group(id) ON DELETE CASCADE,
	user_id INT4 REFERENCES karely_user(id) ON DELETE CASCADE,
	created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

/*
	Account type 0 for local account, 1 for Google, 2 for Facebook and 3 for Twitter
*/

CREATE TABLE karely_user_session(
	token VARCHAR(255) PRIMARY KEY,
	user_id INT4 REFERENCES karely_user(id) ON DELETE CASCADE,
	remark VARCHAR(255),
	metadata TEXT,
	session_type INT NOT NULL DEFAULT 0,
	expired_on TIMESTAMP, 
	created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE karely_user_setting (
	id SERIAL PRIMARY KEY,
	user_id INT4 REFERENCES karely_user(id) ON DELETE CASCADE,
	setting_group VARCHAR(50),
	name VARCHAR(50),
	value BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE karely_user_stat (
	id SERIAL PRIMARY KEY,
	user_id INT4 REFERENCES karely_user(id) ON DELETE CASCADE,
	setting_group VARCHAR(50),
	stat_name VARCHAR(50),
	stat_group VARCHAR(50),
	stat_type VARCHAR(50),
	stat_total NUMERIC(5, 2)
);



INSERT INTO karely_user_group (group_name) VALUES ('KARELY');
INSERT INTO karely_user_group (group_name) VALUES ('ADMIN');

INSERT INTO karely_user (first_name, last_name, email) VALUES ('CheowKwee', 'Goh', 'cheowkwee@hotmail.com');
INSERT INTO karely_user (first_name, last_name, email) VALUES ('CK', 'Goh', 'cheowkwee@gmail.com');

SELECT * from karely_user_group;




CREATE TABLE karely_cause(
	id SERIAL PRIMARY KEY,
	user_id INT4 REFERENCES karely_user(id) ON DELETE CASCADE,
	title VARCHAR(50) NOT NULL,
	story TEXT NOT NULL,
	visibility BOOLEAN NOT NULL DEFAULT FALSE,
	cause_type INT NOT NULL DEFAULT 0,
	cause_related_1 VARCHAR(50),
	cause_related_2 VARCHAR(50),
	cause_related_3 VARCHAR(50),
	photo TEXT,
	beneficiary_flag BOOLEAN NOT NULL DEFAULT FALSE,
	beneficiary_first_name VARCHAR(50),
	beneficiary_last_name VARCHAR(50),
	beneficiary_email VARCHAR(255),
	created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

/*
	Cause related to ?
	Beneficiary split field ?
	level on update ?
	status field ?
	admin user ?
*/

CREATE TABLE karely_cause_update (
	id SERIAL PRIMARY KEY,
	cause_id INT REFERENCES karely_cause(id) ON DELETE CASCADE,
	update_by INT REFERENCES karely_user(id) ON DELETE CASCADE,
	message TEXT,
	status INT NOT NULL DEFAULT 0,
	created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE karely_cause_comment (
	id SERIAL PRIMARY KEY,
	cause_id INT REFERENCES karely_cause(id) ON DELETE CASCADE,
	comment_by INT REFERENCES karely_user(id) ON DELETE CASCADE,
	message TEXT,
	comment_target INT,
	comment_level INT,
	status INT NOT NULL DEFAULT 0,
	created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE karely_cause_member (
	id SERIAL PRIMARY KEY,
	cause_id INT REFERENCES karely_cause(id) ON DELETE CASCADE,
	user_id INT REFERENCES karely_user(id) ON DELETE CASCADE,
	admin_flag BOOLEAN NOT NULL DEFAULT FALSE,
	status BOOLEAN NOT NULL DEFAULT FALSE,		-- 0 for ok, 1 for ban
	created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

/*
CREATE TABLE karely_cause_admin (
	id SERIAL PRIMARY KEY,
	cause_id INT REFERENCES karely_cause(id) ON DELETE CASCADE,
	user_id INT REFERENCES karely_user(id) ON DELETE CASCADE,
	created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
*/

CREATE TABLE karely_cause_action (
	id SERIAL PRIMARY KEY,
	cause_id INT REFERENCES karely_cause(id) ON DELETE CASCADE,
	action_type INT NOT NULL DEFAULT 0,		-- 0 for todo, 1 for fundraising, 2 for product 
	action_id INT,
	title VARCHAR(50) NOT NULL,
	description TEXT,
	created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE karely_cause_action_todo (
	action_id int,
	cause_id INT REFERENCES karely_cause(id) ON DELETE CASCADE,
	user_id INT REFERENCES karely_user(id) ON DELETE CASCADE,
	fix_volunteers BOOLEAN NOT NULL DEFAULT FALSE,
	volunteers INT,
	recurrence INT,		-- 0 - daily, 1 - weekly, 2 - monthly and 3 - ??? 	
	start_location TEXT,	-- need to be confirm
	end_location TEXT,
);

CREATE TABLE karely_cause_action_todo_volunteer (
	id SERIAL PRIMARY KEY,
	action_id INT REFERENCES karely_action(id) ON DELETE CASCADE,
	cause_id INT REFERENCES karely_cause(id) ON DELETE CASCADE,
	user_id INT REFERENCES karely_user(id) ON DELETE CASCADE,
	created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE karely_cause_action_fundraising (
	action_id int,
	cause_id INT REFERENCES karely_cause(id) ON DELETE CASCADE,
	user_id INT REFERENCES karely_user(id) ON DELETE CASCADE,
);


CREATE TABLE karely_cause_action_product (
	action_id int,
	cause_id INT REFERENCES karely_cause(id) ON DELETE CASCADE,
);

\d+ karely_user_group;
\d+ karely_user;
\d+ karely_user_group_link;
\d+ karely_user_session;
\d+ karely_user_setting;
\d+ karely_user_stat;

\d+ karely_cause;
\d+ karely_cause_update;
\d+ karely_cause_comment;
\d+ karely_cause_member;
\d+ karely_cause_action_todo;
\d+ karely_cause_action_fundraising;
\d+ karely_cause_action_product;

INSERT INTO karely_cause (title, story, visibility) VALUES ('Cause 1', 'Cause 1 story', TRUE);
INSERT INTO karely_cause_update (cause_id, update_by, message) VALUES (1, 1, 'Cause update 1');

SELECT * FROM karely_user;
SELECT * FROM karely_cause;
SELECT * FROM karely_cause_update;

-- DELETE FROM karely_cause where id = 1;

-- SELECT * FROM karely_user;
-- SELECT * FROM karely_cause;
-- SELECT * FROM karely_cause_update;


