-- Create enum types for user roles and skill levels
CREATE TYPE public.user_role AS ENUM ('individual', 'hr_manager', 'admin');
CREATE TYPE public.skill_level AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');
CREATE TYPE public.assessment_status AS ENUM ('pending', 'in_progress', 'completed');

-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role user_role NOT NULL DEFAULT 'individual',
  job_title TEXT,
  organization TEXT,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create skills table
CREATE TABLE public.skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  is_ai_related BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  provider TEXT NOT NULL,
  duration_hours INTEGER,
  price DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  difficulty_level skill_level,
  rating DECIMAL(3,2),
  url TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user skills table (user's current skill levels)
CREATE TABLE public.user_skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
  current_level skill_level NOT NULL,
  target_level skill_level,
  last_assessed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, skill_id)
);

-- Create assessments table
CREATE TABLE public.assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status assessment_status DEFAULT 'pending',
  score INTEGER,
  max_score INTEGER,
  skills_assessed UUID[] DEFAULT '{}',
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create learning paths table
CREATE TABLE public.learning_paths (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  target_skills UUID[] DEFAULT '{}',
  recommended_courses UUID[] DEFAULT '{}',
  progress INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for skills (public read)
CREATE POLICY "Skills are viewable by everyone" ON public.skills
  FOR SELECT USING (true);

-- Create RLS policies for courses (public read)
CREATE POLICY "Courses are viewable by everyone" ON public.courses
  FOR SELECT USING (true);

-- Create RLS policies for user_skills
CREATE POLICY "Users can view their own skills" ON public.user_skills
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own skills" ON public.user_skills
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for assessments
CREATE POLICY "Users can view their own assessments" ON public.assessments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own assessments" ON public.assessments
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for learning paths
CREATE POLICY "Users can view their own learning paths" ON public.learning_paths
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own learning paths" ON public.learning_paths
  FOR ALL USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_learning_paths_updated_at
  BEFORE UPDATE ON public.learning_paths
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
    COALESCE((NEW.raw_user_meta_data ->> 'role')::user_role, 'individual')
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample skills data
INSERT INTO public.skills (name, category, description, is_ai_related) VALUES
  ('JavaScript', 'Programming', 'Modern JavaScript programming language', false),
  ('React', 'Frontend', 'React.js library for building user interfaces', false),
  ('Python', 'Programming', 'Python programming language', false),
  ('Machine Learning', 'AI/ML', 'Machine learning algorithms and techniques', true),
  ('Data Analysis', 'Data Science', 'Analyzing and interpreting data', false),
  ('SQL', 'Database', 'Structured Query Language for databases', false),
  ('Node.js', 'Backend', 'JavaScript runtime for server-side development', false),
  ('TypeScript', 'Programming', 'Typed superset of JavaScript', false),
  ('AWS', 'Cloud', 'Amazon Web Services cloud platform', false),
  ('Deep Learning', 'AI/ML', 'Deep neural networks and AI', true),
  ('Natural Language Processing', 'AI/ML', 'AI for understanding human language', true),
  ('Computer Vision', 'AI/ML', 'AI for processing visual information', true),
  ('Project Management', 'Management', 'Planning and executing projects', false),
  ('Communication', 'Soft Skills', 'Effective verbal and written communication', false),
  ('Leadership', 'Management', 'Leading teams and organizations', false);

-- Insert sample courses data
INSERT INTO public.courses (title, description, provider, duration_hours, price, difficulty_level, rating, url, tags) VALUES
  ('Complete JavaScript Course', 'Master JavaScript from beginner to advanced', 'Udemy', 40, 99.99, 'beginner', 4.7, 'https://udemy.com/javascript', ARRAY['javascript', 'web-development']),
  ('React - The Complete Guide', 'Build modern React applications', 'Udemy', 50, 129.99, 'intermediate', 4.8, 'https://udemy.com/react', ARRAY['react', 'frontend']),
  ('Machine Learning A-Z', 'Hands-on machine learning course', 'Udemy', 60, 149.99, 'intermediate', 4.6, 'https://udemy.com/ml', ARRAY['machine-learning', 'python', 'ai']),
  ('AWS Certified Solutions Architect', 'Prepare for AWS certification', 'A Cloud Guru', 30, 299.99, 'advanced', 4.5, 'https://acloudguru.com/aws', ARRAY['aws', 'cloud', 'certification']),
  ('Python for Data Science', 'Learn Python for data analysis', 'Coursera', 35, 79.99, 'beginner', 4.4, 'https://coursera.org/python-data', ARRAY['python', 'data-science']);