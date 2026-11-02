UPDATE productos
SET activo = FALSE
WHERE codigo IN ('MUJ-001', 'HOM-001', 'NIN-001');

INSERT INTO productos (codigo, nombre, descripcion, categoria, precio, imagen, imagen_ia, destacado, activo)
VALUES ('MUJ-002', 'Pantalón engomado', 'Tiro alto', 'mujer', 20000.00, 'pantalon-engomado-muj.jpg', TRUE, FALSE, TRUE);

INSERT INTO productos (codigo, nombre, descripcion, categoria, precio, imagen, imagen_ia, destacado, activo)
VALUES ('MUJ-003', 'Pollera engomada', 'Mini con tajo', 'mujer', 15000.00, 'pollera-engomada-muj.jpg', TRUE, FALSE, TRUE);

INSERT INTO productos (codigo, nombre, descripcion, categoria, precio, imagen, imagen_ia, destacado, activo)
VALUES ('MUJ-004', 'Calza Efecto Print', 'Deportiva, efecto animal print', 'mujer', 15000.00, 'calza-print-muj.jpg', TRUE, FALSE, TRUE);

INSERT INTO productos (codigo, nombre, descripcion, categoria, precio, imagen, imagen_ia, destacado, activo)
VALUES ('MUJ-005', 'Calza deportiva', 'Larga, con detalles reflex', 'mujer', 15000.00, 'calza-deportiva-muj.jpg', TRUE, FALSE, TRUE);

INSERT INTO productos (codigo, nombre, descripcion, categoria, precio, imagen, imagen_ia, destacado, activo)
VALUES ('MUJ-006', 'Vestido de hilo', 'Corto, con cintura ajustable', 'mujer', 13000.00, 'vestido-hilo-muj.jpg', TRUE, FALSE, TRUE);

INSERT INTO productos (codigo, nombre, descripcion, categoria, precio, imagen, imagen_ia, destacado, activo)
VALUES ('MUJ-007', 'Remera con vuelo', 'Manga con vuelo en el pliegue', 'mujer', 14000.00, 'remera-buelo-muj-negro.jpg', FALSE, FALSE, TRUE);

INSERT INTO productos (codigo, nombre, descripcion, categoria, precio, imagen, imagen_ia, destacado, activo)
VALUES ('MUJ-008', 'Remera básica gris', 'Estampa un día a la vez', 'mujer', 12000.00, 'remera-basica-muj-gris.jpg', FALSE, FALSE, TRUE);

INSERT INTO productos (codigo, nombre, descripcion, categoria, precio, imagen, imagen_ia, destacado, activo)
VALUES ('HOM-002', 'Jeans recto', 'Corte recto clásico', 'hombre', 35000.00, 'jeans-recto-hom.jpg', TRUE, FALSE, TRUE);

INSERT INTO productos (codigo, nombre, descripcion, categoria, precio, imagen, imagen_ia, destacado, activo)
VALUES ('HOM-003', 'Suéter de hilo', 'Media estación', 'hombre', 18000.00, 'sueter-hilo-hom.jpg', TRUE, FALSE, TRUE);

INSERT INTO productos (codigo, nombre, descripcion, categoria, precio, imagen, imagen_ia, destacado, activo)
VALUES ('NIN-002', 'Vestido liso', 'Liviano', 'ninos', 12000.00, 'vestido-liso-nena.jpg', TRUE, FALSE, TRUE);

INSERT INTO productos (codigo, nombre, descripcion, categoria, precio, imagen, imagen_ia, destacado, activo)
VALUES ('NIN-003', 'Camisa de jeans', 'Canchera y liviana', 'ninos', 14000.00, 'camisa-jeans-nino.jpg', TRUE, FALSE, TRUE);

INSERT INTO variantes (producto_id, talle, color, stock) VALUES
  ((SELECT id FROM productos WHERE codigo = 'MUJ-002'), 'M', 'Negro', 2),
  ((SELECT id FROM productos WHERE codigo = 'MUJ-003'), 'S', 'Negro', 1),
  ((SELECT id FROM productos WHERE codigo = 'MUJ-004'), '1', 'Negro', 1),
  ((SELECT id FROM productos WHERE codigo = 'MUJ-004'), '3', 'Negro', 1),
  ((SELECT id FROM productos WHERE codigo = 'MUJ-005'), '3', 'Negra', 1),
  ((SELECT id FROM productos WHERE codigo = 'MUJ-005'), '4', 'Negra', 1),
  ((SELECT id FROM productos WHERE codigo = 'MUJ-005'), '5', 'Negra', 1),
  ((SELECT id FROM productos WHERE codigo = 'MUJ-006'), 'U', 'Verde oliva', 1),
  ((SELECT id FROM productos WHERE codigo = 'MUJ-007'), 'U', 'Negro', 1),
  ((SELECT id FROM productos WHERE codigo = 'MUJ-007'), 'U', 'Rojo', 1),
  ((SELECT id FROM productos WHERE codigo = 'MUJ-008'), 'M', 'Negro', 1),
  ((SELECT id FROM productos WHERE codigo = 'MUJ-008'), 'L', 'Gris', 1),
  ((SELECT id FROM productos WHERE codigo = 'HOM-002'), '42', 'Celeste', 0),
  ((SELECT id FROM productos WHERE codigo = 'HOM-003'), 'S', 'Beige', 1),
  ((SELECT id FROM productos WHERE codigo = 'NIN-002'), '10', 'Celeste', 1),
  ((SELECT id FROM productos WHERE codigo = 'NIN-003'), '12', 'Celeste', 1);

SELECT codigo, nombre, categoria, precio, imagen, imagen_ia
FROM productos
WHERE activo = TRUE
ORDER BY categoria, codigo;
