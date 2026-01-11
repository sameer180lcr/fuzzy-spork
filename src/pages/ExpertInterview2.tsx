import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactFlow, {
  Background,
  Controls,
  Handle,
  Position,
  MarkerType,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { OllamaService, OLLAMA_MODELS } from '@/services/ollama';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Play,
  Clock,
  ChevronRight,
  FileText,
  Layout,
  Settings,
  Lock,
  Unlock,
  Maximize2,
  Plus,
  Minus,
  Star,
  Database,
  Server,
  Network,
  Cloud,
  Shield,
  Layers,
  Sparkles,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Home
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Custom Node Component
const CustomNode = ({ data, selected }: any) => {
  const label = data.label || data.name || 'Service Node';
  const type = data.type || 'gateway';

  const isError = type === 'error';
  const isDatabase = type === 'database';
  const isClient = type === 'client';
  const isGateway = type === 'gateway' || (!isError && !isDatabase && !isClient);

  return (
    <div className={cn(
      "px-5 py-3 rounded-2xl border-2 transition-all flex items-center gap-4 shadow-sm min-w-[200px]",
      isClient ? "bg-emerald-50 border-emerald-200 text-emerald-900" :
        isDatabase ? "bg-blue-50 border-blue-200 text-blue-900" :
          isError ? "bg-rose-50 border-rose-200 text-rose-900" :
            "bg-amber-50 border-amber-200 text-amber-900",
      selected ? "ring-2 ring-offset-4 ring-blue-500 shadow-xl scale-105" : ""
    )}>
      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-gray-400 border-2 border-white" />

      <div className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-white/50",
        isClient ? "bg-white text-emerald-600" :
          isDatabase ? "bg-white text-blue-600" :
            isError ? "bg-white text-rose-600" :
              "bg-white text-amber-600"
      )}>
        {isClient && <Maximize2 className="w-5 h-5" />}
        {isDatabase && <Database className="w-5 h-5" />}
        {isError && <AlertCircle className="w-5 h-5" />}
        {!isClient && !isDatabase && !isError && <Settings className="w-5 h-5" />}
      </div>

      <div className="flex flex-col">
        <div className="text-[13px] font-extrabold whitespace-nowrap leading-none mb-1">{label}</div>
        <div className="text-[10px] opacity-60 font-medium uppercase tracking-wider">
          {isGateway ? 'Service Gateway' : isClient ? 'End User' : isDatabase ? 'Data Store' : 'System Node'}
        </div>
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-gray-400 border-2 border-white" />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node[] = [
  {
    id: 'client',
    type: 'custom',
    position: { x: 50, y: 150 },
    data: { label: 'Client', type: 'client' },
  },
  {
    id: 'gateway',
    type: 'custom',
    position: { x: 180, y: 150 },
    data: { label: 'API Gateway', type: 'gateway' },
  },
  {
    id: 'ratelimiter',
    type: 'custom',
    position: { x: 330, y: 150 },
    data: { label: 'Rate Limiter', type: 'gateway' },
  },
  {
    id: 'validator',
    type: 'custom',
    position: { x: 480, y: 150 },
    data: { label: 'Input Validator', type: 'gateway' },
  },
  {
    id: 'auth',
    type: 'custom',
    position: { x: 630, y: 150 },
    data: { label: 'Auth Service', type: 'gateway' },
  },
  {
    id: 'userdb',
    type: 'custom',
    position: { x: 780, y: 150 },
    data: { label: 'User DB', type: 'database' },
  },
  {
    id: 'error',
    type: 'custom',
    position: { x: 400, y: 280 },
    data: { label: 'Error Response', type: 'error' },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: 'client',
    target: 'gateway',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8', width: 20, height: 20 },
    style: { stroke: '#94a3b8', strokeWidth: 2 }
  },
  {
    id: 'e2-3',
    source: 'gateway',
    target: 'ratelimiter',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8', width: 20, height: 20 },
    style: { stroke: '#94a3b8', strokeWidth: 2 }
  },
  {
    id: 'e3-4',
    source: 'ratelimiter',
    target: 'validator',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8', width: 20, height: 20 },
    style: { stroke: '#94a3b8', strokeWidth: 2 }
  },
  {
    id: 'e4-5',
    source: 'validator',
    target: 'auth',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8', width: 20, height: 20 },
    style: { stroke: '#94a3b8', strokeWidth: 2 }
  },
  {
    id: 'e5-6',
    source: 'auth',
    target: 'userdb',
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed, color: '#2563eb', width: 20, height: 20 },
    style: { stroke: '#2563eb', strokeWidth: 2 }
  },
  {
    id: 'e3-error',
    source: 'ratelimiter',
    target: 'error',
    type: 'smoothstep',
    animated: false,
    markerEnd: { type: MarkerType.ArrowClosed, color: '#ef4444', width: 20, height: 20 },
    style: { stroke: '#fca5a5', strokeWidth: 2, strokeDasharray: '5 5' }
  },
];

const InterviewContent = ({ onComplete }: { onComplete?: (data: any) => void }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// start writing your solution here...\n\n');
  const [isLocked, setIsLocked] = useState(false);
  const [isGeneratingTask, setIsGeneratingTask] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [dynamicInstructions, setDynamicInstructions] = useState<string>('Implement the API Gateway logic shown in the diagram. Include rate limiting, validation, and proper error handling.');
  const [timeLeft, setTimeLeft] = useState(17 * 60);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const shouldRun = !isGeneratingTask && !isSubmitting;

    if (shouldRun) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isGeneratingTask, isSubmitting]);

  const navigate = useNavigate();
  const { fitView, zoomIn, zoomOut } = useReactFlow();
  const { toast } = useToast();

  const generateNewTask = async () => {
    setIsGeneratingTask(true);
    setDynamicInstructions('');

    try {
      const prompt = `You are a Senior System Architect. Create a technical interview task.
      Output ONLY a single JSON object. DO NOT include markdown code blocks or any other text.
      
      TEMPLATE:
      {
        "graph": {
          "nodes": [
            {"id": "node1", "type": "custom", "position": {"x": 50, "y": 200}, "data": {"label": "Client", "type": "client"}},
            {"id": "node2", "type": "custom", "position": {"x": 300, "y": 200}, "data": {"label": "API Gateway", "type": "gateway"}}
          ],
          "edges": [
            {"id": "e1-2", "source": "node1", "target": "node2", "animated": true, "type": "smoothstep"}
          ]
        },
        "instructions": "## Title\\nDetailed task description here..."
      }
      
      Requirements: At least 6 nodes, 5 edges. Types: 'client'|'database'|'error'|'gateway'. x-positions: 50, 300, 550, 800...`;

      let fullResponse = "";
      await OllamaService.generateStreaming(
        prompt,
        OLLAMA_MODELS.REASONER,
        (chunk) => {
          fullResponse += chunk;

          // Improved streaming extraction
          const instructIndex = fullResponse.lastIndexOf('"instructions":');
          if (instructIndex !== -1) {
            let chunkContent = fullResponse.substring(instructIndex + 14).trim();
            // Remove leading quote if it exists
            if (chunkContent.startsWith('"')) chunkContent = chunkContent.substring(1);
            // Remove trailing JSON artifacts for live view
            const cleanChunk = chunkContent
              .split('","')[0]
              .split('"}')[0]
              .replace(/\\n/g, '\n')
              .replace(/\\"/g, '"')
              .replace(/\\/g, ''); // Remove stray backslashes

            if (cleanChunk.length > 0) {
              setDynamicInstructions(cleanChunk);
            }
          }
        },
        { temperature: 0.1 }
      );

      // Final Extraction Logic
      try {
        const jsonMatch = fullResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const jsonStr = jsonMatch[0];
          let data: any = {};
          try {
            data = JSON.parse(jsonStr);
          } catch (e) {
            // If JSON parse fails, try to manually extract keys
            const instructMatch = jsonStr.match(/"instructions":\s*"([\s\S]*?)"/);
            if (instructMatch) data.instructions = instructMatch[1];

            const graphMatch = jsonStr.match(/"graph":\s*(\{[\s\S]*?\})\s*[},]/);
            if (graphMatch) {
              try { data.graph = JSON.parse(graphMatch[1]); } catch (e) { }
            }
          }

          if (data.graph && Array.isArray(data.graph.nodes)) {
            // ENFORCE CUSTOM TYPE for every node to ensure our premium UI renders
            const processedNodes = data.graph.nodes.map((node: any) => ({
              ...node,
              type: 'custom',
              data: {
                ...node.data,
                // Ensure label and type exist in the data object for the CustomNode component
                label: node.data?.label || node.label || 'Node',
                type: node.data?.type || node.type || 'gateway'
              },
              position: {
                x: node.position?.x || 0,
                y: node.position?.y || 200
              }
            }));

            setNodes([]);
            setTimeout(() => {
              setNodes(processedNodes);
              setEdges(data.graph.edges || []);
              setTimeout(() => fitView({ duration: 1000, padding: 0.2 }), 400);
            }, 50);

            // Set instructions and clean out any JSON leaking from AI
            if (data.instructions) {
              let cleanText = data.instructions.replace(/\\n/g, '\n').replace(/\\"/g, '"');
              if (cleanText.includes('```json')) cleanText = cleanText.split('```json')[0];
              setDynamicInstructions(cleanText);
            }

            toast({
              title: "Architecture Built",
              description: `Successfully synthesized ${processedNodes.length} system components.`,
            });
          }
        } else if (fullResponse.trim().length > 50) {
          // Fallback: If no JSON, treat the whole thing as instructions
          setDynamicInstructions(fullResponse.trim());
        }
      } catch (parseError) {
        console.error("Extraction error:", parseError);
        if (fullResponse.trim()) setDynamicInstructions(fullResponse.trim());
      }
    } catch (error) {
      console.error("Failed to generate task:", error);
      toast({
        title: "Generation Failed",
        description: "Falling back to default task.",
        variant: "destructive"
      });
      setDynamicInstructions('Implement the API Gateway logic shown in the diagram. Include rate limiting, validation, and proper error handling.');
    } finally {
      setIsGeneratingTask(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate complex submission and evaluation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setShowSuccess(true);
    if (onComplete) {
      onComplete({
        nodes,
        edges,
        code,
        instructions: dynamicInstructions
      });
    }
    toast({
      title: "Solutions Submitted",
      description: "Your architecture and code have been sent for evaluation.",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-[#f8f9fb]">
      {/* Header - Compact and Informative */}
      <header className="h-14 border-b bg-white flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center text-blue-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-[#1d1d1f] leading-none">API Gateway Implementation</span>
              <span className="text-[10px] text-[#86868b]">Diagram-to-Code Interview</span>
            </div>
          </div>

          <div className="h-4 w-[1px] bg-gray-200" />

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-none px-2 py-0 text-[10px] uppercase tracking-wider font-bold">PHASE 2/2</Badge>
            <div className="flex items-center gap-3 text-[#86868b] text-xs px-2">
              <div className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>17 Min Limit</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full" />
              <span className="font-medium">{formatTime(timeLeft)} Remaining</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs border-gray-200 gap-2"
            onClick={generateNewTask}
            disabled={isGeneratingTask}
          >
            <Sparkles className={cn("w-3.5 h-3.5 text-orange-500", isGeneratingTask && "animate-spin")} />
            {isGeneratingTask ? "Generating..." : "Generate New Task"}
          </Button>
          <div className="h-4 w-[1px] bg-gray-200 mx-1" />
          <Button variant="outline" size="sm" className="h-8 text-xs border-gray-200">
            End Interview
          </Button>
          <Button
            variant="hero"
            className="gap-2 h-8 px-4 text-xs font-bold shadow-sm"
            onClick={handleSubmit}
            disabled={isSubmitting || isGeneratingTask}
          >
            {isSubmitting ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
            {isSubmitting ? "Submitting..." : "Submit Code"}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden p-4 gap-4">
        {/* Left Panel - Architecture & Instructions */}
        <div className="w-[42%] flex flex-col gap-4 overflow-hidden">
          {/* Diagram Area - Maximum space */}
          <div className="bg-white rounded-xl border border-[#e5e5e5] shadow-sm flex-1 relative overflow-hidden group">
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
              <div className="bg-white/80 backdrop-blur px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm flex items-center gap-2">
                <Layout className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-[11px] font-bold text-gray-700">System Architecture</span>
              </div>
            </div>

            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              fitView
              nodesDraggable={!isLocked}
              className={cn("bg-[#fafafa] transition-opacity duration-1000", isGeneratingTask ? "opacity-40" : "opacity-100")}
            >
              <Background color="#e5e7eb" gap={16} size={1} />

              {/* Generative Overlays */}
              <AnimatePresence>
                {isGeneratingTask && (
                  <motion.div
                    key="creation-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-40 bg-white/40 backdrop-blur-[1px] flex flex-col items-center justify-center"
                  >
                    <div className="bg-white/90 p-8 rounded-3xl border border-white shadow-2xl flex flex-col items-center gap-6 max-w-sm text-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-orange-400 rounded-full animate-ping opacity-20"></div>
                        <div className="w-20 h-20 bg-[#1d1d1f] rounded-2xl flex items-center justify-center shadow-xl relative z-10 border border-white/20">
                          <Sparkles className="w-10 h-10 text-orange-400 animate-pulse" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-lg font-bold text-[#1d1d1f]">Expert Architect is Creating</h4>
                        <p className="text-xs text-[#86868b] leading-relaxed">Synthesizing a new architectural challenge using Gemma 3:1b Reasoning.</p>
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        {[
                          { label: 'Analyzing Architecture DNA', color: 'text-blue-500', delay: 0 },
                          { label: 'Parameterizing Constraints', color: 'text-orange-500', delay: 0.5 },
                          { label: 'Compiling Implementation Tasks', color: 'text-emerald-500', delay: 1 }
                        ].map((step, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: step.delay }}
                            className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl"
                          >
                            <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", step.color.replace('text', 'bg'))} />
                            <span className={cn("text-[10px] uppercase tracking-widest font-bold", step.color)}>{step.label}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </ReactFlow>

            {/* Minimal Controls Overlay */}
            <div className="absolute right-4 top-4 flex flex-col gap-1 bg-white/90 backdrop-blur border border-[#e5e5e5] rounded-lg p-1 shadow-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => zoomIn()} className="p-1.5 hover:bg-gray-100 rounded text-gray-500"><Plus className="w-4 h-4" /></button>
              <button onClick={() => zoomOut()} className="p-1.5 hover:bg-gray-100 rounded text-gray-500"><Minus className="w-4 h-4" /></button>
              <button onClick={() => fitView()} className="p-1.5 hover:bg-gray-100 rounded text-gray-500"><Maximize2 className="w-4 h-4" /></button>
              <button
                onClick={() => setIsLocked(!isLocked)}
                className={`p-1.5 hover:bg-gray-100 rounded ${isLocked ? 'text-blue-500' : 'text-gray-500'}`}
              >
                {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Instructions Card - More compact */}
          <div className="bg-white rounded-xl border border-[#e5e5e5] p-5 shadow-sm max-h-[35%] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#1d1d1f]">Session Blueprint</h3>
                  <div className="text-[10px] text-[#86868b] uppercase tracking-wider font-bold">Dynamic Requirements</div>
                </div>
              </div>
              {isGeneratingTask && (
                <Badge variant="outline" className="animate-pulse bg-orange-50 text-orange-600 border-orange-100 gap-1.5 text-[9px] uppercase tracking-widest font-bold">
                  <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                  Live Generation
                </Badge>
              )}
            </div>
            <div className="space-y-3 text-xs text-[#424245] leading-relaxed relative min-h-[100px]">
              {isGeneratingTask && !dynamicInstructions ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                  <div className="h-4 bg-gray-100 rounded w-full" />
                  <div className="h-4 bg-gray-100 rounded w-5/6" />
                </div>
              ) : (
                <div className="prose prose-sm max-w-none text-xs text-[#424245] prose-headings:text-sm prose-headings:mb-2 prose-p:my-1">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {dynamicInstructions}
                  </ReactMarkdown>
                </div>
              )}
              {isGeneratingTask && dynamicInstructions && (
                <span className="inline-block w-1.5 h-4 ml-1 bg-orange-500 animate-pulse align-middle" />
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Code Editor (Expanded) */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#1e1e1e] rounded-xl border border-gray-800 shadow-xl">
          <div className="h-10 flex items-center justify-between px-4 bg-[#1e1e1e] border-b border-white/5">
            <div className="flex gap-1">
              {['javascript', 'typescript', 'python'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`text-[11px] font-bold px-4 py-2 transition-all rounded-t-lg ${language === lang
                    ? 'text-white bg-white/5 border-b-2 border-blue-500'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                    }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
              <Settings className="w-3 h-3" />
              VS Code v1.0
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <Editor
              height="100%"
              language={language}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 16 },
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              }}
            />
          </div>
        </div>
      </main >

      {/* Success Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: [0.5, 1.2, 1],
                opacity: 1
              }}
              transition={{ duration: 0.6, times: [0, 0.7, 1] }}
              className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mb-8"
            >
              <CheckCircle2 className="w-20 h-20 text-blue-600" />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h2 className="text-4xl font-extrabold text-[#1d1d1f]">Finally Submitted</h2>
              <p className="text-[#86868b] max-w-md mx-auto">
                Excellent work! Your system architecture and implementation have been successfully recorded in the Talent Forge vault.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex gap-4"
            >
              <Button
                variant="hero"
                size="lg"
                className="gap-3 rounded-2xl px-8"
                onClick={() => navigate('/')}
              >
                <Home className="w-5 h-5" />
                Go to Home
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-2xl px-8"
                onClick={() => setShowSuccess(false)}
              >
                Review My Work
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div >
  );
};

const ExpertInterview2 = ({ onComplete }: { onComplete?: (data: any) => void }) => {
  return (
    <ReactFlowProvider>
      <InterviewContent onComplete={onComplete} />
    </ReactFlowProvider>
  );
};

export default ExpertInterview2;

