// Generate SQL seed data for Supabase
// Run this in the Supabase SQL Editor to seed your database

console.log(`
-- =====================================================
-- SEED DATA FOR AUTOELITE CAR SHOWROOM
-- Copy and paste this SQL into your Supabase SQL Editor
-- =====================================================

-- 1. Insert Companies
INSERT INTO companies (name) VALUES
  ('Mercedes-Benz'),
  ('BMW'),
  ('Audi'),
  ('Tesla'),
  ('Porsche'),
  ('Land Rover'),
  ('Ferrari'),
  ('Lamborghini'),
  ('Rolls-Royce')
ON CONFLICT (name) DO NOTHING;

-- 2. Insert Models
INSERT INTO models (company_id, name) VALUES
  ((SELECT id FROM companies WHERE name = 'Mercedes-Benz'), 'S-Class S580'),
  ((SELECT id FROM companies WHERE name = 'Mercedes-Benz'), 'G-Wagon G63'),
  ((SELECT id FROM companies WHERE name = 'BMW'), 'M5 Competition'),
  ((SELECT id FROM companies WHERE name = 'BMW'), 'i7 xDrive60'),
  ((SELECT id FROM companies WHERE name = 'Audi'), 'RS6 Avant'),
  ((SELECT id FROM companies WHERE name = 'Tesla'), 'Model S Plaid'),
  ((SELECT id FROM companies WHERE name = 'Porsche'), '911 Turbo S'),
  ((SELECT id FROM companies WHERE name = 'Land Rover'), 'Range Rover Autobiography'),
  ((SELECT id FROM companies WHERE name = 'Ferrari'), 'SF90 Stradale'),
  ((SELECT id FROM companies WHERE name = 'Lamborghini'), 'Urus Performante'),
  ((SELECT id FROM companies WHERE name = 'Rolls-Royce'), 'Phantom VIII');

-- 3. Insert Cars
INSERT INTO cars (model_id, year, price, mileage, fuel_type, transmission, color, status, description) VALUES
  ((SELECT id FROM models WHERE name = 'S-Class S580'), 2024, 125000, 0, 'Hybrid', 'Automatic', 'Obsidian Black', 'available', 'The pinnacle of luxury. Brand new 2024 Mercedes-Benz S580 with executive rear seating and MBUX high-end entertainment.'),
  ((SELECT id FROM models WHERE name = 'G-Wagon G63'), 2023, 210000, 1200, 'Petrol', 'Automatic', 'Arabian Grey', 'available', 'The legend continues. Powerful G63 AMG in stunning Arabian Grey. Fully loaded with night package and forged wheels.'),
  ((SELECT id FROM models WHERE name = '911 Turbo S'), 2024, 245000, 50, 'Petrol', 'Automatic', 'Guards Red', 'reserved', 'The ultimate daily supercar. 2024 Porsche 911 Turbo S. 0-60 in 2.6 seconds. Finished in classic Guards Red.'),
  ((SELECT id FROM models WHERE name = 'Model S Plaid'), 2023, 89000, 5000, 'Electric', 'Automatic', 'Ultra Red', 'available', 'The fastest accelerating car in production today. Model S Plaid with yoke steering and carbon ceramic brakes.'),
  ((SELECT id FROM models WHERE name = 'Range Rover Autobiography'), 2024, 185000, 0, 'Diesel', 'Automatic', 'Santorini Black', 'available', 'New Range Rover Autobiography. Exceptional refinement and capability. Sustainable luxury at its best.'),
  ((SELECT id FROM models WHERE name = 'SF90 Stradale'), 2023, 625000, 150, 'Hybrid', 'Automatic', 'Rosso Corsa', 'available', 'Ferrari SF90 Stradale. 1000CV hybrid power. The most advanced Ferrari ever made. Finished in historic Rosso Corsa.'),
  ((SELECT id FROM models WHERE name = 'Phantom VIII'), 2024, 550000, 10, 'Petrol', 'Automatic', 'Starlight Blue', 'available', 'Rolls-Royce Phantom. The quietest motor car in the world. Features the iconic Starlight Headliner and bespoke gallery.'),
  ((SELECT id FROM models WHERE name = 'Urus Performante'), 2023, 315000, 800, 'Petrol', 'Automatic', 'Giallo Auge', 'available', 'Lamborghini Urus Performante. Raising the bar on SUV performance. Lightweight carbon fiber components throughout.');

-- 4. Insert Car Images
INSERT INTO car_images (car_id, image_url, is_cover)
SELECT 
  c.id,
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200',
  true
FROM cars c
JOIN models m ON c.model_id = m.id
WHERE m.name = 'S-Class S580'
ON CONFLICT (image_url) DO NOTHING;

INSERT INTO car_images (car_id, image_url, is_cover)
SELECT 
  c.id,
  'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=1200',
  true
FROM cars c
JOIN models m ON c.model_id = m.id
WHERE m.name = 'G-Wagon G63'
ON CONFLICT (image_url) DO NOTHING;

INSERT INTO car_images (car_id, image_url, is_cover)
SELECT 
  c.id,
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200',
  true
FROM cars c
JOIN models m ON c.model_id = m.id
WHERE m.name = '911 Turbo S'
ON CONFLICT (image_url) DO NOTHING;

INSERT INTO car_images (car_id, image_url, is_cover)
SELECT 
  c.id,
  'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1200',
  true
FROM cars c
JOIN models m ON c.model_id = m.id
WHERE m.name = 'Model S Plaid'
ON CONFLICT (image_url) DO NOTHING;

INSERT INTO car_images (car_id, image_url, is_cover)
SELECT 
  c.id,
  'https://images.unsplash.com/photo-1626241315629-bc1df7185202?auto=format&fit=crop&q=80&w=1200',
  true
FROM cars c
JOIN models m ON c.model_id = m.id
WHERE m.name = 'Range Rover Autobiography'
ON CONFLICT (image_url) DO NOTHING;

INSERT INTO car_images (car_id, image_url, is_cover)
SELECT 
  c.id,
  'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=1200',
  true
FROM cars c
JOIN models m ON c.model_id = m.id
WHERE m.name = 'SF90 Stradale'
ON CONFLICT (image_url) DO NOTHING;

INSERT INTO car_images (car_id, image_url, is_cover)
SELECT 
  c.id,
  'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?auto=format&fit=crop&q=80&w=1200',
  true
FROM cars c
JOIN models m ON c.model_id = m.id
WHERE m.name = 'Phantom VIII'
ON CONFLICT (image_url) DO NOTHING;

INSERT INTO car_images (car_id, image_url, is_cover)
SELECT 
  c.id,
  'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&q=80&w=1200',
  true
FROM cars c
JOIN models m ON c.model_id = m.id
WHERE m.name = 'Urus Performante'
ON CONFLICT (image_url) DO NOTHING;

-- =====================================================
-- SEED DATA COMPLETE
-- =====================================================
`)

console.log('\n✅ SQL seed script generated!')
console.log('\n📋 Instructions:')
console.log('1. Go to your Supabase project dashboard')
console.log('2. Navigate to SQL Editor')
console.log('3. Copy the SQL above and paste it into a new query')
console.log('4. Click "Run" to execute the seed data')
console.log('\nNote: This bypasses RLS by running directly in the SQL editor with admin privileges.\n')
