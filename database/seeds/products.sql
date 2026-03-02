-- Insert sample products
INSERT INTO products (name, slug, description, short_description, price, original_price, stock, category, brand, featured, is_deal, images) VALUES
('iPhone 15 Pro Max', 'iphone-15-pro-max', 'Latest Apple flagship with A17 Pro chip', '256GB, Natural Titanium', 1299000, 1499000, 50, 'Electronics', 'Apple', true, true, ARRAY['https://example.com/iphone1.jpg']),
('Samsung Galaxy S24 Ultra', 'samsung-galaxy-s24-ultra', 'Premium Android with AI features', '512GB, Titanium Gray', 1199000, 1399000, 45, 'Electronics', 'Samsung', true, true, ARRAY['https://example.com/samsung1.jpg']),
('MacBook Pro 16', 'macbook-pro-16', 'M3 Max chip for professionals', '1TB SSD, Space Black', 2899000, 3199000, 30, 'Electronics', 'Apple', true, false, ARRAY['https://example.com/macbook1.jpg']),
('Nike Air Max 270', 'nike-air-max-270', 'Comfortable everyday sneakers', 'Men''s Running Shoes', 89000, 120000, 100, 'Fashion', 'Nike', true, true, ARRAY['https://example.com/nike1.jpg']),
('Sony WH-1000XM5', 'sony-wh-1000xm5', 'Industry-leading noise cancellation', 'Wireless Headphones', 285000, 350000, 60, 'Electronics', 'Sony', true, true, ARRAY['https://example.com/sony1.jpg']),
('Adidas Ultraboost 23', 'adidas-ultraboost-23', 'Premium running shoes', 'Men''s Performance', 95000, 130000, 80, 'Fashion', 'Adidas', false, false, ARRAY['https://example.com/adidas1.jpg']),
('LG 55 OLED TV', 'lg-55-oled-tv', '4K OLED with AI Picture Pro', 'Smart TV, WebOS', 899000, 1100000, 25, 'Electronics', 'LG', true, true, ARRAY['https://example.com/lg1.jpg']),
('Canon EOS R6 Mark II', 'canon-eos-r6-mark-ii', 'Professional mirrorless camera', '24.2MP Full-Frame', 1899000, 2100000, 15, 'Electronics', 'Canon', false, false, ARRAY['https://example.com/canon1.jpg']);
