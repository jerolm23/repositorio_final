-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: proyecto
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `conteofemenino`
--

DROP TABLE IF EXISTS `conteofemenino`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conteofemenino` (
  `estadoAnimo` varchar(20) NOT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`estadoAnimo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conteofemenino`
--

LOCK TABLES `conteofemenino` WRITE;
/*!40000 ALTER TABLE `conteofemenino` DISABLE KEYS */;
INSERT INTO `conteofemenino` VALUES ('estable',0),('feliz',0),('triste',0);
/*!40000 ALTER TABLE `conteofemenino` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conteomasculino`
--

DROP TABLE IF EXISTS `conteomasculino`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conteomasculino` (
  `estadoAnimo` varchar(20) NOT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`estadoAnimo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conteomasculino`
--

LOCK TABLES `conteomasculino` WRITE;
/*!40000 ALTER TABLE `conteomasculino` DISABLE KEYS */;
INSERT INTO `conteomasculino` VALUES ('estable',3),('feliz',2),('triste',4);
/*!40000 ALTER TABLE `conteomasculino` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `libros`
--

DROP TABLE IF EXISTS `libros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `libros` (
  `url` text NOT NULL,
  `estado` int(11) NOT NULL,
  `tipo` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `libros`
--

LOCK TABLES `libros` WRITE;
/*!40000 ALTER TABLE `libros` DISABLE KEYS */;
INSERT INTO `libros` VALUES ('conversaciones_con_dios.pdf',3,'espiritual'),('El_Hombre_en_Busca_de_Sentido_Frankl_Viktor.pdf',1,'espiritual'),('diaz_irma_el_aliento_de_dios.pdf',1,'espiritual'),('los_cuatro_acuerdos.pdf',2,'espiritual'),('El_poder_del_ahora_Eckhart_Tolle.pdf',2,'espiritual'),('Una_nueva_tierra.pdf',2,'espiritual'),('Dalai_Lama_-_El_Arte_De_La_Felicidad.pdf',3,'espiritual'),('Epicteto_El_Arte_de_vivir.pdf',3,'espiritual'),('las_sombras_de_la_mente.pdf',1,'mental'),('Fluir.pdf',1,'mental'),('Daniel_Pensar_Rapido_Pensar_Despacio.pdf',1,'mental'),('libro_entrena_tu_mente.pdf',2,'mental'),('el_poder_de_tu_mente_subconsciente.pdf',2,'mental'),('inteligencia_emocional.pdf',2,'mental'),('MINDSET._LA_ACTITUD_DEL_EXITO.pdf',3,'mental'),('mente_milionaria_gerardo_garcia_manjarrez.pdf',3,'mental'),('domina_tu_mente.pdf',3,'mental'),('Tus_Zonas_Erroneas_Wayne_Dyer.pdf',1,'personal'),('Victor_Hugo_Manzanilla_Despierta_tu_heroe_interior.pdf',1,'personal'),('El_sutil_arte_de_que_te_importe_un_carajo.pdf',1,'personal'),('Robin_Sharma_-_El_Monje_que_Vendio_su_Ferrari.pdf',2,'personal'),('la_magia_del_orden.pdf',2,'personal'),('Los_7_habitos_de_la_gente_altamente_efectiva._Stephen_R._Covey.pdf',2,'personal'),('habitos_atomicos.pdf',3,'personal'),('El_poder_del_ahora.pdf',3,'personal'),('Piense_y_hagase_rico_Napoleon_Hill.pdf',3,'personal'),('La_Paz_de_Dios.pdf',1,'espiritual');
/*!40000 ALTER TABLE `libros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlist`
--

DROP TABLE IF EXISTS `playlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlist` (
  `genero` varchar(30) NOT NULL,
  `url` text NOT NULL,
  PRIMARY KEY (`genero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlist`
--

LOCK TABLES `playlist` WRITE;
/*!40000 ALTER TABLE `playlist` DISABLE KEYS */;
INSERT INTO `playlist` VALUES ('espiritual','PLQEhbl8czVTbZ6HetGzQnlfapvVTJ-OmN'),('mental','PLQEhbl8czVTYnCdirxFr-tsolmA0zKTlD'),('personal','PLQEhbl8czVTY_xcDYVjtk18Ci3YQb5xB8');
/*!40000 ALTER TABLE `playlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  `genero` varchar(12) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (5,'jero','jerolomon@gmail.com','123','Masculino'),(6,'tomas','osoriocorralestomas@gmail.com','1234','Masculino');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videos`
--

DROP TABLE IF EXISTS `videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `videos` (
  `url` text NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videos`
--

LOCK TABLES `videos` WRITE;
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;
INSERT INTO `videos` VALUES ('La_tristeza_una_emocion_para_la_reflexion.mp4',1),('Que_es_la_felicidad__Sadhguru.mp4',3),('Como_ser_mas_estable_.mp4',2);
/*!40000 ALTER TABLE `videos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'proyecto'
--

--
-- Dumping routines for database 'proyecto'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-04 14:33:48
