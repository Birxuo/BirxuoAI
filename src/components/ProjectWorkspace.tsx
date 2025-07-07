
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Folder, Terminal, Play, Save, Download, Share, Settings, Code, Eye, Split, Plus, Search, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
  language?: string;
}

const ProjectWorkspace: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [activeTab, setActiveTab] = useState('code');
  const [isRunning, setIsRunning] = useState(false);
  
  // Mock project structure
  const [fileTree] = useState<FileNode[]>([
    {
      id: '1',
      name: 'src',
      type: 'folder',
      children: [
        {
          id: '2',
          name: 'components',
          type: 'folder',
          children: [
            {
              id: '3',
              name: 'App.tsx',
              type: 'file',
              language: 'typescript',
              content: `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;`
            }
          ]
        },
        {
          id: '4',
          name: 'pages',
          type: 'folder',
          children: [
            {
              id: '5',
              name: 'Home.tsx',
              type: 'file',
              language: 'typescript',
              content: `import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to Your Project
      </h1>
      <p className="text-lg text-gray-600 text-center">
        This is your AI-generated project structure.
      </p>
    </div>
  );
};

export default Home;`
            }
          ]
        }
      ]
    },
    {
      id: '6',
      name: 'package.json',
      type: 'file',
      language: 'json',
      content: `{
  "name": "my-project",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-router-dom": "^6.0.0",
    "typescript": "^4.0.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test"
  }
}`
    }
  ]);

  const renderFileTree = (nodes: FileNode[], depth = 0) => {
    return nodes.map((node) => (
      <div key={node.id} style={{ marginLeft: `${depth * 16}px` }}>
        <div
          className={`flex items-center py-1 px-2 rounded cursor-pointer hover:bg-gray-800 ${
            selectedFile?.id === node.id ? 'bg-gray-700' : ''
          }`}
          onClick={() => node.type === 'file' && setSelectedFile(node)}
        >
          {node.type === 'folder' ? (
            <Folder className="w-4 h-4 mr-2 text-blue-400" />
          ) : (
            <FileText className="w-4 h-4 mr-2 text-gray-400" />
          )}
          <span className="text-sm text-gray-200">{node.name}</span>
        </div>
        {node.children && renderFileTree(node.children, depth + 1)}
      </div>
    ));
  };

  const handleRunProject = () => {
    setIsRunning(true);
    // Simulate build/run process
    setTimeout(() => {
      setIsRunning(false);
    }, 3000);
  };

  return (
    <div className="h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Toolbar */}
      <div className="bg-[#1a1a1a] border-b border-gray-800 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold">My Awesome Project</h2>
            <Badge variant="outline" className="border-green-500 text-green-400">
              Running
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline" className="border-gray-700">
              <Search className="w-4 h-4 mr-1" />
              Search
            </Button>
            <Button 
              size="sm" 
              onClick={handleRunProject}
              disabled={isRunning}
              className="bg-green-600 hover:bg-green-700"
            >
              {isRunning ? (
                <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <Play className="w-4 h-4 mr-1" />
              )}
              {isRunning ? 'Building...' : 'Run'}
            </Button>
            <Button size="sm" variant="outline" className="border-gray-700">
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
            <Button size="sm" variant="outline" className="border-gray-700">
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* File Explorer */}
          <ResizablePanel defaultSize={20} minSize={15}>
            <div className="h-full bg-[#1a1a1a] border-r border-gray-800">
              <div className="p-3 border-b border-gray-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-200">Explorer</h3>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div className="p-2 overflow-auto">
                {renderFileTree(fileTree)}
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Editor/Preview Area */}
          <ResizablePanel defaultSize={60}>
            <div className="h-full bg-[#0a0a0a]">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                <div className="border-b border-gray-800">
                  <TabsList className="bg-transparent h-10">
                    <TabsTrigger value="code" className="data-[state=active]:bg-gray-800">
                      <Code className="w-4 h-4 mr-1" />
                      Code
                    </TabsTrigger>
                    <TabsTrigger value="preview" className="data-[state=active]:bg-gray-800">
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </TabsTrigger>
                    <TabsTrigger value="split" className="data-[state=active]:bg-gray-800">
                      <Split className="w-4 h-4 mr-1" />
                      Split
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="code" className="h-full mt-0 p-4">
                  {selectedFile ? (
                    <div className="h-full">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-medium text-gray-200">{selectedFile.name}</h4>
                        <Badge variant="outline" className="border-gray-600 text-gray-400">
                          {selectedFile.language}
                        </Badge>
                      </div>
                      <div className="bg-[#1a1a1a] rounded-lg p-4 h-full overflow-auto">
                        <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                          {selectedFile.content}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <div className="text-center">
                        <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Select a file to view its contents</p>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="preview" className="h-full mt-0">
                  <div className="h-full bg-white rounded-lg m-4 overflow-hidden">
                    <iframe
                      src="about:blank"
                      className="w-full h-full border-0"
                      title="Project Preview"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="split" className="h-full mt-0">
                  <ResizablePanelGroup direction="horizontal" className="h-full">
                    <ResizablePanel defaultSize={50}>
                      <div className="h-full p-4">
                        {selectedFile && (
                          <div className="bg-[#1a1a1a] rounded-lg p-4 h-full overflow-auto">
                            <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                              {selectedFile.content}
                            </pre>
                          </div>
                        )}
                      </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={50}>
                      <div className="h-full bg-white m-4 rounded-lg overflow-hidden">
                        <iframe
                          src="about:blank"
                          className="w-full h-full border-0"
                          title="Project Preview"
                        />
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </TabsContent>
              </Tabs>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Terminal/Console */}
          <ResizablePanel defaultSize={20} minSize={15}>
            <div className="h-full bg-[#1a1a1a] border-l border-gray-800">
              <div className="p-3 border-b border-gray-800">
                <div className="flex items-center">
                  <Terminal className="w-4 h-4 mr-2 text-green-400" />
                  <h3 className="text-sm font-medium text-gray-200">Terminal</h3>
                </div>
              </div>
              <div className="p-3 h-full overflow-auto font-mono text-sm">
                <div className="text-green-400">$ npm start</div>
                <div className="text-gray-400 mt-1">Starting development server...</div>
                <div className="text-gray-400">Compiled successfully!</div>
                <div className="text-gray-400">Local: http://localhost:3000</div>
                <div className="text-gray-400 mt-2">webpack compiled with 0 errors</div>
                {isRunning && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-yellow-400 mt-1"
                  >
                    Building project...
                  </motion.div>
                )}
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default ProjectWorkspace;
