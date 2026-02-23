/*
  # Agregar columna monto_pagado a tabla clientela

  1. Cambios
    - Agregar columna `monto_pagado` (decimal) con valor por defecto 0
    - Esta columna almacena el monto pagado por el cliente
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'clientela' AND column_name = 'monto_pagado'
  ) THEN
    ALTER TABLE clientela ADD COLUMN monto_pagado decimal(10, 2) NOT NULL DEFAULT 0;
  END IF;
END $$;