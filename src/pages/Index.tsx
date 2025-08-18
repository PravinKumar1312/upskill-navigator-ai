import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Target, 
  BookOpen, 
  TrendingUp, 
  Users, 
  Award,
  ArrowRight,
  Plus,
  CheckCircle
} from 'lucide-react';

interface UserStats {
  skillsCount: number;
  assessmentsCount: number;
  learningPathsCount: number;
  completedAssessments: number;
}

interface RecentActivity {
  id: string;
  title: string;
  type: 'assessment' | 'course' | 'skill';
  completed_at: string;
  score?: number;
}

const Index = () => {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState<UserStats>({
    skillsCount: 0,
    assessmentsCount: 0,
    learningPathsCount: 0,
    completedAssessments: 0
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user?.id)
      .single();
    
    if (data) {
      setProfile(data);
    }
  };

  const fetchUserData = async () => {
    const [skillsResult, assessmentsResult, learningPathsResult] = await Promise.all([
      supabase.from('user_skills').select('id').eq('user_id', user?.id),
      supabase.from('assessments').select('id, status').eq('user_id', user?.id),
      supabase.from('learning_paths').select('id').eq('user_id', user?.id)
    ]);

    const completedAssessments = assessmentsResult.data?.filter(a => a.status === 'completed').length || 0;

    setUserStats({
      skillsCount: skillsResult.data?.length || 0,
      assessmentsCount: assessmentsResult.data?.length || 0,
      learningPathsCount: learningPathsResult.data?.length || 0,
      completedAssessments
    });

    // Fetch recent completed assessments
    const { data: recentAssessments } = await supabase
      .from('assessments')
      .select('id, title, completed_at, score, max_score')
      .eq('user_id', user?.id)
      .eq('status', 'completed')
      .order('completed_at', { ascending: false })
      .limit(5);

    if (recentAssessments) {
      const formattedActivity: RecentActivity[] = recentAssessments.map(assessment => ({
        id: assessment.id,
        title: assessment.title,
        type: 'assessment',
        completed_at: assessment.completed_at,
        score: assessment.score && assessment.max_score ? Math.round((assessment.score / assessment.max_score) * 100) : undefined
      }));
      setRecentActivity(formattedActivity);
    }
  };

  const completionRate = userStats.assessmentsCount > 0 
    ? Math.round((userStats.completedAssessments / userStats.assessmentsCount) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {profile?.full_name || user?.email?.split('@')[0]}!
        </h1>
        <p className="text-muted-foreground">
          Track your skill development journey and discover new learning opportunities.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skills Tracked</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.skillsCount}</div>
            <p className="text-xs text-muted-foreground">
              Skills in your profile
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assessments</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.completedAssessments}</div>
            <p className="text-xs text-muted-foreground">
              Completed out of {userStats.assessmentsCount}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Paths</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.learningPathsCount}</div>
            <p className="text-xs text-muted-foreground">
              Active learning paths
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionRate}%</div>
            <Progress value={completionRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Brain className="mr-2 h-5 w-5 text-primary" />
              Take Assessment
            </CardTitle>
            <CardDescription>
              Assess your current skill levels and identify gaps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              Start Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-primary" />
              Browse Courses
            </CardTitle>
            <CardDescription>
              Explore 80,000+ courses to enhance your skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              View Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Target className="mr-2 h-5 w-5 text-primary" />
              Create Learning Path
            </CardTitle>
            <CardDescription>
              Build a personalized learning journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Create Path
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Recommendations */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest assessments and achievements</CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivity.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                <Award className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>No recent activity yet</p>
                <p className="text-sm">Start an assessment to see your progress here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.completed_at).toLocaleDateString()}
                      </p>
                    </div>
                    {activity.score && (
                      <Badge variant="secondary">
                        {activity.score}%
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
            <CardDescription>Personalized suggestions for your growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Skill Gap Identified</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Consider strengthening your Machine Learning fundamentals
                </p>
                <Button size="sm" variant="outline">
                  View Courses
                </Button>
              </div>
              
              <div className="p-4 bg-secondary/50 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Trending Skill</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  AI/LLM skills are in high demand in your field
                </p>
                <Button size="sm" variant="outline">
                  Explore AI Courses
                </Button>
              </div>

              <div className="p-4 bg-accent/50 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Assessment Reminder</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  It's been a while since your last skill assessment
                </p>
                <Button size="sm" variant="outline">
                  Take Assessment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
