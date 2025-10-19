import { supabase } from '../supabase';
import type { Database } from '../database.types';

type City = Database['public']['Tables']['cities']['Row'];

export const citiesApi = {
  async getAll(): Promise<City[]> {
    const { data, error } = await supabase
      .from('cities')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<City | null> {
    const { data, error } = await supabase
      .from('cities')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },
};
