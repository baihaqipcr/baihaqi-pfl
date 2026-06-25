-- ================================================================
-- VERIFICATION & TESTING QUERIES
-- ================================================================
-- Run these queries in Supabase SQL Editor to verify the setup
-- ================================================================

-- ================================================================
-- 1. VERIFY ALL TABLES EXIST
-- ================================================================
SELECT 
  table_name,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE table_name = t.table_name AND constraint_type = 'PRIMARY KEY') THEN '✅'
    ELSE '⚠️'
  END as has_pk,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
  AND table_name IN ('tier_rules', 'menus', 'cafe_info', 'customers', 'customer_preferences', 'transactions', 'loyalty_points')
ORDER BY table_name;

-- ================================================================
-- 2. VERIFY SAMPLE DATA
-- ================================================================

-- Count records per table
SELECT 
  'tier_rules' as table_name, COUNT(*) as record_count FROM tier_rules
UNION ALL
SELECT 'menus', COUNT(*) FROM menus
UNION ALL
SELECT 'cafe_info', COUNT(*) FROM cafe_info
UNION ALL
SELECT 'customers', COUNT(*) FROM customers
UNION ALL
SELECT 'customer_preferences', COUNT(*) FROM customer_preferences
UNION ALL
SELECT 'transactions', COUNT(*) FROM transactions
UNION ALL
SELECT 'loyalty_points', COUNT(*) FROM loyalty_points
ORDER BY table_name;

-- Show tier rules detail
SELECT tier_level, tier_name, min_order_count, min_total_spent, poin_multiplier, diskon_default 
FROM tier_rules 
ORDER BY tier_level;

-- Show menus detail (first 5)
SELECT id, nama_menu, kategori, harga, poin_reward, visible 
FROM menus 
LIMIT 5;

-- Show cafe info
SELECT nama_cafe, alamat, jam_buka, jam_tutup, nomor_telepon 
FROM cafe_info;

-- ================================================================
-- 3. VERIFY INDEXES CREATED
-- ================================================================
SELECT 
  indexname,
  tablename,
  indexdef
FROM pg_indexes 
WHERE tablename IN ('customers', 'customer_preferences', 'loyalty_points', 'transactions', 'menus')
ORDER BY tablename, indexname;

-- ================================================================
-- 4. VERIFY CONSTRAINTS & RELATIONSHIPS
-- ================================================================

-- Show all foreign keys
SELECT 
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
ORDER BY tc.table_name;

-- Show all unique constraints
SELECT
  constraint_name,
  table_name,
  column_name
FROM information_schema.key_column_usage
WHERE table_schema = 'public'
  AND table_name IN ('tier_rules', 'menus', 'cafe_info', 'customers', 'customer_preferences', 'transactions', 'loyalty_points')
  AND constraint_name LIKE '%unique%' OR constraint_name LIKE '%pk%'
ORDER BY table_name, constraint_name;

-- ================================================================
-- 5. VERIFY CHECK CONSTRAINTS
-- ================================================================
SELECT 
  constraint_name,
  table_name,
  check_clause
FROM information_schema.check_constraints
WHERE constraint_schema = 'public'
ORDER BY table_name;

-- ================================================================
-- 6. VERIFY RLS STATUS
-- ================================================================
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('tier_rules', 'menus', 'cafe_info', 'customers', 'customer_preferences', 'transactions', 'loyalty_points')
ORDER BY tablename;

-- ================================================================
-- 7. VERIFY RLS POLICIES (if any)
-- ================================================================
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('menus', 'cafe_info', 'tier_rules', 'customers', 'customer_preferences', 'transactions', 'loyalty_points')
ORDER BY tablename, policyname;

-- ================================================================
-- 8. TEST DATA INTEGRITY
-- ================================================================

-- Check no orphan customers (all customers reference valid tier_level)
SELECT c.id, c.tier_level
FROM customers c
LEFT JOIN tier_rules tr ON c.tier_level = tr.tier_level
WHERE tr.tier_level IS NULL;
-- Should return: 0 rows

-- Check all transactions reference valid customer_id
SELECT t.id, t.customer_id
FROM transactions t
LEFT JOIN customers c ON t.customer_id = c.id
WHERE c.id IS NULL;
-- Should return: 0 rows

-- ================================================================
-- 9. QUICK DATA QUERIES (for testing React connectivity)
-- ================================================================

-- Get all active menus
SELECT id, nama_menu, kategori, harga, poin_reward 
FROM menus 
WHERE visible = true 
ORDER BY kategori, nama_menu;

-- Get tier rules for display
SELECT tier_level, tier_name, diskon_default, poin_multiplier 
FROM tier_rules 
ORDER BY tier_level;

-- Get cafe public info
SELECT nama_cafe, deskripsi, alamat, jam_buka, jam_tutup, nomor_telepon 
FROM cafe_info 
LIMIT 1;

-- ================================================================
-- 10. PERFORMANCE STATS
-- ================================================================

-- Table sizes
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('tier_rules', 'menus', 'cafe_info', 'customers', 'customer_preferences', 'transactions', 'loyalty_points')
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- ================================================================
-- END OF VERIFICATION QUERIES
-- ================================================================
-- Expected Results Summary:
-- ✅ 7 tables exist with PRIMARY KEYs
-- ✅ 4 tier rules, 12 menus, 1 cafe info
-- ✅ ~10 indexes created
-- ✅ Foreign key relationships intact
-- ✅ CHECK constraints enforced
-- ✅ RLS enabled on all tables
-- ✅ 0 orphan records
-- ================================================================
