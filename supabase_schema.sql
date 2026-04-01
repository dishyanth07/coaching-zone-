-- Coaching Zone Database Schema (Supabase)

-- 1. Students Table
create table students (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  course text,
  batch text,
  join_date date default now()
);

-- 2. Attendance Table
create table attendance (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) on delete cascade,
  date date not null,
  status text check (status in ('present','absent'))
);

-- 3. Fees Table
create table fees (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) on delete cascade,
  amount numeric,
  status text check (status in ('paid','pending')),
  due_date date
);

-- 4. Courses Table
create table courses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  timing text,
  description text
);

-- Enable Row Level Security (RLS)
alter table students enable row level security;
alter table attendance enable row level security;
alter table fees enable row level security;
alter table courses enable row level security;

-- Create basic policies (Allow all for demo purposes, restrict in production)
create policy "Allow all students" on students for all using (true);
create policy "Allow all attendance" on attendance for all using (true);
create policy "Allow all fees" on fees for all using (true);
create policy "Allow all courses" on courses for all using (true);

-- Insert Sample Courses
insert into courses (name, timing, description) values
('Tamil Phonics', '4 PM - 5 PM', 'Specialized Tamil phonetics and cognitive development'),
('English Phonics', '5 PM - 6 PM', 'English linguistic mastery and phonetics'),
('Tamil Handwriting', '6 PM - 7 PM', 'Improvement and mastery of Tamil script'),
('English Handwriting', '4 PM - 5 PM', 'Cursive and print English handwriting mastery'),
('Hindi Phonics', '5 PM - 6 PM', 'Hindi phonetics and linguistic introduction'),
('Grammar & Spoken English', '6 PM - 7 PM', 'Advanced English communication skills'),
('Abacus', '4 PM - 5 PM', 'Mental mathematics and cognitive training'),
('Teacher Training Classes', '10 AM - 12 PM', 'Professional coaching certification');
