import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, SkipForward, ChevronRight, Brain, Code, Terminal, Maximize2, Minimize2, PanelRightClose, PanelRightOpen, Copy, Check, CheckCircle2, RefreshCw, Eye, Send, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { OllamaService, OLLAMA_MODELS } from '@/services/ollama';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// --- Configuration & Mock Data ---

interface Question {
    id: number;
    text: string;
    category: string;
    difficulty: "DEPTH" | "ANALYSIS" | "CONCEPTUAL" | "SYSTEMS";
}

const FALLBACK_QUESTION: Question = {
    id: 1,
    text: "Describe the architectural bottlenecks in scaling Transformer models beyond 100B parameters.",
    category: "System Design",
    difficulty: "DEPTH"
};

const CHALLENGE_TEMPLATES = [
    "What's the theoretical basis for this decision?",
    "How does this scale with sequence length?",
    "Why did you choose this over a sparse attention mechanism?",
    "Can you explain the backpropagation flow in this specific component?",
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

const ExpertInterview = () => {
    const [currentQuestion, setCurrentQuestion] = useState<Question>(FALLBACK_QUESTION);
    const [interactions, setInteractions] = useState<Interaction[]>([]);

    // Inputs
    const [currentInput, setCurrentInput] = useState('');
    const [currentCode, setCurrentCode] = useState('');

    // State
    const [isCodePanelOpen, setIsCodePanelOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState(37 * 60);
    const [isAiThinking, setIsAiThinking] = useState(false);
    const [stepCount, setStepCount] = useState(1);
    const [sessionActive, setSessionActive] = useState(true);
    const [streamingContent, setStreamingContent] = useState('');
    const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(true);
    const [hasInterviewStarted, setHasInterviewStarted] = useState(false);

    const { toast } = useToast();
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const codeEditorRef = useRef<HTMLTextAreaElement>(null);

    // Generate fresh question on mount
    useEffect(() => {
        const fetchQuestion = async () => {
            setIsGeneratingQuestion(true);
            try {
                // Determine category randomly
                const topics = ["LLM Inference Optimization", "Transformer Architecture", "Distributed Training Kernels", "Quantization Theory"];
                const topic = topics[Math.floor(Math.random() * topics.length)];

                const prompt = `Generate a single, extremely difficult, senior-level interview question about ${topic}. 
                Output ONLY the question text. Do not include preamble.`;

                let qText = "";
                // Use REASONER for high quality question generation
                await OllamaService.generateStreaming(prompt, OLLAMA_MODELS.REASONER, (chunk) => {
                    qText += chunk;
                }, { temperature: 0.9 });

                // Clean up result if needed (remove quotes etc)
                qText = qText.replace(/^"|"$/g, '').trim();

                if (qText.length > 10) {
                    setCurrentQuestion({
                        id: Date.now(),
                        text: qText,
                        category: topic,
                        difficulty: "DEPTH"
                    });
                }
            } catch (e) {
                console.error("Failed to generate init question", e);
                // Fallback remains
            } finally {
                setIsGeneratingQuestion(false);
            }
        };
        fetchQuestion();
    }, []);

    // --- Effects ---

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
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
- "Walk me through how you would optimize this for a memory-constrained environment?"
- "What edge cases should we consider in this approach?"
- "How would this solution scale with 10x more data?"
- "What alternative approaches did you consider and why did you choose this one?"

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
        // Instead of skipping through a list, we generate a NEW question dynamically
        setIsGeneratingQuestion(true);
        setInteractions([]); // Clear chat
        setStepCount(1);
        setCurrentCode('');
        setCurrentInput('');
        setTimeLeft(37 * 60); // Reset timer?

        // Re-run generation logic (duplicated but functional for now)
        const fetchQuestion = async () => {
            try {
                const topics = ["LLM Inference Optimization", "Transformer Architecture", "Distributed Training Kernels", "Quantization Theory"];
                const topic = topics[Math.floor(Math.random() * topics.length)];

                const prompt = `Generate a single, extremely difficult, senior-level interview question about ${topic}. Output ONLY the question text.`;

                let qText = "";
                await OllamaService.generateStreaming(prompt, OLLAMA_MODELS.REASONER, (chunk) => {
                    qText += chunk;
                }, { temperature: 0.95 });

                qText = qText.replace(/^"|"$/g, '').trim();

                if (qText.length > 10) {
                    setCurrentQuestion({
                        id: Date.now(),
                        text: qText,
                        category: topic,
                        difficulty: "DEPTH"
                    });
                }
            } catch (e) {
                console.error("Failed to regen question", e);
            } finally {
                setIsGeneratingQuestion(false);
            }
        };
        fetchQuestion();
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
                <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <Brain className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Expert Interview Preparation</h1>
                    
                    <div className="text-left space-y-6 mb-8">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                                <span className="text-blue-600 font-medium">1</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Technical Challenge</h3>
                                <p className="text-gray-600 mt-1">You'll be presented with a complex technical problem to solve. Think through your approach carefully.</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                                <span className="text-blue-600 font-medium">2</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">In-Depth Discussion</h3>
                                <p className="text-gray-600 mt-1">Be prepared to explain your reasoning, discuss trade-offs, and answer follow-up questions.</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                                <span className="text-blue-600 font-medium">3</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Time Management</h3>
                                <p className="text-gray-600 mt-1">The session is timed. Use your time wisely to demonstrate your problem-solving skills.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8">
                        <Button 
                            size="lg" 
                            className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg font-medium"
                            onClick={() => setHasInterviewStarted(true)}
                        >
                            <span>I'm Ready to Begin</span>
                            <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-6">
                        The interview will begin as soon as you click the button above.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-white flex flex-col font-sans text-gray-900 overflow-hidden">
            {/* 1. Header is now just the Task Bar */}
            <header className="flex-shrink-0 z-20 relative">
                {/* Task Question Bar */}
                <div className="bg-blue-50/50 border-b border-blue-100 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 mr-1 hover:bg-blue-100" 
                            onClick={() => window.history.back()}
                            title="Go back"
                        >
                            <ArrowLeft className="h-4 w-4 text-blue-700" />
                        </Button>
                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded whitespace-nowrap">
                            TASK 1/1
                        </span>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-lg font-medium text-gray-800 break-words" title={currentQuestion.text}>
                                {isGeneratingQuestion ? (
                                    <span className="flex items-center gap-2 animate-pulse text-gray-500 italic">
                                        <Brain className="w-4 h-4 flex-shrink-0" /> 
                                        <span className="truncate">Generating expert challenge...</span>
                                    </span>
                                ) : (
                                    <span className="break-words">{currentQuestion.text}</span>
                                )}
                            </h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                        {/* Timer Moved Here */}
                        <div className="font-mono text-sm text-gray-500 flex items-center gap-2 mr-2">
                            <Clock className="w-4 h-4" />
                            {formatTime(timeLeft)}
                        </div>

                        <div className="h-4 w-px bg-gray-300 mx-1" />

                        <Button variant="ghost" size="sm" onClick={handleSkipTask} className="text-gray-500 h-8">
                            <SkipForward className="w-4 h-4 mr-2" /> Skip
                        </Button>
                        <Button size="sm" onClick={handleNext} disabled={isAiThinking} className="bg-blue-600 hover:bg-blue-700 h-8 min-w-[100px]">
                            {isAiThinking ? "Saving..." : "Next"} <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                </div>
            </header>

            {/* 2. Main Layout (Flex with Split Pane) */}
            <div className="flex-1 flex overflow-hidden relative">

                {/* Left Panel: Conversation Thread */}
                <main className="flex-1 overflow-y-auto px-6 py-8 pb-32">
                    {/* pb-32 to allow space for the bottom input area if it overlaps, though we'll structure it to flow naturally */}
                    <div className="max-w-4xl mx-auto flex flex-col">
                        {/* Header for formatting */}
                        <div className="flex items-center mb-6 text-xs font-bold text-gray-400 tracking-wider">
                            <div className="w-16 flex-shrink-0 text-center">#</div>
                            <div>REASONING</div>
                        </div>

                        {/* Interaction History */}
                        {interactions.map((interaction) => (
                            <div key={interaction.id} className="flex gap-4 mb-8 group animate-in fade-in slide-in-from-bottom-2 duration-500">
                                {/* Left Column Label */}
                                <div className="w-16 flex-shrink-0 flex flex-col items-center pt-1 gap-1">
                                    {interaction.type === 'AI' ? (
                                        <>
                                            <div className="bg-emerald-100 p-1.5 rounded-lg shadow-sm border border-emerald-200">
                                                <Eye className="w-4 h-4 text-emerald-700" />
                                            </div>
                                            <Badge variant="outline" className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border-emerald-200 h-fit py-0 px-1.5">
                                                WHY?
                                            </Badge>
                                        </>
                                    ) : (
                                        <span className="text-xs font-mono text-gray-400 font-medium">
                                            {interaction.label}
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 space-y-3">
                                    {/* Text Content - Rendered with Markdown */}
                                    <div className="text-base leading-relaxed text-gray-800 prose prose-emerald prose-sm max-w-none prose-p:my-1 prose-headings:my-2 prose-code:text-emerald-600 prose-code:bg-emerald-50 prose-code:px-1 prose-code:rounded">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {interaction.content}
                                        </ReactMarkdown>
                                    </div>
                                    {/* Code Snippet (if exists) */}
                                    {interaction.code && (
                                        <div className="rounded-lg bg-gray-950 border border-gray-800 p-4 font-mono text-sm text-gray-300 relative group/code overflow-x-auto">
                                            <pre>{interaction.code}</pre>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Streaming AI Response */}
                        {isAiThinking && streamingContent && (
                            <div className="flex gap-4 mb-8 group animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <div className="w-16 flex-shrink-0 flex flex-col items-center pt-1 gap-1">
                                    <div className="bg-blue-100 p-1.5 rounded-lg shadow-sm border border-blue-200 animate-pulse">
                                        <Eye className="w-4 h-4 text-blue-700" />
                                    </div>
                                    <Badge variant="outline" className="text-[9px] font-bold text-blue-700 bg-blue-50 border-blue-200 h-fit py-0 px-1.5 animate-pulse">
                                        WHY?
                                    </Badge>
                                </div>
                                <div className="flex-1 space-y-3">
                                    <div className="text-base leading-relaxed text-gray-800 prose prose-emerald prose-sm max-w-none prose-p:my-1 prose-headings:my-2 prose-code:text-emerald-600 prose-code:bg-emerald-50 prose-code:px-1 prose-code:rounded">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {streamingContent}
                                        </ReactMarkdown>
                                        <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-emerald-500 animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Active Input Area (The "Current" Step) */}
                        <div className="flex gap-4 mb-4" ref={bottomRef}>
                            <div className="w-16 flex-shrink-0 flex justify-center pt-3">
                                <span className="text-xs font-mono text-gray-900 font-bold">
                                    {stepCount.toString().padStart(2, '0')}
                                </span>
                            </div>
                            <div className="flex-1 relative group">
                                {/* AI Observation Indicator - Always visible */}
                                <div className="absolute -top-6 right-0 flex items-center gap-1.5 text-emerald-600/80 transition-opacity duration-300">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
                                        <Eye className="w-3.5 h-3.5 relative z-10" />
                                    </div>
                                    <span className="text-[10px] uppercase font-bold tracking-wider">AI Observing</span>
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
                                        placeholder={isAiThinking ? "AI is processing..." : "Type your reasoning here..."}
                                        className="w-full min-h-[80px] resize-none border-0 ring-1 ring-gray-200 focus-visible:ring-2 focus-visible:ring-emerald-500/50 p-4 pb-12 text-base text-gray-800 placeholder:text-gray-300 bg-white rounded-xl shadow-sm transition-all shadow-emerald-500/0 focus:shadow-emerald-500/10"
                                        disabled={isAiThinking}
                                    />

                                    {/* Input Actions Bar */}
                                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setIsCodePanelOpen(!isCodePanelOpen)}
                                                className={cn(
                                                    "h-7 px-2 text-xs font-medium gap-1.5 transition-colors",
                                                    isCodePanelOpen || currentCode.trim().length > 0
                                                        ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                                        : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                                                )}
                                            >
                                                <Code className="w-3.5 h-3.5" />
                                                {currentCode.trim().length > 0 ? "Edit Code" : "Add Code"}
                                            </Button>
                                            {currentCode.trim().length > 0 && (
                                                <span className="text-[10px] text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded-sm">
                                                    {currentCode.split('\n').length} lines attached
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] text-gray-300 font-medium hidden sm:inline">Ctrl + Enter</span>
                                            <Button
                                                size="sm"
                                                onClick={handleNext}
                                                disabled={isAiThinking || (!currentInput.trim() && !currentCode.trim())}
                                                className="h-7 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm shadow-emerald-200 transition-all hover:shadow-emerald-300"
                                            >
                                                <Send className="w-3.5 h-3.5 mr-1.5" />
                                                Send
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Right Panel: Code Editor (Collapsible) */}
                <AnimatePresence>
                    {isCodePanelOpen && (
                        <motion.aside
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "45%", opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="border-l bg-gray-50 flex flex-col h-full shadow-inner z-10"
                        >
                            <div className="h-10 border-b flex items-center justify-between px-4 bg-white">
                                <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                                    <Terminal className="w-4 h-4" />
                                    <span>CODE EDITOR</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setCurrentCode('')}>
                                        <RefreshCw className="w-3 h-3" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex-1 relative bg-[#1e1e1e]">
                                <textarea
                                    ref={codeEditorRef}
                                    value={currentCode}
                                    onChange={(e) => setCurrentCode(e.target.value)}
                                    className="w-full h-full bg-transparent text-gray-300 font-mono text-sm p-4 resize-none focus:outline-none leading-normal"
                                    placeholder="// Write your implementation here...
                            
def attention(query, key, value):
    pass"
                                    spellCheck={false}
                                />
                            </div>

                            <div className="h-8 bg-black text-gray-500 text-[10px] flex items-center px-4 justify-between border-t border-gray-800">
                                <span>Python 3.10</span>
                                <span>{currentCode.length} chars</span>
                            </div>
                        </motion.aside>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ExpertInterview;
