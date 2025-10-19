import { supabase } from '../supabase';
import type { Database } from '../database.types';

type PricingModifier = Database['public']['Tables']['pricing_modifiers']['Row'];

export const pricingApi = {
  async getAllModifiers(): Promise<PricingModifier[]> {
    const { data, error } = await supabase
      .from('pricing_modifiers')
      .select('*')
      .order('condition_type');

    if (error) throw error;
    return data || [];
  },

  async getModifier(
    conditionType: PricingModifier['condition_type'],
    conditionValue: string
  ): Promise<PricingModifier | null> {
    const { data, error } = await supabase
      .from('pricing_modifiers')
      .select('*')
      .eq('condition_type', conditionType)
      .eq('condition_value', conditionValue)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async calculatePrice(
    basePrice: number,
    conditions: {
      screen?: string;
      body?: string;
      functional?: string;
      age?: string;
    }
  ): Promise<number> {
    let finalPrice = basePrice;

    const conditionEntries = Object.entries(conditions).filter(([, value]) => value);

    for (const [type, value] of conditionEntries) {
      const modifier = await this.getModifier(
        type as PricingModifier['condition_type'],
        value
      );

      if (modifier) {
        finalPrice *= modifier.multiplier;
      }
    }

    return Math.round(finalPrice);
  },
};
