import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Editor } from '@monaco-editor/react';
import { Clock, SkipForward, ChevronRight, Brain, Code, Terminal, Maximize2, Minimize2, PanelRightClose, PanelRightOpen, Copy, Check, CheckCircle2, RefreshCw, Eye, Send, ArrowLeft, Cpu, Database, Server, Network, Cloud, Shield, Layers, BarChart2, CpuIcon, DatabaseIcon, ServerIcon, NetworkIcon, CloudIcon, ShieldIcon, LayersIcon, Settings, Play, WrapText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { OllamaService, OLLAMA_MODELS } from '@/services/ollama';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Field types with icons and descriptions
const FIELDS = [
    {
        id: 'ml-engineering',
        name: 'ML Engineering',
        icon: CpuIcon,
        description: 'Machine learning models, training, and deployment',
        color: 'bg-blue-100 text-blue-600',
        hoverColor: 'hover:bg-blue-50'
    },
    {
        id: 'data-engineering',
        name: 'Data Engineering',
        icon: DatabaseIcon,
        description: 'Data pipelines, ETL, and database systems',
        color: 'bg-green-100 text-green-600',
        hoverColor: 'hover:bg-green-50'
    },
    {
        id: 'backend',
        name: 'Backend Development',
        icon: ServerIcon,
        description: 'API design, microservices, and system architecture',
        color: 'bg-purple-100 text-purple-600',
        hoverColor: 'hover:bg-purple-50'
    },
    {
        id: 'devops',
        name: 'DevOps & Cloud',
        icon: CloudIcon,
        description: 'Infrastructure as code, CI/CD, and cloud services',
        color: 'bg-yellow-100 text-yellow-600',
        hoverColor: 'hover:bg-yellow-50'
    },
    {
        id: 'security',
        name: 'Security Engineering',
        icon: ShieldIcon,
        description: 'Application security, cryptography, and secure coding',
        color: 'bg-red-100 text-red-600',
        hoverColor: 'hover:bg-red-50'
    },
    {
        id: 'distributed-systems',
        name: 'Distributed Systems',
        icon: NetworkIcon,
        description: 'Scalable and fault-tolerant system design',
        color: 'bg-indigo-100 text-indigo-600',
        hoverColor: 'hover:bg-indigo-50'
    }
];

// --- Configuration & Mock Data ---

interface Question {
    id: number;
    text: string;
    category: string;
    difficulty: "DEPTH" | "ANALYSIS" | "CONCEPTUAL" | "SYSTEMS";
}

const FALLBACK_QUESTION: Question = {
    id: 1,
    text: "Calculate the total memory requirements (in GB) for training a 175B parameter LLM using Adam optimizer with mixed-precision (FP16/FP32). Assume 8 bytes per parameter for optimizer states (moments), 2 bytes for gradients, and 2 bytes for weights. Then, determine the minimum number of 80GB A100 GPUs needed just to fit the model and optimizer states.",
    category: "Quantitative Analysis",
    difficulty: "DEPTH"
};

const CHALLENGE_TEMPLATES = [
    "What is the exact numerical result of this operation?",
    "How does the complexity change if we triple the input size N?",
    "Calculate the error margin for this specific heuristic.",
    "Derive the probability of collision in this hash function with the given parameters.",
];

// --- Types ---

type Interaction = {
    type: 'USER' | 'AI';
    content: string; // The text reasoning
    code?: string;   // Optional code snippet
    label: string;   // "01", "WHY?", "02", etc.
    id: string;
};

// --- Component ---

const ExpertInterview = ({
    isEmbedded = false,
    onComplete
}: {
    isEmbedded?: boolean;
    onComplete?: (interactions: Interaction[]) => void;
}) => {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState<Question>(FALLBACK_QUESTION);
    const [interactions, setInteractions] = useState<Interaction[]>([]);
    const [selectedField, setSelectedField] = useState<string | null>(null);

    // Inputs
    const [currentInput, setCurrentInput] = useState('');
    const [currentCode, setCurrentCode] = useState('');
    const [language, setLanguage] = useState('python');

    // State
    const [isCodePanelOpen, setIsCodePanelOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState(37 * 60);
    const [isAiThinking, setIsAiThinking] = useState(false);
    const [stepCount, setStepCount] = useState(1);
    const [sessionActive, setSessionActive] = useState(true);
    const [streamingContent, setStreamingContent] = useState('');
    const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false);
    const [hasInterviewStarted, setHasInterviewStarted] = useState(false);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const { toast } = useToast();
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const codeEditorRef = useRef<HTMLTextAreaElement>(null);

    // Generate question based on selected field
    const fetchQuestion = async (fieldId: string | null) => {
        setIsGeneratingQuestion(true);
        stopTimer(); // Ensure timer is stopped during question generation
        try {
            const field = FIELDS.find(f => f.id === fieldId) || FIELDS[0];

            // Different prompt based on field
            const prompt = `Generate a LOGIC-BASED and NUMERICAL technical interview question about ${field.name}. 
            The question MUST involve quantitative analysis, calculations, or formal logic puzzles within the domain of ${field.name}.
            Example: Calculating throughput, estimating resource utilization, probability of system failure, or complexity derivation.
            Provide specific numerical constraints (e.g., 'A cluster has 50 nodes...', 'Processing 1PB of data with 10Gbps bandwidth...').
            The question should require the candidate to perform mental or scratchpad math to solve.
            Output ONLY the question text, no additional formatting like "Question:" headers.`;

            let qText = "";
            await OllamaService.generateStreaming(
                prompt,
                OLLAMA_MODELS.REASONER,
                (chunk) => { qText += chunk; },
                { temperature: 0.8 }
            );

            // Clean up the generated text
            qText = qText
                .replace(/^["']|["']$/g, '')
                .replace(/^Question[:\s]*/i, '')
                .trim();

            if (qText.length > 10) {
                setCurrentQuestion({
                    id: Date.now(),
                    text: qText,
                    category: field.name,
                    difficulty: "DEPTH"
                });
            }
        } catch (e) {
            console.error("Failed to generate question", e);
            toast({
                title: "Error",
                description: "Failed to generate question. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsGeneratingQuestion(false);
        }
    };

    // Timer control functions
    const startTimer = () => {
        if (!isTimerRunning && timeLeft > 0) {
            setIsTimerRunning(true);
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current as NodeJS.Timeout);
                        setIsTimerRunning(false);
                        return 0;
                    }
                    if (prev === 17 * 60) {
                        toast({
                            title: "Phase 1 Complete",
                            description: "Assessment recorded.",
                        });
                        if (onComplete) {
                            onComplete(interactions);
                        } else {
                            navigate('/expert-interview-2');
                        }
                    }
                    return prev - 1;
                });
            }, 1000);
        }
    };

    const stopTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setIsTimerRunning(false);
    };

    // Handle timer state changes
    useEffect(() => {
        // Pauses timer during AI generation/thinking, runs otherwise
        if (hasInterviewStarted && !isAiThinking && !isGeneratingQuestion && sessionActive) {
            startTimer();
        } else {
            stopTimer();
        }

        return () => {
            stopTimer();
        };
    }, [hasInterviewStarted, isAiThinking, isGeneratingQuestion, sessionActive]);

    // Clean up timer on unmount
    useEffect(() => {
        return () => {
            stopTimer();
        };
    }, []);

    useEffect(() => {
        // Auto scroll to bottom when new content comes in
        if (interactions.length > 0 || streamingContent) {
            setTimeout(() => {
                bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, [interactions, isAiThinking, streamingContent]);

    useEffect(() => {
        // Focus input on mount and after AI replies
        if (!isAiThinking && !isCodePanelOpen) {
            inputRef.current?.focus();
        }
    }, [isAiThinking, isCodePanelOpen]);

    // --- Handlers ---

    const handleNext = async () => {
        if (!currentInput.trim() && !currentCode.trim()) {
            toast({
                title: "Empty Response",
                description: "Please provide reasoning or code to proceed.",
                variant: "destructive"
            });
            return;
        }

        // Stop timer when user submits response
        stopTimer();

        const userStepLabel = stepCount.toString().padStart(2, '0');

        // 1. Add User Answer (Text + Code)
        const newInteractions: Interaction[] = [
            ...interactions,
            {
                type: 'USER',
                content: currentInput,
                code: currentCode,
                label: userStepLabel,
                id: Date.now().toString()
            }
        ];

        setInteractions(newInteractions);
        setCurrentInput('');
        setCurrentCode(''); // Clear code after submit
        setIsAiThinking(true);
        setStreamingContent(''); // Reset stream buffer

        // 2. Generate AI Challenge
        try {
            // Stop timer while AI is thinking
            stopTimer();

            // Construct context for the AI
            const context = newInteractions.map(i => `${i.type}: ${i.content} ${i.code ? `\nCode:\n${i.code}` : ''}`).join('\n');
            const prompt = `
Context: You are a Senior AI Engineer conducting a technical interview. The main topic is "${currentQuestion.text}".

Conversation History:
${context}

Your Goal: Ask a single, insightful follow-up question that tests the candidate's depth of understanding and problem-solving approach.

Guidelines:
1. Focus on understanding their thinking process, not just factual knowledge
2. Ask questions that require logical reasoning and analysis
3. Vary your approach based on their previous answers:
   - If their answer was theoretical, ask about practical implementation
   - If they focused on code, ask about trade-offs and optimizations
   - If they gave a high-level overview, ask for specific details
4. Make the question challenging but fair
5. Keep it concise (1-2 sentences max)

Example question types:
- "Given these new constraints, what is the updated throughput calculation?"
- "What is the specific numerical bound on the memory leak in this scenario?"
- "If the variable X increases by 15%, how does the total latency change quantitatively?"
- "Prove the logical consistency of your previous statement with a counter-example calculation."

Current conversation context to build upon:
${context}

Your single, focused follow-up question:"`;

            // Alternate models or use Deepseek/Qwen for reasoning
            const modelToUse = stepCount % 2 === 0 ? OLLAMA_MODELS.GENERATOR : OLLAMA_MODELS.REASONER;

            let aiResponseText = "";

            await OllamaService.generateStreaming(prompt, modelToUse, (chunk) => {
                aiResponseText += chunk;
                setStreamingContent(prev => prev + chunk);
                // Auto scroll handled by useEffect
            }, { temperature: 0.9 });

            // Add final AI interaction
            const aiInteraction: Interaction = {
                type: 'AI',
                content: aiResponseText,
                label: 'WHY?',
                id: (Date.now() + 1).toString()
            };

            setInteractions(prev => [...prev, aiInteraction]);
            setStepCount(prev => prev + 1);

        } catch (error) {
            console.error("AI Generation processing error", error);
            toast({ title: "AI Connection Error", description: "Could not connect to local expert model.", variant: "destructive" });
        } finally {
            setIsAiThinking(false);
            setStreamingContent('');
        }
    };

    const handleSkipTask = () => {
        // Stop current timer
        stopTimer();

        // Skip to a new question in the same field
        setIsGeneratingQuestion(true);
        setInteractions([]);
        setStepCount(1);
        setCurrentCode('');
        setCurrentInput('');
        setTimeLeft(37 * 60);

        // Generate a new question in the same field
        fetchQuestion(selectedField);

        // Don't start timer yet, wait for user input
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (!sessionActive) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
                <h1 className="text-2xl font-bold mb-2">Session Complete</h1>
                <p className="text-gray-500">Thank you for participating in the expert assessment.</p>
                <Button variant="outline" className="mt-6" onClick={() => window.location.reload()}>
                    Close Session
                </Button>
            </div>
        );
    }

    if (!hasInterviewStarted) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-8 text-center">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <Brain className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-[#1d1d1f] mb-2 font-display">Expert Interview Preparation</h1>
                    <div className="text-sm text-[#86868b] mb-8 flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4" />
                        Timer starts when you begin your first response
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                        {FIELDS.map((field) => (
                            <motion.div
                                key={field.id}
                                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${selectedField === field.id ? 'border-blue-500 bg-blue-50/50' : 'border-[#f2f2f7] bg-[#fcfcfd] hover:bg-white'}`}
                                whileHover={{ y: -4, boxShadow: '0 12px 30px -10px rgba(0, 0, 0, 0.08)', borderColor: selectedField === field.id ? '#3b82f6' : '#e5e5e5' }}
                                onClick={() => setSelectedField(field.id)}
                            >
                                <div className={`w-12 h-12 ${field.color} rounded-xl flex items-center justify-center mb-4 mx-auto border border-white/50 shadow-sm`}>
                                    <field.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-[#1d1d1f] mb-1">{field.name}</h3>
                                <p className="text-[11px] text-[#86868b] leading-relaxed">{field.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <Button
                            size="lg"
                            className="w-full md:w-72 bg-[#1d1d1f] text-white hover:opacity-90 rounded-full h-14 text-base font-bold transition-all shadow-lg hover:shadow-xl disabled:bg-gray-400"
                            disabled={!selectedField}
                            onClick={() => {
                                setHasInterviewStarted(true);
                                setIsGeneratingQuestion(true);
                                fetchQuestion(selectedField);
                            }}
                        >
                            Start Expert Interview
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                        <p className="text-[11px] text-[#86868b] uppercase tracking-widest font-bold">Selected: {FIELDS.find(f => f.id === selectedField)?.name || 'None'}</p>
                    </div>

                    <div className="mt-12 pt-8 border-t border-[#f2f2f7] grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-left">
                            <h4 className="font-bold text-[#1d1d1f] text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                                <Cpu className="w-4 h-4 text-blue-500" /> Challenge
                            </h4>
                            <p className="text-[12px] text-[#86868b]">Deep technical problems tailored to your expertise level.</p>
                        </div>
                        <div className="text-left">
                            <h4 className="font-bold text-[#1d1d1f] text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                                <Brain className="w-4 h-4 text-orange-500" /> Reasoning
                            </h4>
                            <p className="text-[12px] text-[#86868b]">We evaluate your step-by-step thinking, not just the output.</p>
                        </div>
                        <div className="text-left">
                            <h4 className="font-bold text-[#1d1d1f] text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                                <Shield className="w-4 h-4 text-emerald-500" /> Assessment
                            </h4>
                            <p className="text-[12px] text-[#86868b]">Receive a comprehensive audit of your technical approach.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={cn("bg-[#f8f9fb] flex flex-col font-sans text-[#1d1d1f] overflow-hidden", isEmbedded ? "h-full min-h-[600px] border border-[#e5e5e5] rounded-2xl shadow-sm" : "h-screen")}>
            {/* 1. Compact Header */}
            <header className="h-14 border-b bg-white flex items-center justify-between px-6 shrink-0 z-10 shadow-sm relative">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        {!isEmbedded && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-[#86868b] hover:bg-[#f2f2f7]"
                                onClick={() => window.history.back()}
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        )}
                        <div className="flex flex-col">
                            <span className="font-bold text-sm text-[#1d1d1f] leading-none">
                                {isGeneratingQuestion ? "Preparing Session..." : currentQuestion.category || "Expert Session"}
                            </span>
                            <span className="text-[10px] text-[#86868b] uppercase tracking-wider font-bold">Expert Assessment</span>
                        </div>
                    </div>

                    <div className="h-4 w-[1px] bg-gray-200" />

                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-[#f0f9ff] text-[#0369a1] border-none px-2 py-0 text-[10px] uppercase tracking-wider font-bold">PHASE 1/2</Badge>
                        <div className="flex items-center gap-3 text-[#86868b] text-xs px-2">
                            <div className="flex items-center gap-1.5 font-medium">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{formatTime(timeLeft)} Remaining</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {timeLeft <= 18 * 60 && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                if (onComplete) {
                                    onComplete(interactions);
                                } else {
                                    navigate('/expert-interview-2');
                                }
                            }}
                            className="h-8 text-xs border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100 animate-pulse"
                        >
                            Next Phase: Architecture <ChevronRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={handleSkipTask} className="h-8 text-xs border-[#e5e5e5] text-[#86868b] hover:bg-[#f2f2f7]">
                        <SkipForward className="w-3.5 h-3.5 mr-1.5" /> Skip Task
                    </Button>
                    <Button onClick={handleNext} disabled={isAiThinking} className="bg-[#1d1d1f] text-white hover:opacity-90 h-8 px-4 text-xs font-bold rounded-full transition-all">
                        {isAiThinking ? "Processing..." : "Submit Step"} <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                </div>
            </header>

            {/* 2. Main Layout */}
            <div className="flex-1 flex overflow-hidden relative">
                {/* Left Panel: Conversation Thread */}
                <main className="flex-1 overflow-y-auto px-6 py-6 pb-32">
                    <div className="max-w-4xl mx-auto flex flex-col gap-6">
                        {/* Problem Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl border border-[#e5e5e5] p-6 shadow-sm mb-4"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#86868b]">Case Study / Problem Statement</span>
                            </div>

                            {isGeneratingQuestion ? (
                                <div className="space-y-3 animate-pulse">
                                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                                    <div className="h-4 bg-gray-100 rounded w-full" />
                                    <div className="h-4 bg-gray-100 rounded w-5/6" />
                                </div>
                            ) : (
                                <div className="prose prose-sm max-w-none text-[#1d1d1f] leading-relaxed font-medium">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {currentQuestion.text}
                                    </ReactMarkdown>
                                </div>
                            )}
                        </motion.div>

                        <div className="flex items-center gap-4 px-2">
                            <div className="text-[10px] font-bold text-[#86868b] uppercase tracking-widest">Reasoning Thread</div>
                            <div className="flex-1 h-[1px] bg-[#f2f2f7]" />
                        </div>

                        {/* Interactions */}
                        {interactions.map((interaction) => (
                            <div key={interaction.id} className="flex gap-4 group animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="w-12 flex-shrink-0 flex flex-col items-center pt-1">
                                    <div className={cn(
                                        "w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold border",
                                        interaction.type === 'AI'
                                            ? "bg-orange-50 border-orange-100 text-orange-600"
                                            : "bg-white border-[#e5e5e5] text-[#1d1d1f]"
                                    )}>
                                        {interaction.type === 'AI' ? <RefreshCw className="w-3.5 h-3.5" /> : interaction.label}
                                    </div>
                                    <div className="w-[1px] flex-1 bg-[#f2f2f7] my-2" />
                                </div>

                                <div className={cn(
                                    "flex-1 p-5 rounded-2xl border transition-all",
                                    interaction.type === 'AI'
                                        ? "bg-[#fffcf0] border-orange-100/50 shadow-sm"
                                        : "bg-white border-[#e5e5e5] group-hover:border-gray-300 shadow-sm"
                                )}>
                                    {interaction.type === 'AI' && (
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                                            <span className="text-[10px] uppercase font-bold tracking-wider text-orange-600">Expert Query</span>
                                        </div>
                                    )}
                                    <div className="text-[14px] leading-relaxed text-[#1d1d1f] prose prose-sm max-w-none prose-p:my-0">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {interaction.content}
                                        </ReactMarkdown>
                                    </div>
                                    {interaction.code && (
                                        <div className="mt-4 rounded-xl bg-[#1e1e1e] border border-gray-800 p-4 font-mono text-[13px] text-gray-300 overflow-x-auto">
                                            <pre>{interaction.code}</pre>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Streaming */}
                        {isAiThinking && streamingContent && (
                            <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="w-12 flex-shrink-0 flex flex-col items-center pt-1">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-orange-50 border border-orange-100 animate-pulse text-orange-600">
                                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                    </div>
                                </div>
                                <div className="flex-1 p-5 rounded-2xl border bg-[#fffcf0] border-orange-100/50 shadow-sm">
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                                        <span className="text-[10px] uppercase font-bold tracking-wider text-orange-600">Expert is typing...</span>
                                    </div>
                                    <div className="text-[14px] leading-relaxed text-[#1d1d1f] prose prose-sm max-w-none">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {streamingContent}
                                        </ReactMarkdown>
                                        <span className="inline-block w-1 h-3.5 ml-1 bg-orange-500 animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Active Input */}
                        <div className="flex gap-4 mt-2" ref={bottomRef}>
                            <div className="w-12 flex-shrink-0 flex justify-center pt-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#1d1d1f] text-white text-[11px] font-bold">
                                    {stepCount.toString().padStart(2, '0')}
                                </div>
                            </div>
                            <div className="flex-1 relative group">
                                <div className="absolute -top-6 right-0 flex items-center gap-1.5 text-blue-600/80 transition-opacity duration-300">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20"></div>
                                        <Eye className="w-3 h-3 relative z-10" />
                                    </div>
                                    <span className="text-[10px] uppercase font-bold tracking-widest">AI Audit Active</span>
                                </div>

                                <div className="relative">
                                    <Textarea
                                        ref={inputRef}
                                        value={currentInput}
                                        onChange={(e) => setCurrentInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && e.ctrlKey) {
                                                handleNext();
                                            }
                                        }}
                                        placeholder={isAiThinking ? "AI is processing your logic..." : "Describe your reasoning here..."}
                                        className="w-full min-h-[120px] resize-none border-[#e5e5e5] focus-visible:ring-1 focus-visible:ring-blue-500/30 p-5 pb-14 text-[14px] text-[#1d1d1f] placeholder:text-[#86868b] bg-white rounded-2xl shadow-sm transition-all"
                                        disabled={isAiThinking}
                                    />

                                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setIsCodePanelOpen(!isCodePanelOpen)}
                                                className={cn(
                                                    "h-8 px-3 text-[11px] font-bold gap-2 transition-all rounded-full border border-transparent",
                                                    isCodePanelOpen || currentCode.trim().length > 0
                                                        ? "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100"
                                                        : "text-[#86868b] hover:bg-[#f2f2f7] hover:text-[#1d1d1f]"
                                                )}
                                            >
                                                <Code className="w-3.5 h-3.5" />
                                                {currentCode.trim().length > 0 ? "Modify Snippet" : "Add Code Snippet"}
                                            </Button>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] text-gray-300 font-mono hidden sm:inline">Ctrl+Enter</span>
                                            <Button
                                                size="sm"
                                                onClick={handleNext}
                                                disabled={isAiThinking || (!currentInput.trim() && !currentCode.trim())}
                                                className="h-8 px-4 bg-[#1d1d1f] hover:opacity-90 text-white rounded-full font-bold text-[11px] shadow-md transition-all active:scale-95"
                                            >
                                                <Send className="w-4 h-4 mr-2" />
                                                Submit Step
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Right Panel: Code Editor (Enhanced with Monaco) */}
                <AnimatePresence>
                    {isCodePanelOpen && (
                        <motion.aside
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "45%", opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="border-l bg-[#1e1e1e] flex flex-col h-full shadow-2xl z-20"
                        >
                            {/* Editor Header */}
                            <div className="h-10 flex items-center justify-between px-4 bg-[#1e1e1e] border-b border-white/5">
                                <div className="flex gap-1 overflow-x-auto no-scrollbar">
                                    {['python', 'javascript', 'typescript', 'java', 'cpp', 'go'].map((lang) => (
                                        <button
                                            key={lang}
                                            onClick={() => setLanguage(lang)}
                                            className={cn(
                                                "text-[10px] font-bold px-3 py-2 transition-all rounded-t-md whitespace-nowrap",
                                                language === lang
                                                    ? "text-white bg-white/5 border-b-2 border-blue-500"
                                                    : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                                            )}
                                        >
                                            {lang.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 text-gray-500 hover:text-white"
                                        onClick={() => {
                                            navigator.clipboard.writeText(currentCode);
                                            toast({ title: "Copied", description: "Code copied to clipboard" });
                                        }}
                                    >
                                        <Copy className="w-3 h-3" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 text-gray-500 hover:text-white"
                                        onClick={() => setCurrentCode('')}
                                    >
                                        <RefreshCw className="w-3 h-3" />
                                    </Button>
                                    <div className="h-3 w-px bg-white/10 mx-1" />
                                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                                        <Settings className="w-3 h-3" />
                                        v1.0
                                    </div>
                                </div>
                            </div>

                            {/* Monaco Editor Container */}
                            <div className="flex-1 relative overflow-hidden">
                                <Editor
                                    height="100%"
                                    language={language}
                                    theme="vs-dark"
                                    value={currentCode}
                                    onChange={(value) => setCurrentCode(value || '')}
                                    options={{
                                        minimap: { enabled: false },
                                        fontSize: 13,
                                        lineNumbers: 'on',
                                        roundedSelection: false,
                                        scrollBeyondLastLine: false,
                                        automaticLayout: true,
                                        padding: { top: 16 },
                                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                                        scrollbar: {
                                            vertical: 'visible',
                                            horizontal: 'visible',
                                            useShadows: false,
                                            verticalHasArrows: false,
                                            horizontalHasArrows: false,
                                            verticalScrollbarSize: 10,
                                            horizontalScrollbarSize: 10,
                                        },
                                        suggestOnTriggerCharacters: true,
                                        quickSuggestions: true,
                                        folding: true,
                                    }}
                                />
                            </div>

                            {/* Editor Footer */}
                            <div className="h-8 bg-black/50 text-gray-500 text-[10px] flex items-center px-4 justify-between border-t border-white/5 backdrop-blur-sm">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1">
                                        <Terminal className="w-3 h-3" />
                                        {language === 'python' ? 'Python 3.10' : 'Node.js v18'}
                                    </span>
                                    <span>{currentCode.length} characters</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center gap-1">
                                        <Check className="w-3 h-3 text-emerald-500" />
                                        Auto-save enabled
                                    </span>
                                </div>
                            </div>
                        </motion.aside>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ExpertInterview;
