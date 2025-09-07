import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Trophy,
  RotateCcw,
  Target,
  Shield,
  Brain,
  Zap,
  Users
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const GamePlay = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes
  const [gameCompleted, setGameCompleted] = useState(false);

  // Mock game data
  const games = {
    'phishing-quiz': {
      title: 'Phishing Detection Challenge',
      icon: Shield,
      color: 'from-blue-500 to-cyan-500',
      difficulty: 'Beginner',
      questions: [
        {
          id: 1,
          question: "Which of the following is a common sign of a phishing email?",
          options: [
            "Generic greetings like 'Dear Customer'",
            "Urgent language requiring immediate action",
            "Suspicious links or attachments",
            "All of the above"
          ],
          correctAnswer: 3,
          explanation: "All of these are common indicators of phishing emails. Legitimate organizations typically use personalized greetings, avoid creating false urgency, and use secure communication methods."
        },
        {
          id: 2,
          question: "What should you do if you receive a suspicious email asking for your password?",
          options: [
            "Reply with your password immediately",
            "Click the link to verify your account",
            "Delete the email and report it to IT",
            "Forward it to your colleagues"
          ],
          correctAnswer: 2,
          explanation: "Never provide passwords via email. Legitimate organizations will never ask for passwords through email. Always delete suspicious emails and report them to your IT department."
        },
        {
          id: 3,
          question: "Which URL is most likely to be legitimate for a banking website?",
          options: [
            "http://your-bank-security.com",
            "https://yourbank.com",
            "https://your-bank.secure-login.net",
            "http://yourbank-verification.org"
          ],
          correctAnswer: 1,
          explanation: "Legitimate banking websites use HTTPS encryption and typically use the bank's official domain name without additional suspicious subdomains or different top-level domains."
        }
      ]
    },
    'security-scenario': {
      title: 'Incident Response Simulator',
      icon: Target,
      color: 'from-red-500 to-orange-500',
      difficulty: 'Advanced',
      questions: [
        {
          id: 1,
          question: "Your organization detects unusual network traffic at 2 AM. What is your first priority?",
          options: [
            "Immediately shut down all systems",
            "Document the incident and assess the scope",
            "Wait until morning to investigate",
            "Notify all employees immediately"
          ],
          correctAnswer: 1,
          explanation: "The first step in incident response is to document what you observe and assess the scope of the potential incident before taking any containment actions."
        }
      ]
    },
    'threat-hunt': {
      title: 'Threat Hunting Detective',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      difficulty: 'Expert',
      questions: [
        {
          id: 1,
          question: "When analyzing network logs, which pattern suggests potential data exfiltration?",
          options: [
            "Large amounts of data leaving the network during off-hours",
            "Multiple failed login attempts",
            "High CPU usage on servers",
            "Frequent password changes"
          ],
          correctAnswer: 0,
          explanation: "Unusual data transfer patterns, especially large volumes of data leaving the network during off-hours, can indicate data exfiltration attempts."
        }
      ]
    },
    'password-strength': {
      title: 'Password Security Master',
      icon: Zap,
      color: 'from-green-500 to-teal-500',
      difficulty: 'Beginner',
      questions: [
        {
          id: 1,
          question: "Which password is the strongest?",
          options: [
            "Password123!",
            "MyDog'sName2023",
            "p@$$w0rd",
            "Tr0ub4dor&3"
          ],
          correctAnswer: 3,
          explanation: "A strong password should be long, include a mix of uppercase and lowercase letters, numbers, and special characters, while avoiding common words or patterns."
        }
      ]
    },
    'social-engineering': {
      title: 'Social Engineering Defense',
      icon: Users,
      color: 'from-yellow-500 to-amber-500',
      difficulty: 'Intermediate',
      questions: [
        {
          id: 1,
          question: "Someone calls claiming to be from IT and asks for your login credentials to 'fix your account'. What should you do?",
          options: [
            "Provide the credentials since they're from IT",
            "Ask for their employee ID and verify independently",
            "Hang up and call IT through official channels",
            "Ask them to email you the request"
          ],
          correctAnswer: 2,
          explanation: "Never provide credentials over the phone. Always verify the caller's identity through official channels before providing any sensitive information."
        }
      ]
    }
  };

  const currentGame = games[gameId as keyof typeof games];

  useEffect(() => {
    if (!currentGame) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          setGameCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentGame]);

  if (!currentGame) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto text-center py-12">
          <h1 className="text-2xl font-bold text-muted-foreground mb-4">Game Not Found</h1>
          <Button onClick={() => navigate('/games')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Games
          </Button>
        </div>
      </div>
    );
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex.toString());
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = { ...answers, [currentQuestion]: selectedAnswer };
      setAnswers(newAnswers);
      
      // Check if answer is correct
      if (parseInt(selectedAnswer) === currentGame.questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }

      if (currentQuestion < currentGame.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setGameCompleted(true);
      }
    }
  };

  const handleRestartGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers({});
    setScore(0);
    setTimeRemaining(600);
    setGameCompleted(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const IconComponent = currentGame.icon;

  if (gameCompleted) {
    const percentage = Math.round((score / currentGame.questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/games')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Games
          </Button>

          <Card className="text-center">
            <CardHeader>
              <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${currentGame.color} rounded-full flex items-center justify-center mb-4`}>
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-3xl">Game Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-primary">{score}</div>
                  <div className="text-muted-foreground">Correct Answers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">{percentage}%</div>
                  <div className="text-muted-foreground">Score</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">{formatTime(600 - timeRemaining)}</div>
                  <div className="text-muted-foreground">Time Taken</div>
                </div>
              </div>

              <Progress value={percentage} className="h-4" />

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Performance Summary</h3>
                {currentGame.questions.map((question, index) => {
                  const userAnswer = parseInt(answers[index] || '-1');
                  const isCorrect = userAnswer === question.correctAnswer;
                  
                  return (
                    <div key={question.id} className="flex items-center space-x-3 text-left">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <span className="flex-1">Question {index + 1}</span>
                      <Badge variant={isCorrect ? "default" : "destructive"}>
                        {isCorrect ? "Correct" : "Incorrect"}
                      </Badge>
                    </div>
                  );
                })}
              </div>

              <div className="flex space-x-4 justify-center">
                <Button onClick={handleRestartGame}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Play Again
                </Button>
                <Button variant="outline" onClick={() => navigate('/games')}>
                  Back to Games
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const question = currentGame.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / currentGame.questions.length) * 100;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/games')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Games
        </Button>

        {/* Game Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${currentGame.color} rounded-lg flex items-center justify-center`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle>{currentGame.title}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Question {currentQuestion + 1} of {currentGame.questions.length}</span>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatTime(timeRemaining)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <Badge className={`
                ${currentGame.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-500 border-green-500/20' : ''}
                ${currentGame.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : ''}
                ${currentGame.difficulty === 'Advanced' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : ''}
                ${currentGame.difficulty === 'Expert' ? 'bg-red-500/10 text-red-500 border-red-500/20' : ''}
              `}>
                {currentGame.difficulty}
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>
        </Card>

        {/* Question */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{question.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border transition-all ${
                    selectedAnswer === index.toString()
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index.toString()
                        ? 'border-primary bg-primary text-white'
                        : 'border-muted-foreground'
                    }`}>
                      <span className="text-sm font-medium">
                        {String.fromCharCode(65 + index)}
                      </span>
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Score: {score}/{currentQuestion + (selectedAnswer !== null ? 1 : 0)}
              </div>
              <Button 
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
              >
                {currentQuestion < currentGame.questions.length - 1 ? (
                  <>
                    Next Question
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                ) : (
                  <>
                    Complete Game
                    <Trophy className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GamePlay;