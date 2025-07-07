
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Folder, Code, Globe, Smartphone, Database, Sparkles, ArrowRight, Download, Share, Settings, Terminal, FileCode, Layers, Box, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAI } from '@/context/AIContext';

interface Project {
  id: string;
  name: string;
  description: string;
  type: 'web' | 'mobile' | 'api' | 'fullstack';
  status: 'draft' | 'building' | 'completed' | 'deployed';
  createdAt: Date;
  lastModified: Date;
  progress: number;
  files: string[];
  dependencies: string[];
}

const ProjectBuilder: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    type: 'web' as const
  });
  const { sendMessage, isLoading } = useAI();

  const projectTemplates = [
    {
      type: 'web',
      title: 'Web Application',
      description: 'React, TypeScript, Tailwind CSS',
      icon: <Globe className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      features: ['Responsive Design', 'Modern UI/UX', 'Fast Performance']
    },
    {
      type: 'mobile',
      title: 'Mobile App',
      description: 'React Native, Cross-platform',
      icon: <Smartphone className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      features: ['iOS & Android', 'Native Performance', 'Modern UI']
    },
    {
      type: 'api',
      title: 'Backend API',
      description: 'Node.js, Express, Database',
      icon: <Database className="w-6 h-6" />,
      color: 'from-purple-500 to-violet-500',
      features: ['RESTful API', 'Authentication', 'Database Integration']
    },
    {
      type: 'fullstack',
      title: 'Full-Stack App',
      description: 'Complete end-to-end solution',
      icon: <Layers className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      features: ['Frontend & Backend', 'Database', 'Deployment Ready']
    }
  ];

  const handleCreateProject = async () => {
    if (!newProject.name || !newProject.description) return;

    const project: Project = {
      id: Date.now().toString(),
      name: newProject.name,
      description: newProject.description,
      type: newProject.type,
      status: 'draft',
      createdAt: new Date(),
      lastModified: new Date(),
      progress: 0,
      files: [],
      dependencies: []
    };

    setProjects(prev => [...prev, project]);
    setIsCreateDialogOpen(false);
    setNewProject({ name: '', description: '', type: 'web' });

    // Send AI message to start building the project
    const buildPrompt = `I want to build a ${newProject.type} project called "${newProject.name}". ${newProject.description}. Please help me create the initial structure and start building this project with all necessary files, dependencies, and best practices.`;
    await sendMessage(buildPrompt);
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-500';
      case 'building': return 'bg-yellow-500';
      case 'completed': return 'bg-green-500';
      case 'deployed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: Project['type']) => {
    switch (type) {
      case 'web': return <Globe className="w-4 h-4" />;
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'api': return <Database className="w-4 h-4" />;
      case 'fullstack': return <Layers className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Project Builder</h2>
          <p className="text-gray-400">Create and manage your development projects with AI assistance</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl bg-[#1a1a1a] border-gray-800">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Choose a project type and let AI help you build it from scratch
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              {/* Project Templates */}
              <div className="grid grid-cols-2 gap-4">
                {projectTemplates.map((template) => (
                  <motion.div
                    key={template.type}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                      newProject.type === template.type 
                        ? 'border-primary bg-primary/10' 
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                    onClick={() => setNewProject(prev => ({ ...prev, type: template.type as any }))}
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${template.color} p-2 mb-3 text-white`}>
                      {template.icon}
                    </div>
                    <h3 className="font-semibold text-white mb-1">{template.title}</h3>
                    <p className="text-sm text-gray-400 mb-3">{template.description}</p>
                    <div className="space-y-1">
                      {template.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-xs text-gray-500">
                          <div className="w-1 h-1 bg-gray-500 rounded-full mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Project Details */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    placeholder="My Awesome Project"
                    value={newProject.name}
                    onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-[#2a2a2a] border-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what you want to build..."
                    value={newProject.description}
                    onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                    className="bg-[#2a2a2a] border-gray-700"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleCreateProject}
                  disabled={!newProject.name || !newProject.description || isLoading}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  {isLoading ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Create with AI
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Box className="w-12 h-12 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
          <p className="text-gray-400 mb-6">Start building your first project with AI assistance</p>
          <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Project
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-[#1a1a1a] border-gray-800 hover:border-gray-700 transition-all cursor-pointer group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(project.type)}
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                      </div>
                      <Badge className={`${getStatusColor(project.status)} text-white`}>
                        {project.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-400">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-gray-300">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <motion.div
                            className="bg-primary h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${project.progress}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                      </div>

                      {/* Project Stats */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-400 mb-1">Files</div>
                          <div className="text-gray-200">{project.files.length}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 mb-1">Dependencies</div>
                          <div className="text-gray-200">{project.dependencies.length}</div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                          <Terminal className="w-3 h-3 mr-1" />
                          Open
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-700">
                          <Settings className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-700">
                          <Share className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default ProjectBuilder;
