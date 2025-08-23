import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Clock, DollarSign, ExternalLink, Search, Star, Users } from 'lucide-react';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficulty, setDifficulty] = useState('all');
  const [category, setCategory] = useState('all');

  const courses = [
    {
      id: '1',
      title: 'Advanced React Development',
      provider: 'TechMaster Academy',
      description: 'Master React with hooks, context, and modern patterns. Build real-world applications.',
      duration: 12,
      price: 89.99,
      rating: 4.8,
      students: 15420,
      difficulty: 'Advanced',
      category: 'Web Development',
      tags: ['React', 'JavaScript', 'Frontend'],
      image: '/api/placeholder/300/200'
    },
    {
      id: '2',
      title: 'Data Science with Python',
      provider: 'DataLearn Pro',
      description: 'Complete guide to data science including pandas, numpy, and machine learning.',
      duration: 20,
      price: 124.99,
      rating: 4.9,
      students: 8930,
      difficulty: 'Intermediate',
      category: 'Data Science',
      tags: ['Python', 'Data Analysis', 'Machine Learning'],
      image: '/api/placeholder/300/200'
    },
    {
      id: '3',
      title: 'JavaScript Fundamentals',
      provider: 'CodeMaster',
      description: 'Learn JavaScript from basics to advanced concepts. Perfect for beginners.',
      duration: 8,
      price: 49.99,
      rating: 4.7,
      students: 25610,
      difficulty: 'Beginner',
      category: 'Programming',
      tags: ['JavaScript', 'Fundamentals', 'Web Development'],
      image: '/api/placeholder/300/200'
    },
    {
      id: '4',
      title: 'Cloud Architecture with AWS',
      provider: 'CloudExpert',
      description: 'Design and implement scalable cloud solutions using AWS services.',
      duration: 16,
      price: 159.99,
      rating: 4.6,
      students: 5240,
      difficulty: 'Advanced',
      category: 'Cloud Computing',
      tags: ['AWS', 'Cloud', 'Architecture'],
      image: '/api/placeholder/300/200'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficulty === 'all' || course.difficulty === difficulty;
    const matchesCategory = category === 'all' || course.category === category;
    
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

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
        <h1 className="text-3xl font-bold">Courses</h1>
        <p className="text-muted-foreground">
          Discover and enroll in courses to advance your skills and achieve your learning goals.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Find Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty</label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Programming">Programming</SelectItem>
                  <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="transition-all hover:shadow-lg">
            <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
              <BookOpen className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardHeader>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="outline" 
                    className={`${getDifficultyColor(course.difficulty)} text-white border-0`}
                  >
                    {course.difficulty}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </div>
                </div>
                <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  by {course.provider}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {course.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {course.duration}h
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {course.students.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-lg font-bold">{course.price}</span>
                  </div>
                  <Button size="sm" className="gap-2">
                    Enroll Now
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No courses found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria to find more courses.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Courses;