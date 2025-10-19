export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          phone_number: string
          full_name: string | null
          email: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          phone_number: string
          full_name?: string | null
          email?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          phone_number?: string
          full_name?: string | null
          email?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      cities: {
        Row: {
          id: string
          name: string
          state: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          state: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          state?: string
          is_active?: boolean
          created_at?: string
        }
      }
      device_brands: {
        Row: {
          id: string
          name: string
          device_type: 'phone' | 'laptop' | 'ipad'
          logo_url: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          device_type: 'phone' | 'laptop' | 'ipad'
          logo_url?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          device_type?: 'phone' | 'laptop' | 'ipad'
          logo_url?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      devices: {
        Row: {
          id: string
          brand_id: string
          name: string
          model_number: string | null
          image_url: string | null
          release_year: number | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          brand_id: string
          name: string
          model_number?: string | null
          image_url?: string | null
          release_year?: number | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          brand_id?: string
          name?: string
          model_number?: string | null
          image_url?: string | null
          release_year?: number | null
          is_active?: boolean
          created_at?: string
        }
      }
      device_variants: {
        Row: {
          id: string
          device_id: string
          storage: string
          ram: string | null
          processor: string | null
          base_price: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          device_id: string
          storage: string
          ram?: string | null
          processor?: string | null
          base_price?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          device_id?: string
          storage?: string
          ram?: string | null
          processor?: string | null
          base_price?: number
          is_active?: boolean
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          user_id: string
          device_variant_id: string
          city_id: string
          quoted_price: number
          status: 'pending' | 'confirmed' | 'picked_up' | 'completed' | 'cancelled'
          full_name: string
          email: string
          phone_number: string
          address_line1: string
          address_line2: string | null
          pincode: string
          pickup_date: string
          pickup_time_slot: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_number: string
          user_id: string
          device_variant_id: string
          city_id: string
          quoted_price: number
          status?: 'pending' | 'confirmed' | 'picked_up' | 'completed' | 'cancelled'
          full_name: string
          email: string
          phone_number: string
          address_line1: string
          address_line2?: string | null
          pincode: string
          pickup_date: string
          pickup_time_slot: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_number?: string
          user_id?: string
          device_variant_id?: string
          city_id?: string
          quoted_price?: number
          status?: 'pending' | 'confirmed' | 'picked_up' | 'completed' | 'cancelled'
          full_name?: string
          email?: string
          phone_number?: string
          address_line1?: string
          address_line2?: string | null
          pincode?: string
          pickup_date?: string
          pickup_time_slot?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      device_conditions: {
        Row: {
          id: string
          order_id: string
          screen_condition: string | null
          body_condition: string | null
          functional_condition: string | null
          device_age: string | null
          has_original_box: boolean
          has_accessories: boolean
          has_warranty: boolean
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          screen_condition?: string | null
          body_condition?: string | null
          functional_condition?: string | null
          device_age?: string | null
          has_original_box?: boolean
          has_accessories?: boolean
          has_warranty?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          screen_condition?: string | null
          body_condition?: string | null
          functional_condition?: string | null
          device_age?: string | null
          has_original_box?: boolean
          has_accessories?: boolean
          has_warranty?: boolean
          created_at?: string
        }
      }
      pricing_modifiers: {
        Row: {
          id: string
          condition_type: 'screen' | 'body' | 'functional' | 'age'
          condition_value: string
          multiplier: number
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          condition_type: 'screen' | 'body' | 'functional' | 'age'
          condition_value: string
          multiplier: number
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          condition_type?: 'screen' | 'body' | 'functional' | 'age'
          condition_value?: string
          multiplier?: number
          description?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_order_number: {
        Args: Record<string, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
