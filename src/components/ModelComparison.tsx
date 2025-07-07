import React from 'react';
import { useAI } from '@/context/AIContext';
import { Check, Trash2, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
const ModelComparison: React.FC = () => {
  const {
    multiModelEnabled,
    toggleMultiModel,
    selectedModels,
    availableModels,
    addModelToComparison,
    removeModelFromComparison
  } = useAI();
  return <motion.div initial={{
    opacity: 0,
    y: -10
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.2
  }} className="w-full border-b border-primary/20 p-3 bg-zinc-900">
      <div className="max-w-5xl mx-auto flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch id="multi-model-toggle" checked={multiModelEnabled} onCheckedChange={toggleMultiModel} />
            <label htmlFor="multi-model-toggle" className="text-sm font-medium cursor-pointer">
              Compare Multiple AI Models
            </label>
          </div>
          
          <Badge variant="outline" className="bg-primary/10 text-primary text-xs">
            Beta Feature
          </Badge>
        </div>
        
        {multiModelEnabled && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} transition={{
        duration: 0.3
      }} className="p-2 rounded-md bg-primary/5 border border-primary/10">
            <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground mb-2 sm:mb-0">
                Selected models ({selectedModels.length}):
              </p>
              
              <div className="flex flex-wrap gap-2 items-center">
                {selectedModels.map(modelId => {
              const model = availableModels.find(m => m.id === modelId);
              return <div key={modelId} className="flex items-center gap-1 px-2 py-1 text-xs rounded-full 
                                bg-primary/10 border border-primary/20">
                      <span className="max-w-[150px] truncate">{model?.name || modelId}</span>
                      <Button variant="ghost" size="icon" className="h-4 w-4 rounded-full hover:bg-destructive/20" onClick={() => removeModelFromComparison(modelId)} disabled={selectedModels.length <= 1}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>;
            })}
                
                {selectedModels.length < 3 && <Select onValueChange={value => addModelToComparison(value)}>
                    <SelectTrigger className="w-[180px] h-7 text-xs border-dashed">
                      <SelectValue placeholder="Add model..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableModels.filter(model => !selectedModels.includes(model.id)).map(model => <SelectItem key={model.id} value={model.id}>
                            <div className="flex items-center justify-between w-full">
                              <span className="truncate">{model.name}</span>
                            </div>
                          </SelectItem>)}
                    </SelectContent>
                  </Select>}
              </div>
            </div>
            
            <div className="mt-3 text-xs text-muted-foreground">
              <p>
                All selected models will respond to your messages side-by-side for comparison.
                <span className="text-yellow-400"> Note: Using multiple models may increase API costs.</span>
              </p>
            </div>
          </motion.div>}
      </div>
    </motion.div>;
};
export default ModelComparison;