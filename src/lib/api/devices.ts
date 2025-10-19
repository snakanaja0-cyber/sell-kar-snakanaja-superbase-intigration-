import { supabase } from '../supabase';
import type { Database } from '../database.types';

type DeviceBrand = Database['public']['Tables']['device_brands']['Row'];
type Device = Database['public']['Tables']['devices']['Row'];
type DeviceVariant = Database['public']['Tables']['device_variants']['Row'];

export interface DeviceWithBrand extends Device {
  device_brands: DeviceBrand;
}

export interface DeviceVariantWithDevice extends DeviceVariant {
  devices: DeviceWithBrand;
}

export const devicesApi = {
  async getBrandsByType(deviceType: 'phone' | 'laptop' | 'ipad'): Promise<DeviceBrand[]> {
    const { data, error } = await supabase
      .from('device_brands')
      .select('*')
      .eq('device_type', deviceType)
      .eq('is_active', true)
      .order('name');

    if (error) throw error;
    return data || [];
  },

  async getDevicesByBrand(brandId: string): Promise<Device[]> {
    const { data, error } = await supabase
      .from('devices')
      .select('*')
      .eq('brand_id', brandId)
      .eq('is_active', true)
      .order('name');

    if (error) throw error;
    return data || [];
  },

  async getVariantsByDevice(deviceId: string): Promise<DeviceVariant[]> {
    const { data, error } = await supabase
      .from('device_variants')
      .select('*')
      .eq('device_id', deviceId)
      .eq('is_active', true)
      .order('storage');

    if (error) throw error;
    return data || [];
  },

  async getVariantById(variantId: string): Promise<DeviceVariantWithDevice | null> {
    const { data, error } = await supabase
      .from('device_variants')
      .select(`
        *,
        devices (
          *,
          device_brands (*)
        )
      `)
      .eq('id', variantId)
      .maybeSingle();

    if (error) throw error;
    return data as DeviceVariantWithDevice | null;
  },

  async getDeviceById(deviceId: string): Promise<DeviceWithBrand | null> {
    const { data, error } = await supabase
      .from('devices')
      .select(`
        *,
        device_brands (*)
      `)
      .eq('id', deviceId)
      .maybeSingle();

    if (error) throw error;
    return data as DeviceWithBrand | null;
  },
};
