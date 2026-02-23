/*
  # Renombrar tabla a clientela y configurar RLS para acceso público

  1. Cambios
    - Renombrar tabla `clientes` a `clientela`
    - Actualizar políticas RLS para permitir inserciones y selecciones públicas

  2. Seguridad
    - RLS habilitado en la tabla `clientela`
    - Políticas que permiten select y insert públicos (herramienta interna privada)
*/

ALTER TABLE clientes RENAME TO clientela;

DROP POLICY IF EXISTS "Allow all access to clientes" ON clientela;

CREATE POLICY "Public select on clientela"
  ON clientela FOR SELECT
  USING (true);

CREATE POLICY "Public insert on clientela"
  ON clientela FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public update on clientela"
  ON clientela FOR UPDATE
  USING (true)
  WITH CHECK (true);