/*
  # Add estado column to clientela table

  1. New Columns
    - `estado` (text) - Travel status with allowed values: pendiente, confirmado, cancelado
      - Defaults to 'pendiente'
      - Has CHECK constraint to validate allowed values

  2. Changes
    - Adds new estado column to track travel status separately from payment status
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'clientela' AND column_name = 'estado'
  ) THEN
    ALTER TABLE clientela ADD COLUMN estado text DEFAULT 'pendiente' NOT NULL;
    
    ALTER TABLE clientela ADD CONSTRAINT clientela_estado_check 
    CHECK (estado IN ('pendiente', 'confirmado', 'cancelado'));
  END IF;
END $$;
