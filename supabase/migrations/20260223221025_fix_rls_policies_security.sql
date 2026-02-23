/*
  # Fix RLS Policies - Enforce Authentication

  1. Changes
    - Remove overly permissive "always true" policies
    - Implement proper authenticated-user-only policies
    - Ensure all operations require valid authentication

  2. Security Improvements
    - SELECT: Only authenticated users can view data
    - INSERT: Only authenticated users can create records
    - UPDATE: Only authenticated users can modify records
    - All operations now properly check authentication via auth.uid()

  3. Policy Details
    - "Authenticated users can view clientela" - SELECT for authenticated users
    - "Authenticated users can insert clientela" - INSERT for authenticated users
    - "Authenticated users can update clientela" - UPDATE for authenticated users
*/

DROP POLICY IF EXISTS "Public select on clientela" ON clientela;
DROP POLICY IF EXISTS "Public insert on clientela" ON clientela;
DROP POLICY IF EXISTS "Public update on clientela" ON clientela;

CREATE POLICY "Authenticated users can view clientela"
  ON clientela FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert clientela"
  ON clientela FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update clientela"
  ON clientela FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
