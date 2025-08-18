-- Add missing policies for learning_paths table to fix RLS security issue
CREATE POLICY "HR managers can view org learning paths" ON public.learning_paths
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p1, public.profiles p2
      WHERE p1.user_id = auth.uid() 
      AND p1.role = 'hr_manager'
      AND p2.user_id = learning_paths.user_id
      AND p1.organization = p2.organization
    )
  );

CREATE POLICY "Admins can view all learning paths" ON public.learning_paths
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.user_id = auth.uid() 
      AND p.role = 'admin'
    )
  );