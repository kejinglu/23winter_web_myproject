/*
 Navicat Premium Data Transfer

 Source Server         : phpStudy
 Source Server Type    : MySQL
 Source Server Version : 80012
 Source Host           : localhost:3306
 Source Schema         : node_project

 Target Server Type    : MySQL
 Target Server Version : 80012
 File Encoding         : 65001

 Date: 06/12/2023 23:20:29
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE DATAVASE node_project;
USE node_project
-- ----------------------------
-- Table structure for channels
-- ----------------------------
DROP TABLE IF EXISTS `channels`;
CREATE TABLE `channels`  (
  `channel_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`channel_id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of channels
-- ----------------------------
INSERT INTO `channels` VALUES (2, 'movie', 'gogogo');
INSERT INTO `channels` VALUES (3, 'coco', 'coco');

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments`  (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `user_id` int(11) NULL DEFAULT NULL,
  `post_id` int(11) NULL DEFAULT NULL,
  `parent_comment_id` int(11) NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `img_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`comment_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `post_id`(`post_id`) USING BTREE,
  INDEX `parent_comment_id`(`parent_comment_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES (14, '234234234', 1, 20, 13, '2023-12-06 18:32:43', '');
INSERT INTO `comments` VALUES (12, '123123', 1, 20, 11, '2023-12-06 18:32:32', '');
INSERT INTO `comments` VALUES (13, 'coco', 6, 20, 0, '2023-12-06 18:32:38', 'e6007312-6993-425c-81dc-e1f5763391db.png');
INSERT INTO `comments` VALUES (11, 'coco', 6, 20, 0, '2023-12-06 18:32:27', '');
INSERT INTO `comments` VALUES (10, '45345', 5, 19, 0, '2023-12-06 15:29:33', '');

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts`  (
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `channel_id` int(11) NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `img_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `likes` int(10) UNSIGNED NULL DEFAULT 0,
  `dislikes` int(10) UNSIGNED NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `channel_id`(`channel_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of posts
-- ----------------------------
INSERT INTO `posts` VALUES (21, 6, 3, 'coco2', '112bb97a-9fbd-43c2-a825-b9cca8826bb0.jpeg', 'coco2', 0, 0, '2023-12-06 18:33:09');
INSERT INTO `posts` VALUES (20, 6, 3, 'coco', '0c16a126-fdcc-4ef7-a209-7e87e8331f1a.jpeg', 'coco', 4, 8, '2023-12-06 18:32:05');
INSERT INTO `posts` VALUES (19, 5, 2, 'test', '6bec2e13-3d5a-41da-869d-fc988484ef5f.jpg', 'test', 4, 1, '2023-12-06 15:25:54');
INSERT INTO `posts` VALUES (18, 11, 2, '232', '2cc905ac-d197-4141-a2c8-66220e3e2b43.jpg', '23', 0, 0, '2023-12-06 15:25:42');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `is_admin` tinyint(1) NULL DEFAULT 0,
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE,
  UNIQUE INDEX `email`(`nickname`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (4, 'admin', 'admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 1);
INSERT INTO `users` VALUES (5, 'admin1', 'admin1', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 0);
INSERT INTO `users` VALUES (6, 'coco', 'coco', '4f682b71153ffa91e608445d7ea1257e2076d0d95eab6336cd1aa94b49680f11', 0);

SET FOREIGN_KEY_CHECKS = 1;
