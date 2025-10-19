import { supabase } from '../supabase';
import type { Database } from '../database.types';

type Order = Database['public']['Tables']['orders']['Row'];
type OrderInsert = Database['public']['Tables']['orders']['Insert'];
type OrderUpdate = Database['public']['Tables']['orders']['Update'];
type DeviceCondition = Database['public']['Tables']['device_conditions']['Insert'];

export interface OrderWithDetails extends Order {
  device_variants: {
    storage: string;
    devices: {
      name: string;
      device_brands: {
        name: string;
      };
    };
  };
  cities: {
    name: string;
    state: string;
  };
  device_conditions?: {
    screen_condition: string | null;
    body_condition: string | null;
    functional_condition: string | null;
    device_age: string | null;
    has_original_box: boolean;
    has_accessories: boolean;
    has_warranty: boolean;
  }[];
}

export const ordersApi = {
  async create(
    orderData: Omit<OrderInsert, 'id' | 'created_at' | 'updated_at'>,
    conditionData: Omit<DeviceCondition, 'id' | 'order_id' | 'created_at'>
  ): Promise<Order> {
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single();

    if (orderError) throw orderError;

    const { error: conditionError } = await supabase
      .from('device_conditions')
      .insert({
        ...conditionData,
        order_id: order.id,
      });

    if (conditionError) throw conditionError;

    return order;
  },

  async getById(orderId: string): Promise<OrderWithDetails | null> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        device_variants (
          storage,
          devices (
            name,
            device_brands (
              name
            )
          )
        ),
        cities (
          name,
          state
        ),
        device_conditions (
          screen_condition,
          body_condition,
          functional_condition,
          device_age,
          has_original_box,
          has_accessories,
          has_warranty
        )
      `)
      .eq('id', orderId)
      .maybeSingle();

    if (error) throw error;
    return data as OrderWithDetails | null;
  },

  async getByOrderNumber(orderNumber: string): Promise<OrderWithDetails | null> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        device_variants (
          storage,
          devices (
            name,
            device_brands (
              name
            )
          )
        ),
        cities (
          name,
          state
        ),
        device_conditions (
          screen_condition,
          body_condition,
          functional_condition,
          device_age,
          has_original_box,
          has_accessories,
          has_warranty
        )
      `)
      .eq('order_number', orderNumber)
      .maybeSingle();

    if (error) throw error;
    return data as OrderWithDetails | null;
  },

  async getUserOrders(userId: string): Promise<OrderWithDetails[]> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        device_variants (
          storage,
          devices (
            name,
            device_brands (
              name
            )
          )
        ),
        cities (
          name,
          state
        ),
        device_conditions (
          screen_condition,
          body_condition,
          functional_condition,
          device_age,
          has_original_box,
          has_accessories,
          has_warranty
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as OrderWithDetails[];
  },

  async updateStatus(orderId: string, status: Order['status']): Promise<void> {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) throw error;
  },

  async update(orderId: string, updates: OrderUpdate): Promise<void> {
    const { error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', orderId);

    if (error) throw error;
  },

  async generateOrderNumber(): Promise<string> {
    const { data, error } = await supabase.rpc('generate_order_number');

    if (error) throw error;
    return data as string;
  },
};
