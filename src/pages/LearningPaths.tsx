import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BookOpen, Clock, Target, TrendingUp, Plus, MapPin, CheckCircle } from 'lucide-react';

const LearningPaths = () => {
  const [selectedPath, setSelectedPath] = useState<any>(null);

  const learningPaths = [
    {
      id: '1',
      title: 'Full Stack Web Developer',
      description: 'Complete pathway to become a professional full-stack developer with modern technologies.',
      progress: 65,
      totalCourses: 12,
      completedCourses: 8,
      estimatedTime: '6 months',
      difficulty: 'Intermediate',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Database Design'],
      courses: [
        { title: 'HTML & CSS Fundamentals', completed: true, duration: '2 weeks' },
        { title: 'JavaScript Essentials', completed: true, duration: '3 weeks' },
        { title: 'React Development', completed: true, duration: '4 weeks' },
        { title: 'Node.js Backend', completed: false, duration: '4 weeks' },
        { title: 'Database Design', completed: false, duration: '3 weeks' }
      ]
    },
    {
      id: '2',
      title: 'Data Science Professional',
      description: 'Master data science from statistics to machine learning and AI applications.',
      progress: 30,
      totalCourses: 15,
      completedCourses: 5,
      estimatedTime: '8 months',
      difficulty: 'Advanced',
      skills: ['Python', 'Statistics', 'Machine Learning', 'Data Visualization', 'SQL'],
      courses: [
        { title: 'Python for Data Science', completed: true, duration: '3 weeks' },
        { title: 'Statistics & Probability', completed: true, duration: '4 weeks' },
        { title: 'Data Manipulation with Pandas', completed: false, duration: '3 weeks' },
        { title: 'Machine Learning Fundamentals', completed: false, duration: '5 weeks' },
        { title: 'Deep Learning', completed: false, duration: '6 weeks' }
      ]
    },
    {
      id: '3',
      title: 'Cloud Solutions Architect',
      description: 'Design and implement scalable cloud infrastructure and services.',
      progress: 45,
      totalCourses: 10,
      completedCourses: 4,
      estimatedTime: '5 months',
      difficulty: 'Advanced',
      skills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'DevOps'],
      courses: [
        { title: 'Cloud Computing Basics', completed: true, duration: '2 weeks' },
        { title: 'AWS Fundamentals', completed: true, duration: '4 weeks' },
        { title: 'Container Technologies', completed: false, duration: '3 weeks' },
        { title: 'Kubernetes Orchestration', completed: false, duration: '4 weeks' },
        { title: 'DevOps Practices', completed: false, duration: '3 weeks' }
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Learning Paths</h1>
          <p className="text-muted-foreground">
            Structured learning journeys to achieve your career goals.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Custom Path
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Your Progress Overview
          </CardTitle>
          <CardDescription>
            Track your advancement across all learning paths
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <div className="text-2xl font-bold text-primary">3</div>
              <div className="text-sm text-muted-foreground">Active Paths</div>
            </div>
            <div className="text-center p-4 bg-green-500/5 rounded-lg">
              <div className="text-2xl font-bold text-green-600">17</div>
              <div className="text-sm text-muted-foreground">Courses Completed</div>
            </div>
            <div className="text-center p-4 bg-blue-500/5 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">47%</div>
              <div className="text-sm text-muted-foreground">Average Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {learningPaths.map((path) => (
          <Card key={path.id} className="transition-all hover:shadow-md">
            <CardHeader>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle>{path.title}</CardTitle>
                    <Badge 
                      variant="outline" 
                      className={`${getDifficultyColor(path.difficulty)} text-white border-0`}
                    >
                      {path.difficulty}
                    </Badge>
                  </div>
                  <CardDescription>{path.description}</CardDescription>
                </div>
                <div className="flex flex-col lg:items-end gap-2">
                  <div className="text-2xl font-bold text-primary">{path.progress}%</div>
                  <div className="text-sm text-muted-foreground">Complete</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{path.completedCourses}/{path.totalCourses} courses</span>
                  </div>
                  <Progress value={path.progress} className="h-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Estimated time: {path.estimatedTime}
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    {path.totalCourses} courses total
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Skills you'll gain:</div>
                  <div className="flex flex-wrap gap-2">
                    {path.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button className="flex-1">
                    Continue Learning
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <MapPin className="h-4 w-4" />
                        View Path Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{path.title}</DialogTitle>
                        <DialogDescription>{path.description}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Progress:</span> {path.progress}%
                          </div>
                          <div>
                            <span className="font-medium">Duration:</span> {path.estimatedTime}
                          </div>
                          <div>
                            <span className="font-medium">Difficulty:</span> {path.difficulty}
                          </div>
                          <div>
                            <span className="font-medium">Courses:</span> {path.totalCourses}
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-medium">Course Sequence:</h4>
                          {path.courses.map((course, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                              <div className="flex items-center gap-3">
                                {course.completed ? (
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                ) : (
                                  <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                                )}
                                <span className={course.completed ? 'text-green-600' : ''}>
                                  {course.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                {course.duration}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearningPaths;