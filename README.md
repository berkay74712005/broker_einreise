# broker_einreise

add this sql to ur database

ALTER TABLE `users` ADD COLUMN `einreise` INT(1) NOT NULL DEFAULT '0';

if you want to change table change users to your liking and in server.lua also
