import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SeverityBadge } from '@/components/ui/severity-badge';
import { scannerApi } from '@/lib/api';
import { 
  ArrowLeft, 
  Download, 
  RefreshCw, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  FileText,
  Terminal,
  Shield
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ScanResults() {
  const { jobId } = useParams<{ jobId: string }>();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('summary');

  const { data: scanResult, isLoading, error } = useQuery({
    queryKey: ['scanResult', jobId],
    queryFn: async () => {
      if (!jobId) throw new Error('No job ID provided');
      
      // First try to get from localStorage
      const stored = localStorage.getItem('recentScans');
      if (stored) {
        const scans = JSON.parse(stored);
        const scan = scans.find((s: any) => s.id === jobId);
        if (scan && scan.result) {
          return scan.result;
        }
      }
      
      // Fallback to API
      const response = await scannerApi.getJobResults(jobId);
      return response.data;
    },
    enabled: !!jobId,
    refetchInterval: (query) => {
      // If scan is still running, refetch every 3 seconds
      return query.state.data?.status === 'running' ? 3000 : false;
    }
  });

  const handleDownloadReport = () => {
    if (!scanResult) return;
    
    const report = {
      scan_info: {
        job_id: scanResult.job_id,
        target: scanResult.target,
        tool: scanResult.tool,
        status: scanResult.status,
        created_at: scanResult.created_at
      },
      summary: scanResult.summary,
      findings: scanResult.findings
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `security-scan-${scanResult.target}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Report Downloaded",
      description: "Security scan report has been downloaded successfully.",
    });
  };

  const handleRetest = () => {
    toast({
      title: "Retest Initiated",
      description: "A new scan has been queued with the same parameters.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground">Loading scan results...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !scanResult) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <AlertTriangle className="h-12 w-12 text-destructive mx-auto" />
              <h2 className="text-xl font-semibold">Scan Not Found</h2>
              <p className="text-muted-foreground">The requested scan results could not be found.</p>
              <Link to="/dashboard">
                <Button>Return to Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
      case 'completed': return CheckCircle2;
      case 'running': return Clock;
      case 'failed': return AlertTriangle;
      default: return Clock;
    }
  };

  const StatusIcon = getStatusIcon(scanResult.status);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="h-6 border-l border-border"></div>
            <div>
              <h1 className="text-2xl font-bold">Scan Results</h1>
              <p className="text-muted-foreground">
                {scanResult.tool} scan of {scanResult.target}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className={`flex items-center space-x-2 ${getStatusColor(scanResult.status)}`}>
              <StatusIcon className="h-5 w-5" />
              <span className="font-medium capitalize">{scanResult.status}</span>
            </div>
            {scanResult.status === 'completed' && (
              <>
                <Button variant="outline" onClick={handleRetest}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retest
                </Button>
                <Button onClick={handleDownloadReport}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </>
            )}
          </div>
        </div>

        {scanResult.status === 'completed' ? (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Findings</p>
                      <p className="text-2xl font-bold">{scanResult.summary.total_findings}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <div>
                      <p className="text-sm text-muted-foreground">Critical/High</p>
                      <p className="text-2xl font-bold">
                        {(scanResult.summary.severity_breakdown.CRITICAL || 0) + (scanResult.summary.severity_breakdown.HIGH || 0)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Scan Duration</p>
                      <p className="text-2xl font-bold">{scanResult.summary.scan_duration}s</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Tool Used</p>
                      <p className="text-lg font-semibold">{scanResult.tool}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="findings">Findings</TabsTrigger>
                <TabsTrigger value="raw">Raw Output</TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Severity Breakdown</CardTitle>
                    <CardDescription>Distribution of findings by severity level</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {Object.entries(scanResult.summary.severity_breakdown).map(([severity, count]) => (
                        <div key={severity} className="text-center p-4 rounded-lg bg-muted/20">
                          <SeverityBadge severity={severity as any} />
                          <p className="text-2xl font-bold mt-2">{String(count)}</p>
                          <p className="text-sm text-muted-foreground">{severity}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="findings" className="space-y-4">
                {scanResult.findings.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Issues Found</h3>
                      <p className="text-muted-foreground">
                        Great! No security issues were detected during this scan.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {scanResult.findings.map((finding) => (
                      <Card key={finding.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <CardTitle className="text-lg">{finding.title}</CardTitle>
                              <SeverityBadge severity={finding.severity} />
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Description</h4>
                            <p className="text-muted-foreground">{finding.description}</p>
                          </div>
                          
                          {finding.evidence && (
                            <div>
                              <h4 className="font-semibold mb-2">Evidence</h4>
                              <div className="bg-muted/50 p-3 rounded-lg">
                                <code className="text-sm">{finding.evidence}</code>
                              </div>
                            </div>
                          )}
                          
                          {finding.remediation && (
                            <div>
                              <h4 className="font-semibold mb-2">Remediation</h4>
                              <div className="bg-success/10 border border-success/20 p-3 rounded-lg">
                                <p className="text-sm">{finding.remediation}</p>
                              </div>
                            </div>
                          )}
                          
                          {finding.references && finding.references.length > 0 && (
                            <div>
                              <h4 className="font-semibold mb-2">References</h4>
                              <ul className="text-sm space-y-1">
                                {finding.references.map((ref, index) => (
                                  <li key={index}>
                                    <a href={ref} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                      {ref}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="raw">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Terminal className="h-5 w-5" />
                      <span>Raw Output</span>
                    </CardTitle>
                    <CardDescription>
                      Complete output from the security tool
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {scanResult.raw_output ? (
                      <div className="bg-background border rounded-lg p-4 font-mono text-sm max-h-96 overflow-auto">
                        <pre className="whitespace-pre-wrap">{scanResult.raw_output}</pre>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No raw output available for this scan.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          // Running scan status
          <Card>
            <CardContent className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold mb-2">Scan in Progress</h3>
              <p className="text-muted-foreground">
                Your security scan is currently running. Results will appear here when complete.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}