CREATE DATABASE spotify_manager_db;
USE spotify_manager_db;

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `spotifyUserId` varchar(255) NOT NULL DEFAULT '',
  `accessToken` text NOT NULL,
  `refreshToken` varchar(255) NOT NULL,
  `expireTime` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
