/*
  # Crear tabla de clientes para CRM de agencia de viajes

  1. Nueva tabla
    - `clients`
      - `id` (uuid, clave primaria) - ID único del cliente
      - `name` (text) - Nombre del cliente
      - `phone` (text) - Teléfono del cliente
      - `destination` (text) - Destino del viaje
      - `travel_date` (date) - Fecha del viaje
      - `free_amount` (decimal) - Monto libre/precio
      - `my_commission` (decimal) - Mi comisión (15% de free_amount)
      - `status` (text) - Estado (pending, paid, completed)
      - `created_at` (timestamptz) - Fecha de creación
      - `updated_at` (timestamptz) - Fecha de actualización

  2. Seguridad
    - Habilitar RLS en la tabla `clients`
    - Agregar políticas para permitir acceso completo (herramienta interna privada)
*/

CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  destination text NOT NULL,
  travel_date date NOT NULL,
  free_amount decimal(10, 2) NOT NULL DEFAULT 0,
  my_commission decimal(10, 2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'completed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to clients"
  ON clients
  FOR ALL
  USING (true)
  WITH CHECK (true);