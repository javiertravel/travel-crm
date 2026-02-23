/*
  # Add user_id column and implement secure RLS policies

  1. New Columns
    - `user_id` (uuid, required, foreign key to auth.users)
    - Tracks which authenticated user created and owns each record

  2. Changes
    - Add user_id column to clientela table
    - Drop all existing permissive policies
    - Create new policies enforcing user ownership:
      - SELECT: Users can only view their own records
      - INSERT: Users can only create records with their own user_id
      - UPDATE: Users can only modify their own records
    - All policies require authentication

  3. Security
    - RLS enabled on clientela table
    - Each policy verifies auth.uid() matches the record's user_id
    - No "always true" conditions
    - Proper user ownership enforcement
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'clientela' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE clientela ADD COLUMN user_id uuid;
    ALTER TABLE clientela ADD CONSTRAINT clientela_user_id_fk FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

DROP POLICY IF EXISTS "Authenticated users can view clientela" ON clientela;
DROP POLICY IF EXISTS "Authenticated users can insert clientela" ON clientela;
DROP POLICY IF EXISTS "Authenticated users can update clientela" ON clientela;
DROP POLICY IF EXISTS "Public select on clientela" ON clientela;
DROP POLICY IF EXISTS "Public insert on clientela" ON clientela;
DROP POLICY IF EXISTS "Public update on clientela" ON clientela;

CREATE POLICY "Users can view own records"
  ON clientela FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own records"
  ON clientela FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own records"
  ON clientela FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own records"
  ON clientela FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());
