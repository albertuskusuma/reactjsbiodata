/*
Navicat MySQL Data Transfer

Source Server         : LOKALAN_3306
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : reactbiodata

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2022-05-30 09:18:11
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for xm_biodata_mhs
-- ----------------------------
DROP TABLE IF EXISTS `xm_biodata_mhs`;
CREATE TABLE `xm_biodata_mhs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(100) DEFAULT NULL,
  `umur` int(4) DEFAULT NULL,
  `id_jenis_kelamin` int(11) DEFAULT NULL,
  `id_fakultas` int(11) DEFAULT NULL,
  `id_prodi` int(11) DEFAULT NULL,
  `is_delete` int(11) DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of xm_biodata_mhs
-- ----------------------------
INSERT INTO `xm_biodata_mhs` VALUES ('1', 'ALBERTUS SINDHU ADHI KUSUMA', '21', '1', '2', '8', '0');
INSERT INTO `xm_biodata_mhs` VALUES ('2', 'Ayu', '20', '2', '1', '3', '0');
INSERT INTO `xm_biodata_mhs` VALUES ('3', 'jarot', '21', '1', '1', '2', '0');
INSERT INTO `xm_biodata_mhs` VALUES ('29', 'wwww', '22', '1', '1', '2', '0');
INSERT INTO `xm_biodata_mhs` VALUES ('30', 'kezia', '22', '2', '1', '1', '0');
INSERT INTO `xm_biodata_mhs` VALUES ('31', 'dara', '19', '2', '1', '2', '0');
INSERT INTO `xm_biodata_mhs` VALUES ('32', 'dara', '19', '2', '1', '2', '0');
INSERT INTO `xm_biodata_mhs` VALUES ('33', 'dara', '19', '2', '1', '2', '0');
INSERT INTO `xm_biodata_mhs` VALUES ('34', 'dara', '19', '2', '1', '2', '1');
INSERT INTO `xm_biodata_mhs` VALUES ('35', 'kezia', '21', '2', '1', '1', '1');

-- ----------------------------
-- Table structure for xm_fakultas
-- ----------------------------
DROP TABLE IF EXISTS `xm_fakultas`;
CREATE TABLE `xm_fakultas` (
  `id_fakultas` int(11) NOT NULL AUTO_INCREMENT,
  `nama_fakultas` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_fakultas`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of xm_fakultas
-- ----------------------------
INSERT INTO `xm_fakultas` VALUES ('1', 'FTI');
INSERT INTO `xm_fakultas` VALUES ('2', 'FTEK');
INSERT INTO `xm_fakultas` VALUES ('3', 'FSM');

-- ----------------------------
-- Table structure for xm_jenis_kelamin
-- ----------------------------
DROP TABLE IF EXISTS `xm_jenis_kelamin`;
CREATE TABLE `xm_jenis_kelamin` (
  `id_jenis_kelamin` int(11) NOT NULL AUTO_INCREMENT,
  `jenis_kelamin` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_jenis_kelamin`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of xm_jenis_kelamin
-- ----------------------------
INSERT INTO `xm_jenis_kelamin` VALUES ('1', 'Laki-laki');
INSERT INTO `xm_jenis_kelamin` VALUES ('2', 'Perempuan');

-- ----------------------------
-- Table structure for xm_prodi
-- ----------------------------
DROP TABLE IF EXISTS `xm_prodi`;
CREATE TABLE `xm_prodi` (
  `id_prodi` int(11) NOT NULL AUTO_INCREMENT,
  `nama_prodi` varchar(100) DEFAULT NULL,
  `id_fakultas` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_prodi`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of xm_prodi
-- ----------------------------
INSERT INTO `xm_prodi` VALUES ('1', 'Sistem Informasi', '1');
INSERT INTO `xm_prodi` VALUES ('2', 'Teknik Informatika', '1');
INSERT INTO `xm_prodi` VALUES ('3', 'DKV', '1');
INSERT INTO `xm_prodi` VALUES ('4', 'Kimia', '3');
INSERT INTO `xm_prodi` VALUES ('5', 'Fisika', '3');
INSERT INTO `xm_prodi` VALUES ('6', 'Matematika', '3');
INSERT INTO `xm_prodi` VALUES ('7', 'Elektro', '2');
INSERT INTO `xm_prodi` VALUES ('8', 'Sistem Komputer', '2');

-- ----------------------------
-- Table structure for xm_user
-- ----------------------------
DROP TABLE IF EXISTS `xm_user`;
CREATE TABLE `xm_user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `access_token` text DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `is_login` int(11) DEFAULT 0 COMMENT '0 = belum login, 1 = login',
  `update_date` datetime DEFAULT NULL,
  `is_delete` int(11) DEFAULT 0,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of xm_user
-- ----------------------------
INSERT INTO `xm_user` VALUES ('1', 'sindhu', 'sindhu@gmail.com', 'sindhu', '123', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2luZGh1IiwiaWF0IjoxNjUzNzA0NjExLCJleHAiOjE2NTM3MDQ2NzF9.ebIs8L5uhrPTgnKkc6U2ouR3gXEcF-1PqDHr3_G_gco', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2luZGh1IiwiaWF0IjoxNjUzNzA0NjExfQ.I1jQKBqPukg_XuDlg4cKM7e_vauUv0tD6UUiSXw1Jq4', '1', null, '0');
