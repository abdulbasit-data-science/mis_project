-- 1. Create a new public bucket called 'car-images'
INSERT INTO storage.buckets (id, name, public) 
VALUES ('car-images', 'car-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Allow public access to view images
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'car-images' );

-- 3. Allow authenticated users (and service role) to upload images
CREATE POLICY "Authenticated Upload" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'car-images' );

-- 4. Allow users to update/delete their images
CREATE POLICY "Authenticated Update" 
ON storage.objects FOR UPDATE
USING ( bucket_id = 'car-images' );

CREATE POLICY "Authenticated Delete" 
ON storage.objects FOR DELETE
USING ( bucket_id = 'car-images' );
