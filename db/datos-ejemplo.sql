-- db/datos-ejemplo.sql (precios en 0 como marcador)
INSERT INTO productos (codigo, nombre, descripcion, categoria, precio, destacado) VALUES
  ('MUJ-001', 'Remera lisa',        'Remera de algodón, corte clásico', 'mujer',  0, TRUE),
  ('HOM-001', 'Remera básica',      'Remera cómoda para todos los días', 'hombre', 0, FALSE),
  ('NIN-001', 'Pantalón de abrigo', 'Pantalón suave para el invierno',   'ninos',  0, TRUE);

INSERT INTO variantes (producto_id, talle, color, stock) VALUES
  (1, 'M', 'Rosa',    5),
  (1, 'L', 'Celeste', 0),
  (3, '8', 'Celeste', 3);
