UPDATE productos
SET precio = 16000.00
WHERE codigo = 'MUJ-001';

UPDATE productos
SET precio = 13000.00
WHERE codigo = 'HOM-001';

UPDATE productos
SET precio = 20000.00
WHERE codigo = 'NIN-001';

SELECT codigo, nombre, precio
FROM productos
ORDER BY id;
