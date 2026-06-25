-- ================================================================
-- PAPICOFFEE DATABASE MIGRATION SCRIPT
-- PostgreSQL schema setup untuk Supabase
-- ================================================================
-- Instructions:
-- 1. Login ke Supabase Dashboard (https://app.supabase.com)
-- 2. Pilih project PapiCoffee
-- 3. Buka SQL Editor (di sidebar kiri)
-- 4. Buat query baru
-- 5. Copy-paste seluruh script ini
-- 6. Klik "Run" untuk execute
-- ================================================================

-- DROP existing tables if they exist (optional - untuk reset)
-- DROP TABLE IF EXISTS loyalty_points CASCADE;
-- DROP TABLE IF EXISTS transactions CASCADE;
-- DROP TABLE IF EXISTS customer_preferences CASCADE;
-- DROP TABLE IF EXISTS customers CASCADE;
-- DROP TABLE IF EXISTS menus CASCADE;
-- DROP TABLE IF EXISTS cafe_info CASCADE;
-- DROP TABLE IF EXISTS tier_rules CASCADE;

-- ================================================================
-- STEP 1: CREATE BASE TABLES (Master Data - No Dependencies)
-- ================================================================

-- TABLE 1: tier_rules (Master table untuk tier system)
CREATE TABLE IF NOT EXISTS tier_rules (
  id SERIAL PRIMARY KEY,
  tier_level INT NOT NULL UNIQUE CHECK (tier_level IN (1, 2, 3, 4)),
  tier_name VARCHAR(50) NOT NULL,
  min_order_count INT DEFAULT 0,
  min_total_spent INT DEFAULT 0,
  min_poin_balance INT DEFAULT 0,
  poin_multiplier DECIMAL(2,1) DEFAULT 1.0,
  diskon_default INT DEFAULT 0,
  priority_service BOOLEAN DEFAULT false,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABLE 2: menus (Master table untuk daftar menu)
CREATE TABLE IF NOT EXISTS menus (
  id SERIAL PRIMARY KEY,
  nama_menu VARCHAR(100) NOT NULL UNIQUE,
  kategori VARCHAR(50) NOT NULL CHECK (kategori IN ('Kopi', 'Non-Kopi', 'Makanan', 'Dessert')),
  deskripsi TEXT,
  harga INT NOT NULL CHECK (harga > 0),
  poin_reward INT DEFAULT 10,
  visible BOOLEAN DEFAULT true,
  is_favorite_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABLE 3: cafe_info (Public info tentang kafe)
CREATE TABLE IF NOT EXISTS cafe_info (
  id SERIAL PRIMARY KEY,
  nama_cafe VARCHAR(100) NOT NULL DEFAULT 'PapiCoffee',
  deskripsi TEXT,
  alamat TEXT,
  jam_buka TIME,
  jam_tutup TIME,
  nomor_telepon VARCHAR(15),
  email_kontak VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================================================
-- STEP 2: CREATE MAIN TABLE (References tier_rules & auth.users)
-- ================================================================

-- TABLE 4: customers (Main customer data table)
CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Info Pribadi
  nama VARCHAR(100) NOT NULL,
  no_hp VARCHAR(15) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL,
  tanggal_lahir DATE,
  
  -- Status Member
  tipe_pelanggan VARCHAR(20) NOT NULL DEFAULT 'Baru' 
    CHECK (tipe_pelanggan IN ('Aktif', 'VIP', 'Baru', 'Dormant')),
  tier_level INT NOT NULL DEFAULT 1 REFERENCES tier_rules(tier_level),
  tanggal_daftar DATE NOT NULL DEFAULT CURRENT_DATE,
  
  -- Preferensi
  menu_favorit VARCHAR(100),
  tingkat_gula_favorit VARCHAR(20) DEFAULT 'Normal'
    CHECK (tingkat_gula_favorit IN ('Minim', 'Normal', 'Banyak')),
  
  -- Loyalty Points
  saldo_poin INT NOT NULL DEFAULT 0,
  total_poin_earned INT NOT NULL DEFAULT 0,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  
  -- Audit
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT valid_tier CHECK (tier_level BETWEEN 1 AND 4)
);

-- ================================================================
-- STEP 3: CREATE SUPPORT TABLES (Depends on customers)
-- ================================================================

-- TABLE 5: customer_preferences (Customer preferences)
CREATE TABLE IF NOT EXISTS customer_preferences (
  id SERIAL PRIMARY KEY,
  customer_id INT NOT NULL UNIQUE REFERENCES customers(id) ON DELETE CASCADE,
  
  -- Preferensi Menu & Minuman
  menu_favorit_ids INT[] DEFAULT '{}',
  tingkat_gula_default VARCHAR(20) DEFAULT 'Normal'
    CHECK (tingkat_gula_default IN ('Minim', 'Normal', 'Banyak')),
  tingkat_panas_default VARCHAR(20) DEFAULT 'Panas'
    CHECK (tingkat_panas_default IN ('Dingin', 'Suam', 'Panas')),
  
  -- Notification Settings
  email_notification BOOLEAN DEFAULT true,
  sms_notification BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABLE 6: transactions (Record setiap transaksi pembelian)
CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  customer_id INT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  
  -- Transaction Details
  tanggal_transaksi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_harga INT NOT NULL CHECK (total_harga > 0),
  poin_diperoleh INT NOT NULL DEFAULT 0,
  
  -- Items (JSON: [{"menu_id": 1, "qty": 2, "harga": 15000, "gula": "Normal"}])
  items JSONB NOT NULL,
  
  -- Status
  status VARCHAR(20) NOT NULL DEFAULT 'completed'
    CHECK (status IN ('pending', 'completed', 'cancelled')),
  
  -- Additional Info
  payment_method VARCHAR(20),
  notes TEXT,
  
  -- Audit
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABLE 7: loyalty_points (Record poin yang diperoleh/digunakan)
CREATE TABLE IF NOT EXISTS loyalty_points (
  id SERIAL PRIMARY KEY,
  customer_id INT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  
  -- Poin Detail
  jumlah_poin INT NOT NULL,
  tipe_transaksi VARCHAR(50) NOT NULL 
    CHECK (tipe_transaksi IN ('pembelian', 'referral', 'bonus', 'redeem', 'expired')),
  keterangan TEXT,
  
  -- Referensi ke transaksi asli (optional)
  transaction_id INT REFERENCES transactions(id) ON DELETE SET NULL,
  
  -- Validity
  tanggal_transaksi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  tanggal_expired DATE,
  is_valid BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================================================
-- STEP 4: CREATE INDEXES (untuk performa query)
-- ================================================================

CREATE INDEX IF NOT EXISTS idx_customers_user_id ON customers(user_id);
CREATE INDEX IF NOT EXISTS idx_customers_tipe ON customers(tipe_pelanggan);
CREATE INDEX IF NOT EXISTS idx_customers_tier ON customers(tier_level);

CREATE INDEX IF NOT EXISTS idx_customer_pref_customer_id ON customer_preferences(customer_id);

CREATE INDEX IF NOT EXISTS idx_loyalty_customer_id ON loyalty_points(customer_id);
CREATE INDEX IF NOT EXISTS idx_loyalty_valid ON loyalty_points(is_valid, tanggal_expired);

CREATE INDEX IF NOT EXISTS idx_transactions_customer_id ON transactions(customer_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(tanggal_transaksi);

CREATE INDEX IF NOT EXISTS idx_menus_kategori ON menus(kategori);
CREATE INDEX IF NOT EXISTS idx_menus_visible ON menus(visible);

-- ================================================================
-- STEP 5: INSERT SAMPLE DATA
-- ================================================================

-- Insert Tier Rules (DO NOT DELETE - Required untuk tier system)
INSERT INTO tier_rules (tier_level, tier_name, min_order_count, min_total_spent, poin_multiplier, diskon_default, description) VALUES
(1, 'Baru', 0, 0, 1.0, 0, 'Member baru tanpa benefit khusus'),
(2, 'Aktif', 5, 150000, 1.25, 5, 'Member aktif dengan diskon dan poin multiplier 1.25x'),
(3, 'VIP', 20, 500000, 1.5, 10, 'VIP member dengan akses priority service'),
(4, 'Exclusive', 50, 1500000, 2.0, 15, 'Exclusive tier dengan benefit maksimal dan poin 2x')
ON CONFLICT DO NOTHING;

-- Insert Menu Items (Sample data untuk PapiCoffee)
INSERT INTO menus (nama_menu, kategori, deskripsi, harga, poin_reward) VALUES
('Kopi Sanger', 'Kopi', 'Kopi hitam kental tradisional dengan aroma yang kuat', 15000, 15),
('Black Orange', 'Kopi', 'Kopi dengan essence jeruk memberikan rasa unik dan segar', 18000, 18),
('Latte Vanilla', 'Kopi', 'Kopi dengan susu dan vanilla untuk rasa yang creamy', 20000, 20),
('Cappuccino', 'Kopi', 'Kopi dengan foam susu tebal dan cocoa powder', 22000, 22),
('Espresso', 'Kopi', 'Espresso murni double shot untuk pecinta kopi hardcore', 12000, 12),
('Teh Tarik', 'Non-Kopi', 'Teh tradisional dengan teknik tarik yang sempurna', 10000, 10),
('Es Jeruk Peras', 'Non-Kopi', 'Jus jeruk segar dari jeruk pilihan terbaik', 12000, 12),
('Iced Latte', 'Non-Kopi', 'Latte dingin dengan ice cubes untuk cuaca panas', 18000, 18),
('Croissant Butter', 'Makanan', 'Pastry butter croissant lapis yang lembut dan gurih', 25000, 25),
('Donat Coklat', 'Dessert', 'Donat coated dengan coklat premium dan gula halus', 15000, 15),
('Kue Lapis', 'Dessert', 'Kue lapis tradisional dengan rasa vanilla yang khas', 20000, 20),
('Brownies', 'Dessert', 'Brownies coklat dark dengan nuts inside yang crunchy', 18000, 18)
ON CONFLICT (nama_menu) DO NOTHING;

-- Insert Cafe Info (Public information)
INSERT INTO cafe_info (nama_cafe, deskripsi, alamat, jam_buka, jam_tutup, nomor_telepon, email_kontak) VALUES
('PapiCoffee', 
 'Kafe kopi premium dengan suasana nyaman, WiFi gratis, dan barista profesional. Menggunakan biji kopi pilihan dari berbagai daerah di Indonesia.',
 'Jl. Merdeka No. 42, Jakarta Pusat 12190',
 '06:00',
 '21:00',
 '0812-3456-7890',
 'hello@papicoffee.id')
ON CONFLICT DO NOTHING;

-- ================================================================
-- STEP 6: ENABLE ROW LEVEL SECURITY (RLS)
-- ================================================================
-- Note: RLS policies akan ditambahkan di Phase 2 (Auth Integration)
-- Untuk sekarang, hanya enable RLS saja

ALTER TABLE tier_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE cafe_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_points ENABLE ROW LEVEL SECURITY;

-- ================================================================
-- STEP 7: CREATE TEMPORARY PUBLIC ACCESS POLICIES (for testing)
-- ================================================================
-- These will be replaced with proper RLS policies in Phase 2

-- Temporary: Allow all authenticated users to read public data
CREATE POLICY "public_read_menus" ON menus 
  FOR SELECT USING (visible = true);

CREATE POLICY "public_read_cafe_info" ON cafe_info 
  FOR SELECT USING (true);

CREATE POLICY "public_read_tier_rules" ON tier_rules 
  FOR SELECT USING (true);

-- ================================================================
-- VERIFICATION QUERIES (Run these to verify schema)
-- ================================================================
-- Uncomment these queries to verify the setup was successful:

-- -- Check if all tables exist
-- SELECT table_name FROM information_schema.tables 
-- WHERE table_schema = 'public' AND table_name IN 
-- ('tier_rules', 'menus', 'cafe_info', 'customers', 'customer_preferences', 'transactions', 'loyalty_points');

-- -- Count sample data
-- SELECT 'tier_rules' as table_name, COUNT(*) as row_count FROM tier_rules
-- UNION ALL SELECT 'menus', COUNT(*) FROM menus
-- UNION ALL SELECT 'cafe_info', COUNT(*) FROM cafe_info;

-- -- Show indexes created
-- SELECT indexname FROM pg_indexes WHERE tablename IN 
-- ('customers', 'customer_preferences', 'loyalty_points', 'transactions', 'menus');

-- ================================================================
-- END OF MIGRATION SCRIPT
-- ================================================================
-- Status: ✅ Ready to deploy
-- Last Updated: 2026-06-25
-- Version: 1.0
-- ================================================================
