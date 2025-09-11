import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { User, Mail, MapPin, Briefcase, Globe, Github, Linkedin, Plus, X, Camera, Save } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UserProfile {
  id?: string;
  user_id?: string;
  email: string;
  full_name: string;
  bio: string;
  location: string;
  company: string;
  job_title: string;
  website_url: string;
  github_url: string;
  linkedin_url: string;
  avatar_url: string;
  skills: string[];
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
}

const Settings = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({
    email: user?.email || '',
    full_name: '',
    bio: '',
    location: '',
    company: '',
    job_title: '',
    website_url: '',
    github_url: '',
    linkedin_url: '',
    avatar_url: '',
    skills: [],
    notifications: {
      email: true,
      push: true,
      marketing: false,
    },
  });

  const [newSkill, setNewSkill] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading profile:', error);
        return;
      }

      if (data) {
        setProfile({
          ...data,
          skills: [],
          notifications: {
            email: true,
            push: true,
            marketing: false,
          },
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const profileData = {
        user_id: user.id,
        email: profile.email,
        full_name: profile.full_name,
        bio: profile.bio,
        location: profile.location,
        company: profile.company,
        job_title: profile.job_title,
        website_url: profile.website_url,
        github_url: profile.github_url,
        linkedin_url: profile.linkedin_url,
        avatar_url: profile.avatar_url,
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(profileData, { 
          onConflict: 'user_id' 
        });

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter(skill => skill !== skillToRemove),
    });
  };

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleNotificationChange = (field: keyof UserProfile['notifications'], value: boolean) => {
    setProfile({
      ...profile,
      notifications: { ...profile.notifications, [field]: value },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">Profile Settings</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Customize your profile and manage your account preferences
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <User className="h-6 w-6" />
                  Profile Information
                </CardTitle>
                <CardDescription className="text-base">
                  Update your personal information and public profile.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profile.avatar_url} />
                      <AvatarFallback className="text-2xl">
                        {profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg font-semibold">{profile.full_name || 'Your Name'}</h3>
                    <p className="text-muted-foreground">{profile.email}</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Change Photo
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={profile.full_name}
                      onChange={(e) => handleInputChange('full_name', e.target.value)}
                      placeholder="Enter your full name"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    className="bg-background resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={profile.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Your company"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job_title">Job Title</Label>
                    <Input
                      id="job_title"
                      value={profile.job_title}
                      onChange={(e) => handleInputChange('job_title', e.target.value)}
                      placeholder="Your job title"
                      className="bg-background"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Your location"
                    className="bg-background"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Social Links</CardTitle>
                <CardDescription className="text-base">
                  Connect your social media and professional profiles.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="website_url" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Website
                  </Label>
                  <Input
                    id="website_url"
                    value={profile.website_url}
                    onChange={(e) => handleInputChange('website_url', e.target.value)}
                    placeholder="https://yourwebsite.com"
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github_url" className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    GitHub
                  </Label>
                  <Input
                    id="github_url"
                    value={profile.github_url}
                    onChange={(e) => handleInputChange('github_url', e.target.value)}
                    placeholder="https://github.com/username"
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin_url" className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedin_url"
                    value={profile.linkedin_url}
                    onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className="bg-background"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Skills</CardTitle>
                <CardDescription className="text-base">
                  Add skills that represent your expertise and interests.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill..."
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    className="bg-background"
                  />
                  <Button onClick={addSkill} size="sm" className="shrink-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="gap-1 py-1 px-3">
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="text-muted-foreground hover:text-foreground ml-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Notifications */}
            <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Notifications</CardTitle>
                <CardDescription className="text-base">
                  Configure your notification preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="font-medium">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={profile.notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="font-medium">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications
                    </p>
                  </div>
                  <Switch
                    checked={profile.notifications.push}
                    onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="font-medium">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive promotional content
                    </p>
                  </div>
                  <Switch
                    checked={profile.notifications.marketing}
                    onCheckedChange={(checked) => handleNotificationChange('marketing', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Profile Preview */}
            <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Profile Preview</CardTitle>
                <CardDescription className="text-base">
                  How others will see your profile.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={profile.avatar_url} />
                      <AvatarFallback>
                        {profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{profile.full_name || 'Your Name'}</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {profile.job_title && profile.company 
                          ? `${profile.job_title} at ${profile.company}`
                          : profile.job_title || profile.company || 'Job Title'}
                      </p>
                    </div>
                  </div>
                  {profile.bio && (
                    <p className="text-sm text-muted-foreground leading-relaxed">{profile.bio}</p>
                  )}
                  {profile.location && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span className="truncate">{profile.location}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <Button 
              onClick={handleSave} 
              disabled={isLoading}
              className="w-full gap-2 h-12 text-base"
              size="lg"
            >
              <Save className="h-5 w-5" />
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;