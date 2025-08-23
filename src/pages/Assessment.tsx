import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Play, Target } from 'lucide-react';

const Assessment = () => {
  const [currentAssessment, setCurrentAssessment] = useState<string | null>(null);

  const assessments = [
    {
      id: '1',
      title: 'JavaScript Fundamentals',
      description: 'Test your knowledge of JavaScript basics, ES6+, and modern development practices.',
      duration: '45 minutes',
      questions: 25,
      difficulty: 'Intermediate',
      skills: ['JavaScript', 'ES6', 'DOM Manipulation'],
      completed: true,
      score: 85
    },
    {
      id: '2',
      title: 'React Development',
      description: 'Assess your React skills including hooks, state management, and component architecture.',
      duration: '60 minutes',
      questions: 30,
      difficulty: 'Advanced',
      skills: ['React', 'Hooks', 'State Management'],
      completed: false
    },
    {
      id: '3',
      title: 'Data Analysis with Python',
      description: 'Evaluate your Python skills for data science and analytics.',
      duration: '75 minutes',
      questions: 35,
      difficulty: 'Intermediate',
      skills: ['Python', 'Pandas', 'Data Analysis'],
      completed: false
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
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Skills Assessment</h1>
        <p className="text-muted-foreground">
          Evaluate your skills and track your learning progress with comprehensive assessments.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Assessment Overview
            </CardTitle>
            <CardDescription>
              Your progress across different skill areas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary">3</div>
                <div className="text-sm text-muted-foreground">Assessments Available</div>
              </div>
              <div className="text-center p-4 bg-green-500/5 rounded-lg">
                <div className="text-2xl font-bold text-green-600">1</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <div className="text-center p-4 bg-yellow-500/5 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">85%</div>
                <div className="text-sm text-muted-foreground">Average Score</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {assessments.map((assessment) => (
            <Card key={assessment.id} className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center gap-2">
                      {assessment.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-yellow-500" />
                      )}
                      {assessment.title}
                    </CardTitle>
                    <CardDescription>{assessment.description}</CardDescription>
                  </div>
                  <div className="flex flex-col sm:items-end gap-2">
                    <Badge 
                      variant="outline" 
                      className={`${getDifficultyColor(assessment.difficulty)} text-white border-0`}
                    >
                      {assessment.difficulty}
                    </Badge>
                    {assessment.completed && (
                      <div className="text-sm font-medium text-green-600">
                        Score: {assessment.score}%
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Duration: {assessment.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Questions: {assessment.questions}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Skills Covered:</div>
                    <div className="flex flex-wrap gap-2">
                      {assessment.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {assessment.completed && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Progress:</div>
                      <Progress value={assessment.score} className="h-2" />
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      className="flex-1"
                      variant={assessment.completed ? "outline" : "default"}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      {assessment.completed ? 'Retake Assessment' : 'Start Assessment'}
                    </Button>
                    {assessment.completed && (
                      <Button variant="ghost">
                        View Results
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assessment;