import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CheckCircle, Circle, Clock, Target, Trophy, ArrowRight, Bot, User, Send, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const Assessment = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI assessment assistant. I'll help you evaluate your skills and create a personalized learning path. What would you like to know about your current skill level?",
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const assessmentSteps = [
    {
      id: 0,
      title: "Welcome to Your Skill Assessment",
      type: "intro",
      content: {
        title: "Discover Your Learning Path",
        description: "This assessment will help us understand your current skills and recommend personalized learning paths.",
        features: [
          "15-minute comprehensive evaluation",
          "Personalized skill gap analysis", 
          "Custom learning recommendations",
          "AI-powered chat assistance"
        ]
      }
    },
    {
      id: 1,
      title: "Technical Background",
      type: "question",
      question: "What's your current level of programming experience?",
      options: [
        { id: "beginner", label: "Beginner", description: "Just starting out or learning basics" },
        { id: "intermediate", label: "Intermediate", description: "1-3 years of experience" },
        { id: "advanced", label: "Advanced", description: "3+ years with complex projects" },
        { id: "expert", label: "Expert", description: "Senior level with leadership experience" }
      ]
    },
    {
      id: 2,
      title: "Primary Focus Area",
      type: "question", 
      question: "Which area are you most interested in developing?",
      options: [
        { id: "frontend", label: "Frontend Development", description: "UI/UX, React, Vue, etc." },
        { id: "backend", label: "Backend Development", description: "APIs, databases, server logic" },
        { id: "fullstack", label: "Full Stack Development", description: "Both frontend and backend" },
        { id: "data", label: "Data Science & Analytics", description: "Data analysis, ML, visualization" },
        { id: "devops", label: "DevOps & Cloud", description: "Infrastructure, deployment, cloud services" }
      ]
    },
    {
      id: 3,
      title: "AI Chat Assessment",
      type: "chat",
      question: "Let's have a conversation about your goals and experience!"
    }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "That's great insight! Can you tell me more about the specific technologies you're most interested in learning?",
        "Based on what you've shared, it sounds like you have a solid foundation. What challenges have you faced in your current projects?",
        "Excellent! That aligns well with current industry trends. Have you worked on any personal projects that showcase these skills?",
        "I can see you're passionate about learning. What's your ideal timeline for achieving your next career milestone?",
        "That's very helpful information. Based on our conversation, I'm starting to see a clear learning path for you. Would you like me to create a personalized recommendation?"
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: randomResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleNext = () => {
    if (currentStep < assessmentSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      if (assessmentSteps[currentStep + 1].type === 'chat') {
        setShowChat(true);
      }
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      if (assessmentSteps[currentStep - 1].type !== 'chat') {
        setShowChat(false);
      }
    }
  };

  const handleAnswerSelect = (questionId: number, answerId: string) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answerId });
  };

  const currentStepData = assessmentSteps[currentStep];
  const progress = ((currentStep) / (assessmentSteps.length - 1)) * 100;

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="text-center space-y-6 mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 mb-6">
              <Trophy className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Assessment Complete!
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Based on your responses and our AI conversation, we've created a personalized learning path just for you.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-6 w-6 text-blue-500" />
                  Skill Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-500 mb-2">
                  {selectedAnswers[1] ? selectedAnswers[1].charAt(0).toUpperCase() + selectedAnswers[1].slice(1) : 'Intermediate'}
                </div>
                <p className="text-muted-foreground">
                  Your current programming experience level
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-6 w-6 text-green-500" />
                  Focus Area
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500 mb-2">
                  {selectedAnswers[2] ? selectedAnswers[2].replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) : 'Full Stack'}
                </div>
                <p className="text-muted-foreground">
                  Your primary area of interest
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CheckCircle className="h-6 w-6 text-purple-500" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-500 mb-2">
                  {messages.length - 1}
                </div>
                <p className="text-muted-foreground">
                  Conversation insights analyzed
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="max-w-4xl mx-auto border-0 shadow-lg bg-background/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Recommended Learning Path</CardTitle>
              <CardDescription className="text-lg">
                A personalized curriculum based on your assessment and AI conversation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-6 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50">
                  <Badge variant="outline" className="text-blue-600 border-blue-600">Week 1-2</Badge>
                  <div>
                    <h4 className="font-semibold text-lg">Foundation Building</h4>
                    <p className="text-muted-foreground">Core concepts and fundamentals tailored to your level</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-6 rounded-xl bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50">
                  <Badge variant="outline" className="text-green-600 border-green-600">Week 3-4</Badge>
                  <div>
                    <h4 className="font-semibold text-lg">Practical Application</h4>
                    <p className="text-muted-foreground">Hands-on projects based on your interests</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-6 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50">
                  <Badge variant="outline" className="text-purple-600 border-purple-600">Week 5-6</Badge>
                  <div>
                    <h4 className="font-semibold text-lg">Advanced Topics</h4>
                    <p className="text-muted-foreground">Deep dive into your chosen specialization</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button size="lg" className="flex-1 text-lg py-6">
                  Start Learning Path
                </Button>
                <Button variant="outline" size="lg" className="flex-1 text-lg py-6">
                  View Detailed Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="text-3xl lg:text-4xl font-bold">Skill Assessment</h1>
              <Badge variant="outline" className="gap-2 text-base py-2 px-4 w-fit">
                <Clock className="h-5 w-5" />
                ~15 minutes
              </Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium">
                <span>Progress</span>
                <span>{currentStep} of {assessmentSteps.length - 1}</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="min-h-[600px] border-0 shadow-lg bg-background/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl">{currentStepData.title}</CardTitle>
                </CardHeader>
                <CardContent className="h-full">
                  {currentStepData.type === 'intro' ? (
                    <div className="space-y-8">
                      <div>
                        <h2 className="text-3xl font-bold mb-4">{currentStepData.content.title}</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          {currentStepData.content.description}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {currentStepData.content.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                            <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                            <span className="font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : currentStepData.type === 'chat' ? (
                    <div className="flex flex-col h-[500px]">
                      <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Chat with AI Assistant</h2>
                        <p className="text-muted-foreground">
                          Let's have a conversation about your goals, experience, and what you'd like to achieve.
                        </p>
                      </div>
                      
                      <ScrollArea className="flex-1 pr-4">
                        <div className="space-y-4">
                          {messages.map((message) => (
                            <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className={message.type === 'ai' ? 'bg-primary text-primary-foreground' : 'bg-muted'}>
                                  {message.type === 'ai' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                                </AvatarFallback>
                              </Avatar>
                              <div className={`max-w-[80%] p-3 rounded-lg ${
                                message.type === 'user' 
                                  ? 'bg-primary text-primary-foreground ml-auto' 
                                  : 'bg-muted'
                              }`}>
                                <p className="text-sm leading-relaxed">{message.content}</p>
                              </div>
                            </div>
                          ))}
                          {isTyping && (
                            <div className="flex gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                  <Bot className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                              <div className="bg-muted p-3 rounded-lg">
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                              </div>
                            </div>
                          )}
                          <div ref={messagesEndRef} />
                        </div>
                      </ScrollArea>
                      
                      <div className="flex gap-2 mt-4">
                        <Input
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message..."
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          className="bg-background"
                        />
                        <Button onClick={handleSendMessage} size="sm" className="shrink-0">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold">{currentStepData.question}</h2>
                      <div className="space-y-3">
                        {currentStepData.options.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => handleAnswerSelect(currentStepData.id, option.id)}
                            className={`w-full text-left p-4 rounded-lg border transition-all hover:border-primary ${
                              selectedAnswers[currentStepData.id] === option.id
                                ? 'border-primary bg-primary/5'
                                : 'border-border'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {selectedAnswers[currentStepData.id] === option.id ? (
                                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              ) : (
                                <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                              )}
                              <div>
                                <div className="font-medium">{option.label}</div>
                                <div className="text-sm text-muted-foreground mt-1">
                                  {option.description}
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Assessment Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {assessmentSteps.map((step, index) => (
                      <div key={step.id} className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        index === currentStep ? 'bg-primary/10 border border-primary/20' : 
                        index < currentStep ? 'bg-muted/50' : 'opacity-50'
                      }`}>
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium ${
                          index < currentStep ? 'bg-green-500 text-white' :
                          index === currentStep ? 'bg-primary text-primary-foreground' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {index < currentStep ? <CheckCircle className="h-4 w-4" /> : index + 1}
                        </div>
                        <span className="text-sm font-medium">{step.title}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-background/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>• Be honest about your current skill level</p>
                    <p>• Think about your career goals</p>
                    <p>• Consider your available time for learning</p>
                    <p>• Chat with our AI for personalized insights</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 0}
              size="lg"
            >
              Previous
            </Button>
            
            <Button 
              onClick={handleNext}
              disabled={currentStepData.type === 'question' && !selectedAnswers[currentStepData.id]}
              className="gap-2"
              size="lg"
            >
              {currentStep === assessmentSteps.length - 1 ? 'Complete Assessment' : 'Next'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;