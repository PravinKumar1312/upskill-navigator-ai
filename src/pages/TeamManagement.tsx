import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Search, Filter, BarChart3, TrendingUp, Target, Plus, Mail, Phone } from 'lucide-react';

const TeamManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const teamMembers = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'Senior Developer',
      department: 'Engineering',
      avatar: '/api/placeholder/40/40',
      skills: [
        { name: 'React', level: 90, target: 95 },
        { name: 'JavaScript', level: 85, target: 90 },
        { name: 'Node.js', level: 75, target: 85 }
      ],
      assessments: 5,
      avgScore: 88,
      lastActive: '2024-06-20'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      role: 'Data Analyst',
      department: 'Analytics',
      avatar: '/api/placeholder/40/40',
      skills: [
        { name: 'Python', level: 80, target: 90 },
        { name: 'SQL', level: 92, target: 95 },
        { name: 'Tableau', level: 70, target: 80 }
      ],
      assessments: 3,
      avgScore: 82,
      lastActive: '2024-06-19'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@company.com',
      role: 'UX Designer',
      department: 'Design',
      avatar: '/api/placeholder/40/40',
      skills: [
        { name: 'Figma', level: 95, target: 98 },
        { name: 'User Research', level: 88, target: 90 },
        { name: 'Prototyping', level: 85, target: 90 }
      ],
      assessments: 4,
      avgScore: 91,
      lastActive: '2024-06-21'
    }
  ];

  const departmentStats = [
    { name: 'Engineering', members: 12, avgScore: 86, completionRate: 78 },
    { name: 'Analytics', members: 8, avgScore: 84, completionRate: 85 },
    { name: 'Design', members: 6, avgScore: 89, completionRate: 92 },
    { name: 'Marketing', members: 10, avgScore: 82, completionRate: 70 }
  ];

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || member.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Team Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage your team's learning progress and skill development.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">36</p>
                    <p className="text-sm text-muted-foreground">Total Members</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Target className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">84%</p>
                    <p className="text-sm text-muted-foreground">Avg. Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">78%</p>
                    <p className="text-sm text-muted-foreground">Completion Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold">24</p>
                    <p className="text-sm text-muted-foreground">Active Paths</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Department Overview</CardTitle>
              <CardDescription>Performance metrics by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {departmentStats.map((dept) => (
                  <div key={dept.name} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">{dept.name}</h4>
                      <p className="text-sm text-muted-foreground">{dept.members} members</p>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="text-sm">
                        <span className="font-medium">Avg Score: </span>
                        <span className="text-primary">{dept.avgScore}%</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Completion: </span>
                        <span className="text-green-600">{dept.completionRate}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Team Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Search team members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Analytics">Analytics</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4">
                {filteredMembers.map((member) => (
                  <Card key={member.id} className="transition-all hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <h3 className="font-medium">{member.name}</h3>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                            <Badge variant="outline">{member.department}</Badge>
                          </div>
                        </div>

                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <h4 className="text-sm font-medium">Skills Progress</h4>
                            {member.skills.map((skill) => (
                              <div key={skill.name} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span>{skill.name}</span>
                                  <span>{skill.level}%</span>
                                </div>
                                <Progress value={skill.level} className="h-1" />
                              </div>
                            ))}
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-sm font-medium">Performance</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Assessments</p>
                                <p className="font-medium">{member.assessments}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Avg Score</p>
                                <p className="font-medium text-primary">{member.avgScore}%</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="gap-2">
                                <Mail className="h-4 w-4" />
                                Contact
                              </Button>
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Team Analytics
              </CardTitle>
              <CardDescription>
                Detailed insights into team performance and skill development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Advanced Analytics</h3>
                <p className="text-muted-foreground mb-4">
                  Comprehensive team analytics and reporting features coming soon.
                </p>
                <Button>Request Analytics Demo</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamManagement;