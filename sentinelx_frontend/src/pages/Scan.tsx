import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Search, Target, Shield, Clock, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { scannerApi, toolsApi } from '@/lib/api';

const Scan = () => {
  const [target, setTarget] = useState('');
  const [tool, setTool] = useState('');
  const [inputType, setInputType] = useState('url');
  const [consent, setConsent] = useState(false);
  const [schedule, setSchedule] = useState('now');
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch available tools
  const { data: tools = [], isLoading: toolsLoading } = useQuery({
    queryKey: ['tools'],
    queryFn: async () => {
      const response = await toolsApi.getTools();
      return response.data || [];
    }
  });

  // Scan mutation
  const scanMutation = useMutation({
    mutationFn: async ({ target, tool, inputType, consent }: { target: string; tool: string; inputType: string; consent: boolean }) => {
      const response = await scannerApi.runScan(target, tool, inputType, consent);
      return response.data;
    },
    onSuccess: (data) => {
      toast({
        title: "Scan Started Successfully",
        description: `Security scan initiated for ${target}`,
      });
      
      // Reset form
      setTarget('');
      setTool('');
      setConsent(false);
      
      // Store scan in localStorage and navigate to results
      if (data) {
        const scanData = {
          id: data.job_id,
          target,
          tool,
          status: 'findings' in data ? 'completed' : 'running',
          findings_count: 'findings' in data ? data.findings.length : undefined,
          severity: 'findings' in data && data.findings.length > 0 
            ? data.findings.reduce((max, finding) => {
                const severityOrder = { INFO: 1, LOW: 2, MEDIUM: 3, HIGH: 4, CRITICAL: 5 };
                return severityOrder[finding.severity] > severityOrder[max] ? finding.severity : max;
              }, 'INFO' as any)
            : undefined,
          created_at: new Date().toISOString(),
          result: data
        };
        
        // Save to localStorage
        const existing = JSON.parse(localStorage.getItem('recentScans') || '[]');
        localStorage.setItem('recentScans', JSON.stringify([scanData, ...existing.slice(0, 9)]));
        
        // Navigate to results if completed, otherwise dashboard
        if ('findings' in data) {
          navigate(`/scan/${data.job_id}`);
        } else {
          navigate('/dashboard');
        }
      }
    },
    onError: (error: any) => {
      toast({
        title: "Scan Failed",
        description: error?.response?.data?.error || "Failed to start scan",
        variant: "destructive"
      });
    }
  });

  // Mock recent scans - in real app, this would be fetched from API
  const recentScans = [
    { id: '1', target: 'example.com', tool: 'ssl_check', status: 'completed', severity: 'MEDIUM', timestamp: '2 hours ago' },
    { id: '2', target: '192.168.1.1', tool: 'nmap', status: 'running', severity: null, timestamp: '5 minutes ago' },
    { id: '3', target: 'testsite.org', tool: 'headers_audit', status: 'completed', severity: 'HIGH', timestamp: '1 day ago' }
  ];

  const handleScan = async () => {
    if (!consent) {
      toast({
        title: "Consent Required",
        description: "You must confirm you have permission to scan this target.",
        variant: "destructive"
      });
      return;
    }

    if (!target || !tool) {
      toast({
        title: "Missing Information",
        description: "Please provide a target and select a tool.",
        variant: "destructive"
      });
      return;
    }

    scanMutation.mutate({ target, tool, inputType, consent });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <Search className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Security Scanner</h1>
            <p className="text-muted-foreground">Run comprehensive security scans on your targets</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Scan Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>New Scan</span>
                </CardTitle>
                <CardDescription>
                  Configure and launch a security scan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Target Input */}
                <div className="space-y-2">
                  <Label htmlFor="target">Target</Label>
                  <div className="flex space-x-2">
                    <Select value={inputType} onValueChange={setInputType}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="url">URL</SelectItem>
                        <SelectItem value="host">IP/Host</SelectItem>
                        <SelectItem value="file">File</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      id="target"
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      placeholder={inputType === 'url' ? 'https://example.com' : inputType === 'host' ? '192.168.1.1' : 'Upload file...'}
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Tool Selection */}
                <div className="space-y-2">
                  <Label>Security Tool</Label>
                  <Select value={tool} onValueChange={setTool}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a security tool" />
                    </SelectTrigger>
                    <SelectContent>
                      {toolsLoading ? (
                        <div className="p-2 text-sm text-muted-foreground text-center">
                          Loading tools...
                        </div>
                      ) : tools.length === 0 ? (
                        <div className="p-2 text-sm text-muted-foreground text-center">
                          No tools available
                        </div>
                      ) : (
                        tools.map((t) => (
                          <SelectItem key={t.name} value={t.name}>
                            <div>
                              <div className="font-medium">{t.name}</div>
                              <div className="text-sm text-muted-foreground">{t.description}</div>
                            </div>
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Schedule */}
                <div className="space-y-2">
                  <Label>Schedule</Label>
                  <Select value={schedule} onValueChange={setSchedule}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="now">Run Now</SelectItem>
                      <SelectItem value="later">Schedule for Later</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Consent Checkbox */}
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-destructive">Authorization Required</p>
                        <p className="text-sm text-muted-foreground">
                          Only run scans against assets you own or have written permission to test.
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="consent"
                          checked={consent}
                          onCheckedChange={(checked) => setConsent(checked === true)}
                        />
                        <Label htmlFor="consent" className="text-sm">
                          I have permission to scan this target
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  onClick={handleScan}
                  disabled={!target || !tool || !consent || scanMutation.isPending}
                  className="w-full"
                  size="lg"
                >
                  {scanMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                      Starting Scan...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Start Security Scan
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Scans */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Recent Scans</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentScans.map((scan) => (
                    <div key={scan.id} className="p-3 border border-border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <p className="font-medium text-sm">{scan.target}</p>
                          <p className="text-xs text-muted-foreground">{scan.tool}</p>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          {scan.severity && (
                            <Badge variant={scan.severity === 'HIGH' ? 'destructive' : 'secondary'}>
                              {scan.severity}
                            </Badge>
                          )}
                          <Badge variant={scan.status === 'completed' ? 'secondary' : 'outline'}>
                            {scan.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{scan.timestamp}</p>
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

export default Scan;