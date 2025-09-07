import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Gamepad2, 
  Trophy, 
  Target, 
  Brain, 
  Shield, 
  Zap,
  Star,
  Clock,
  Users,
  Award,
  Play,
  RotateCcw
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Games = () => {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [gameProgress, setGameProgress] = useState({
    'phishing-quiz': 75,
    'security-scenario': 60,
    'threat-hunt': 40,
    'password-strength': 90,
    'social-engineering': 55
  });

  const games = [
    {
      id: 'phishing-quiz',
      title: 'Phishing Detection Challenge',
      description: 'Test your ability to identify phishing emails and malicious websites in this interactive quiz.',
      category: 'Email Security',
      difficulty: 'Beginner',
      duration: '10 min',
      players: '1,247',
      rating: 4.8,
      icon: Shield,
      color: 'from-blue-500 to-cyan-500',
      questions: 15,
      completed: 11
    },
    {
      id: 'security-scenario',
      title: 'Incident Response Simulator',
      description: 'Navigate through realistic cybersecurity incidents and make critical decisions under pressure.',
      category: 'Incident Response',
      difficulty: 'Advanced',
      duration: '25 min',
      players: '892',
      rating: 4.9,
      icon: Target,
      color: 'from-red-500 to-orange-500',
      questions: 20,
      completed: 12
    },
    {
      id: 'threat-hunt',
      title: 'Threat Hunting Detective',
      description: 'Use forensic analysis skills to track down advanced persistent threats in network logs.',
      category: 'Threat Intelligence',
      difficulty: 'Expert',
      duration: '35 min',
      players: '456',
      rating: 4.7,
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      questions: 25,
      completed: 10
    },
    {
      id: 'password-strength',
      title: 'Password Security Master',
      description: 'Learn to create and evaluate strong passwords while understanding common attack methods.',
      category: 'Authentication',
      difficulty: 'Beginner',
      duration: '8 min',
      players: '2,103',
      rating: 4.6,
      icon: Zap,
      color: 'from-green-500 to-teal-500',
      questions: 12,
      completed: 11
    },
    {
      id: 'social-engineering',
      title: 'Social Engineering Defense',
      description: 'Practice identifying and responding to various social engineering attack techniques.',
      category: 'Social Engineering',
      difficulty: 'Intermediate',
      duration: '18 min',
      players: '734',
      rating: 4.5,
      icon: Users,
      color: 'from-yellow-500 to-amber-500',
      questions: 18,
      completed: 10
    }
  ];

  const achievements = [
    { id: 1, title: 'Phishing Expert', description: 'Completed 5 phishing quizzes', earned: true },
    { id: 2, title: 'Incident Commander', description: 'Resolved 10 security incidents', earned: true },
    { id: 3, title: 'Threat Hunter', description: 'Found 15 hidden threats', earned: false },
    { id: 4, title: 'Security Guru', description: 'Completed all game categories', earned: false }
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah Chen', score: 2450, avatar: 'SC' },
    { rank: 2, name: 'Mike Rodriguez', score: 2380, avatar: 'MR' },
    { rank: 3, name: 'Jennifer Park', score: 2290, avatar: 'JP' },
    { rank: 4, name: 'David Kumar', score: 2210, avatar: 'DK' },
    { rank: 5, name: 'Lisa Thompson', score: 2180, avatar: 'LT' }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Advanced': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'Expert': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getProgressPercentage = (gameId: string) => {
    const game = games.find(g => g.id === gameId);
    return game ? Math.round((game.completed / game.questions) * 100) : 0;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <Gamepad2 className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Security Games</h1>
            <p className="text-muted-foreground">Learn cybersecurity through interactive challenges and simulations</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Games Section */}
          <div className="lg:col-span-3 space-y-6">
            {/* Games Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {games.map((game) => {
                const IconComponent = game.icon;
                const progress = getProgressPercentage(game.id);
                
                return (
                  <Card key={game.id} className="hover:shadow-lg transition-all duration-200 group">
                    <CardHeader>
                      <div className={`w-full h-32 bg-gradient-to-br ${game.color} rounded-lg flex items-center justify-center mb-4`}>
                        <IconComponent className="h-12 w-12 text-white" />
                      </div>
                      
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {game.title}
                        </CardTitle>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{game.rating}</span>
                        </div>
                      </div>
                      
                      <CardDescription>{game.description}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Progress Bar */}
                      {progress > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{game.completed}/{game.questions} questions</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      )}

                      {/* Game Stats */}
                      <div className="flex items-center justify-between text-sm">
                        <Badge className={getDifficultyColor(game.difficulty)}>
                          {game.difficulty}
                        </Badge>
                        <div className="flex items-center space-x-3 text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{game.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{game.players}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <Button className="flex-1" asChild>
                          <Link to={`/games/${game.id}`}>
                            <Play className="h-4 w-4 mr-2" />
                            {progress > 0 ? 'Continue' : 'Start Game'}
                          </Link>
                        </Button>
                        {progress > 0 && (
                          <Button variant="outline" size="sm">
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Player Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <span>Your Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">1,847</div>
                    <div className="text-xs text-muted-foreground">Total Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">23</div>
                    <div className="text-xs text-muted-foreground">Games Played</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">8</div>
                    <div className="text-xs text-muted-foreground">Achievements</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">#12</div>
                    <div className="text-xs text-muted-foreground">Global Rank</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.id} 
                      className={`p-3 rounded-lg border ${
                        achievement.earned 
                          ? 'bg-primary/5 border-primary/20' 
                          : 'bg-muted/50 border-muted'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`mt-0.5 ${achievement.earned ? 'text-primary' : 'text-muted-foreground'}`}>
                          <Trophy className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${achievement.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {achievement.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Leaderboard</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((player) => (
                    <div key={player.rank} className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                        {player.rank}
                      </div>
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium">
                        {player.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{player.name}</p>
                        <p className="text-xs text-muted-foreground">{player.score.toLocaleString()} pts</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;