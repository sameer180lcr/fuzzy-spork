import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  MessageSquare, 
  Clock,
  ChevronRight,
  Sparkles,
  CheckCircle2
} from "lucide-react";

const questions = [
  {
    id: 1,
    question: "Tell me about your experience with machine learning frameworks like PyTorch or TensorFlow.",
    category: "Technical Skills",
    duration: "2-3 min",
  },
  {
    id: 2,
    question: "Describe a complex ML system you've deployed to production. What challenges did you face?",
    category: "System Design",
    duration: "3-4 min",
  },
  {
    id: 3,
    question: "How do you approach debugging a model that's performing well in training but poorly in production?",
    category: "Problem Solving",
    duration: "2-3 min",
  },
];

const Interview = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  const handleNextQuestion = () => {
    setCompletedQuestions([...completedQuestions, currentQuestion]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="h-16 border-b border-border flex items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
              <span className="text-background font-bold text-sm">H</span>
            </div>
            <span className="font-semibold tracking-tight">Hirely</span>
          </div>
          <div className="w-px h-6 bg-border" />
          <Badge variant="secondary" className="gap-1.5">
            <Sparkles className="w-3 h-3" />
            AI Interview
          </Badge>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Est. 15 min remaining</span>
          </div>
          <Button variant="outline" size="sm">
            End Interview
          </Button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Main Video Area */}
        <div className="flex-1 p-8 flex flex-col">
          <div className="flex-1 bg-card rounded-2xl border border-border overflow-hidden relative">
            {/* AI Interviewer Avatar */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-accent/30">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-foreground mx-auto mb-4 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-background" />
                </div>
                <p className="text-lg font-medium">AI Interviewer</p>
                <p className="text-sm text-muted-foreground">Speaking...</p>
              </div>
            </div>
            
            {/* User Video Preview */}
            <div className="absolute bottom-6 right-6 w-48 h-36 rounded-xl bg-secondary border border-border overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                {isVideoOff ? (
                  <VideoOff className="w-6 h-6 text-muted-foreground" />
                ) : (
                  <span className="text-sm text-muted-foreground">Your camera</span>
                )}
              </div>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center justify-center gap-4 py-6">
            <Button
              variant={isMuted ? "destructive" : "secondary"}
              size="icon"
              className="w-12 h-12 rounded-full"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>
            <Button
              variant={isVideoOff ? "destructive" : "secondary"}
              size="icon"
              className="w-12 h-12 rounded-full"
              onClick={() => setIsVideoOff(!isVideoOff)}
            >
              {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </Button>
            <Button
              variant={isRecording ? "default" : "outline"}
              className="gap-2"
              onClick={() => setIsRecording(!isRecording)}
            >
              <MessageSquare className="w-4 h-4" />
              {isRecording ? "Recording..." : "Start Response"}
            </Button>
          </div>
        </div>
        
        {/* Question Panel */}
        <div className="w-96 border-l border-border bg-card p-6 flex flex-col">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Question Progress</span>
              <span className="text-sm font-medium">{completedQuestions.length + 1} of {questions.length}</span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${((completedQuestions.length + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="flex-1 space-y-4">
            {questions.map((q, index) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border transition-all duration-200 ${
                  index === currentQuestion
                    ? "border-primary bg-primary/5"
                    : completedQuestions.includes(index)
                    ? "border-border bg-secondary/30"
                    : "border-border"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {q.category}
                  </Badge>
                  {completedQuestions.includes(index) && (
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  )}
                </div>
                <p className={`text-sm ${
                  index === currentQuestion ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {q.question}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Suggested: {q.duration}
                </p>
              </motion.div>
            ))}
          </div>
          
          <Button 
            className="w-full mt-6"
            onClick={handleNextQuestion}
            disabled={currentQuestion >= questions.length - 1 && completedQuestions.length === questions.length - 1}
          >
            {currentQuestion >= questions.length - 1 ? "Complete Interview" : "Next Question"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Interview;
