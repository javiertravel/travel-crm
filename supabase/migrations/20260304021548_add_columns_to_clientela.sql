/*
  # Add columns to clientela table

  1. New Columns
    - `notas` (text) - Notes about the client
    - `precio_cotizado` (decimal) - Quoted price
    - `atendido` (boolean) - Whether client has been attended to
    - `leido` (boolean) - Whether client message has been read
    - `compra_confirmada` (boolean) - Whether purchase is confirmed
    - `recordatorio_viaje` (timestamp) - Travel reminder timestamp
*/

ALTER TABLE clientela
ADD COLUMN notas TEXT,
ADD COLUMN precio_cotizado DECIMAL,
ADD COLUMN atendido BOOLEAN DEFAULT false,
ADD COLUMN leido BOOLEAN DEFAULT false,
ADD COLUMN compra_confirmada BOOLEAN DEFAULT false,
ADD COLUMN recordatorio_viaje TIMESTAMP;
