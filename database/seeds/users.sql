-- Insert admin user (password: Admin123!)
INSERT INTO users (first_name, last_name, email, password, role, is_verified, is_active) VALUES
('Admin', 'User', 'admin@kartify.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYzS3MebAJu', 'admin', true, true);

-- Insert test user (password: User123!)
INSERT INTO users (first_name, last_name, email, password, role, is_verified, is_active) VALUES
('Test', 'User', 'user@kartify.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYzS3MebAJu', 'customer', true, true);
