import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Target, BookOpen, Clock, Award, Brain } from 'lucide-react';

const Analytics = () => {
  const skillProgressData = [
    { skill: 'JavaScript', current: 85, target: 90 },
    { skill: 'React', current: 78, target: 85 },
    { skill: 'Python', current: 65, target: 80 },
    { skill: 'Data Analysis', current: 72, target: 85 },
    { skill: 'Cloud Computing', current: 45, target: 70 }
  ];

  const learningTimeData = [
    { month: 'Jan', hours: 15 },
    { month: 'Feb', hours: 22 },
    { month: 'Mar', hours: 18 },
    { month: 'Apr', hours: 28 },
    { month: 'May', hours: 32 },
    { month: 'Jun', hours: 25 }
  ];

  const skillDistribution = [
    { name: 'Technical Skills', value: 65, color: '#3b82f6' },
    { name: 'Soft Skills', value: 25, color: '#10b981' },
    { name: 'Domain Knowledge', value: 10, color: '#f59e0b' }
  ];

  const assessmentScores = [
    { name: 'JavaScript Fundamentals', score: 85, date: '2024-06-15' },
    { name: 'React Development', score: 78, date: '2024-06-10' },
    { name: 'Data Structures', score: 92, date: '2024-06-05' },
    { name: 'Python Basics', score: 88, date: '2024-05-28' }
  ];

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Track your learning progress and analyze your skill development journey.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Skills Tracked</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">140</p>
                <p className="text-sm text-muted-foreground">Hours This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Courses Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Award className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">85%</p>
                <p className="text-sm text-muted-foreground">Average Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Skill Progress
            </CardTitle>
            <CardDescription>Current vs target skill levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {skillProgressData.map((skill) => (
                <div key={skill.skill} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.skill}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {skill.current}% / {skill.target}%
                      </span>
                      <Badge 
                        variant={skill.current >= skill.target ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {skill.current >= skill.target ? "Complete" : "In Progress"}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Progress value={skill.current} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Current: {skill.current}%</span>
                      <span>Target: {skill.target}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Time Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Learning Time Trend
            </CardTitle>
            <CardDescription>Monthly learning hours over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={learningTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Skill Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Skill Distribution
            </CardTitle>
            <CardDescription>Breakdown of your skill categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={skillDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {skillDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {skillDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Assessment Scores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Recent Assessment Scores
            </CardTitle>
            <CardDescription>Your latest assessment performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assessmentScores.map((assessment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{assessment.name}</p>
                    <p className="text-xs text-muted-foreground">{assessment.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{assessment.score}%</div>
                    <Badge 
                      variant={assessment.score >= 80 ? "default" : assessment.score >= 60 ? "secondary" : "destructive"}
                      className="text-xs"
                    >
                      {assessment.score >= 80 ? "Excellent" : assessment.score >= 60 ? "Good" : "Needs Work"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;