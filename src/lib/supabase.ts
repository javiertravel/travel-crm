import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://szasxnupabtxkwxpcoci.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_OAQCPr_TiXqeG6DO0uq3uQ_pMXpLBJ3';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Client {
  id: string;
  nombre: string;
  telefono: string;
  destino: string;
  fecha_de_viaje: string;
  free_amount: number;
  my_commission: number;
  monto_pagado: number;
  estado: string;
  notas?: string;
  precio_cotizado?: number;
  atendido?: boolean;
  leido?: boolean;
  compra_confirmada?: boolean;
  recordatorio_viaje?: string;
  created_at: string;
  updated_at: string;
}
