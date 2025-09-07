import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SeverityBadge } from '@/components/ui/severity-badge';
import { scannerApi, toolsApi } from '@/lib/api';
import { 
  Activity, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Search,
  TrendingUp,
  FileText,
  ArrowRight
} from 'lucide-react';

// Get recent scans from localStorage or use mock data
const getRecentScans = () => {
  try {
    const stored = localStorage.getItem('recentScans');
    if (stored) {
      const scans = JSON.parse(stored);
      return scans.slice(0, 10); // Show last 10 scans
    }
  } catch (error) {
    console.error('Error loading recent scans:', error);
  }
  
  // Fallback to mock data
  return [
    {
      id: 'scan-1',
      target: 'example.com',
      tool: 'ssl_check',
      status: 'completed',
      findings_count: 2,
      severity: 'MEDIUM' as const,
      created_at: '2024-01-20T10:30:00Z'
    },
    {
      id: 'scan-2', 
      target: '192.168.1.1',
      tool: 'nmap',
      status: 'running',
      progress: 67,
      created_at: '2024-01-20T09:15:00Z'
    },
    {
      id: 'scan-3',
      target: 'myapp.com',
      tool: 'headers_audit',
      status: 'completed',
      findings_count: 4,
      severity: 'HIGH' as const,
      created_at: '2024-01-20T08:45:00Z'
    }
  ];
};

const stats = [
  {
    title: 'Total Scans',
    value: '247',
    change: '+12%',
    icon: Activity,
    description: 'Scans completed this month'
  },
  {
    title: 'Active Scans',
    value: '3',
    change: '2 queued',
    icon: Clock,
    description: 'Currently running or queued'
  },
  {
    title: 'Critical Findings',
    value: '8',
    change: '-25%',
    icon: AlertTriangle,
    description: 'High priority security issues'
  },
  {
    title: 'Security Score',
    value: '94',
    change: '+3%',
    icon: Shield,
    description: 'Overall security posture'
  }
];

export default function Dashboard() {
  const recentScans = getRecentScans();
  
  const { data: tools, isLoading: toolsLoading } = useQuery({
    queryKey: ['tools'],
    queryFn: async () => {
      const response = await toolsApi.getTools();
      return response.data || [];
    }
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'running': return 'text-warning';
      case 'failed': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'running': return Clock;
      case 'failed': return AlertTriangle;
      default: return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Security Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Monitor your security posture and recent scan activities
            </p>
          </div>
          <Link to="/scan">
            <Button className="bg-gradient-primary hover:opacity-90">
              <Search className="mr-2 h-4 w-4" />
              Run New Scan
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card/50 border-border/50 hover:bg-card/80 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <div className="flex items-baseline space-x-2">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <span className={`text-xs ${stat.change.startsWith('+') ? 'text-success' : stat.change.startsWith('-') ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.description}
                    </p>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Scans */}
          <div className="lg:col-span-2">
            <Card className="bg-card/50 border-border/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Scans</CardTitle>
                  <CardDescription>Your latest security scans and their status</CardDescription>
                </div>
                <Link to="/scans">
                  <Button variant="outline" size="sm">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentScans.map((scan) => {
                  const StatusIcon = getStatusIcon(scan.status);
                  return (
                    <div
                      key={scan.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${getStatusColor(scan.status)}`}>
                          <StatusIcon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium">{scan.target}</p>
                            <Badge variant="outline" className="text-xs">
                              {scan.tool}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(scan.created_at)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {scan.status === 'completed' && scan.findings_count !== undefined && (
                          <>
                            <span className="text-sm text-muted-foreground">
                              {scan.findings_count} findings
                            </span>
                            {scan.severity && <SeverityBadge severity={scan.severity} />}
                          </>
                        )}
                        {scan.status === 'running' && scan.progress && (
                          <div className="flex items-center space-x-2">
                            <div className="w-16 h-2 bg-muted rounded-full">
                              <div 
                                className="h-full bg-primary rounded-full transition-all duration-300"
                                style={{ width: `${scan.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {scan.progress}%
                            </span>
                          </div>
                        )}
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/scan/${scan.id}`}>
                            View
                          </Link>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Fast access to common tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/scan" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Search className="mr-3 h-4 w-4" />
                    Run Security Scan
                  </Button>
                </Link>
                <Link to="/tools" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Activity className="mr-3 h-4 w-4" />
                    Browse Tools
                  </Button>
                </Link>
                <Link to="/articles" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-3 h-4 w-4" />
                    Security Articles
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Available Tools Summary */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Available Tools</span>
                </CardTitle>
                <CardDescription>Security tools ready for use</CardDescription>
              </CardHeader>
              <CardContent>
                {toolsLoading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {tools?.slice(0, 4).map((tool) => (
                      <div key={tool.name} className="flex items-center justify-between py-2">
                        <div>
                          <p className="font-medium text-sm">{tool.name}</p>
                          <p className="text-xs text-muted-foreground">{tool.category}</p>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          Ready
                        </Badge>
                      </div>
                    ))}
                    <Link to="/tools">
                      <Button variant="ghost" size="sm" className="w-full mt-2">
                        View All Tools
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}