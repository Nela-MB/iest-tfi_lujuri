-- Ejecutar UNA vez en el SQL Editor de Neon, ANTES de subir el código nuevo.
ALTER TABLE productos ADD COLUMN IF NOT EXISTS imagen_ia BOOLEAN DEFAULT FALSE;
