import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://szasxnupabtxkwxpcoci.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_OAQCPr_TiXqeG6DO0uq3uQ_pMXpLBJ3';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Client {
  id: string;
  name: string;
  phone: string;
  destination: string;
  travel_date: string;
  free_amount: number;
  my_commission: number;
  monto_pagado: number;
  status: 'pending' | 'paid' | 'completed';
  created_at: string;
  updated_at: string;
}
