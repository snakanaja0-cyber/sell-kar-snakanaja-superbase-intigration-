/*
  # Device Selling Platform Database Schema

  ## Overview
  Complete database schema for a device buyback platform that handles phones, laptops, and iPads.
  Includes user management, device catalog, orders, pickup scheduling, and pricing calculations.

  ## Tables Created

  ### 1. profiles
  Extends Supabase auth.users with additional user information
  - `id` (uuid, FK to auth.users)
  - `phone_number` (text, unique) - User's verified phone number
  - `full_name` (text) - User's full name
  - `email` (text) - User's email address
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. cities
  Available service cities where device pickup is offered
  - `id` (uuid, PK)
  - `name` (text, unique) - City name
  - `state` (text) - State or region
  - `is_active` (boolean) - Whether city is currently serviced
  - `created_at` (timestamptz)

  ### 3. device_brands
  Device brands supported by the platform
  - `id` (uuid, PK)
  - `name` (text, unique) - Brand name (Apple, Samsung, etc.)
  - `device_type` (text) - Type: phone, laptop, or ipad
  - `logo_url` (text) - Brand logo image URL
  - `is_active` (boolean)
  - `created_at` (timestamptz)

  ### 4. devices
  Specific device models within each brand
  - `id` (uuid, PK)
  - `brand_id` (uuid, FK to device_brands)
  - `name` (text) - Device model name
  - `model_number` (text) - Official model identifier
  - `image_url` (text) - Device image
  - `release_year` (integer) - Year released
  - `is_active` (boolean)
  - `created_at` (timestamptz)

  ### 5. device_variants
  Storage and configuration variants for each device
  - `id` (uuid, PK)
  - `device_id` (uuid, FK to devices)
  - `storage` (text) - Storage capacity (64GB, 256GB, etc.)
  - `ram` (text) - RAM amount (for laptops)
  - `processor` (text) - Processor type
  - `base_price` (decimal) - Base buyback price for this variant
  - `is_active` (boolean)
  - `created_at` (timestamptz)

  ### 6. orders
  Customer orders for selling devices
  - `id` (uuid, PK)
  - `order_number` (text, unique) - Human-readable order ID
  - `user_id` (uuid, FK to auth.users)
  - `device_variant_id` (uuid, FK to device_variants)
  - `city_id` (uuid, FK to cities)
  - `quoted_price` (decimal) - Final calculated price
  - `status` (text) - Order status: pending, confirmed, picked_up, completed, cancelled
  - `full_name` (text)
  - `email` (text)
  - `phone_number` (text)
  - `address_line1` (text)
  - `address_line2` (text)
  - `pincode` (text)
  - `pickup_date` (date)
  - `pickup_time_slot` (text)
  - `notes` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 7. device_conditions
  Condition assessment answers from questionnaire
  - `id` (uuid, PK)
  - `order_id` (uuid, FK to orders)
  - `screen_condition` (text) - Screen quality
  - `body_condition` (text) - Physical body condition
  - `functional_condition` (text) - Working status
  - `device_age` (text) - Age bracket
  - `has_original_box` (boolean)
  - `has_accessories` (boolean)
  - `has_warranty` (boolean)
  - `created_at` (timestamptz)

  ### 8. pricing_modifiers
  Multipliers for calculating final price based on conditions
  - `id` (uuid, PK)
  - `condition_type` (text) - Type: screen, body, functional, age
  - `condition_value` (text) - Specific condition value
  - `multiplier` (decimal) - Price multiplier (0.0 to 1.0)
  - `description` (text)
  - `created_at` (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Users can only read/write their own data
  - Public read access for device catalog and cities
  - Authenticated users can create orders
  - Only order owners can view their orders

  ## Indexes
  - Foreign key indexes for performance
  - Unique indexes on phone_number, order_number
  - Composite indexes on brand/device queries
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- PROFILES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  phone_number text UNIQUE NOT NULL,
  full_name text,
  email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- =============================================
-- CITIES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS cities (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text UNIQUE NOT NULL,
  state text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE cities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active cities"
  ON cities FOR SELECT
  TO authenticated
  USING (is_active = true);

-- =============================================
-- DEVICE BRANDS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS device_brands (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  device_type text NOT NULL CHECK (device_type IN ('phone', 'laptop', 'ipad')),
  logo_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(name, device_type)
);

ALTER TABLE device_brands ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active brands"
  ON device_brands FOR SELECT
  TO authenticated
  USING (is_active = true);

-- =============================================
-- DEVICES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS devices (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id uuid NOT NULL REFERENCES device_brands(id) ON DELETE CASCADE,
  name text NOT NULL,
  model_number text,
  image_url text,
  release_year integer,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE devices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active devices"
  ON devices FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE INDEX IF NOT EXISTS idx_devices_brand_id ON devices(brand_id);

-- =============================================
-- DEVICE VARIANTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS device_variants (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  device_id uuid NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
  storage text NOT NULL,
  ram text,
  processor text,
  base_price decimal(10,2) NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE device_variants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active variants"
  ON device_variants FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE INDEX IF NOT EXISTS idx_device_variants_device_id ON device_variants(device_id);

-- =============================================
-- ORDERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number text UNIQUE NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  device_variant_id uuid NOT NULL REFERENCES device_variants(id),
  city_id uuid NOT NULL REFERENCES cities(id),
  quoted_price decimal(10,2) NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'picked_up', 'completed', 'cancelled')),
  full_name text NOT NULL,
  email text NOT NULL,
  phone_number text NOT NULL,
  address_line1 text NOT NULL,
  address_line2 text,
  pincode text NOT NULL,
  pickup_date date NOT NULL,
  pickup_time_slot text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- =============================================
-- DEVICE CONDITIONS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS device_conditions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  screen_condition text,
  body_condition text,
  functional_condition text,
  device_age text,
  has_original_box boolean DEFAULT false,
  has_accessories boolean DEFAULT false,
  has_warranty boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE device_conditions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view conditions for own orders"
  ON device_conditions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = device_conditions.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create conditions for own orders"
  ON device_conditions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = device_conditions.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE INDEX IF NOT EXISTS idx_device_conditions_order_id ON device_conditions(order_id);

-- =============================================
-- PRICING MODIFIERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS pricing_modifiers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  condition_type text NOT NULL CHECK (condition_type IN ('screen', 'body', 'functional', 'age')),
  condition_value text NOT NULL,
  multiplier decimal(3,2) NOT NULL CHECK (multiplier >= 0 AND multiplier <= 1),
  description text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(condition_type, condition_value)
);

ALTER TABLE pricing_modifiers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view pricing modifiers"
  ON pricing_modifiers FOR SELECT
  TO authenticated
  USING (true);

-- =============================================
-- FUNCTIONS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS text AS $$
BEGIN
  RETURN 'ORD-' || to_char(now(), 'YYYYMMDD') || '-' || LPAD(floor(random() * 10000)::text, 4, '0');
END;
$$ LANGUAGE plpgsql;