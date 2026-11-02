-- EJEMPLO: cambiá los nombres de archivo por los de tus fotos (carpeta public/media/prendas/).
-- imagen_ia = TRUE si la foto fue generada con IA; FALSE si es una foto real y propia.
UPDATE productos SET imagen = 'remera-lisa.jpg',    imagen_ia = TRUE  WHERE codigo = 'MUJ-001';
UPDATE productos SET imagen = 'remera-basica.jpg',  imagen_ia = FALSE WHERE codigo = 'HOM-001';
UPDATE productos SET imagen = 'pantalon-abrigo.jpg', imagen_ia = TRUE  WHERE codigo = 'NIN-001';

SELECT codigo, nombre, imagen, imagen_ia FROM productos;
