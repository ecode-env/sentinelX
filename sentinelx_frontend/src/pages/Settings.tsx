import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Settings as SettingsIcon, 
  Key, 
  Shield, 
  Bell, 
  Globe, 
  User, 
  Trash2,
  Plus,
  Copy,
  Eye,
  EyeOff,
  Webhook,
  Download,
  Upload
} from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const Settings = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('https://api.example.com/webhook');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    slack: true
  });
  const [features, setFeatures] = useState({
    nmap: true,
    burpsuite: false,
    customTools: true,
    aiAnalysis: true
  });

  const { toast } = useToast();

  const apiKeys = [
    { 
      id: '1', 
      name: 'Production API', 
      key: 'sk_live_abcdef1234567890', 
      created: '2024-01-15', 
      lastUsed: '2 hours ago',
      status: 'active'
    },
    { 
      id: '2', 
      name: 'Development API', 
      key: 'sk_dev_xyz9876543210abc', 
      created: '2024-01-10', 
      lastUsed: '1 day ago',
      status: 'active'
    },
    { 
      id: '3', 
      name: 'Testing API', 
      key: 'sk_test_123abc456def789', 
      created: '2024-01-05', 
      lastUsed: 'Never',
      status: 'inactive'
    }
  ];

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({
      title: "API Key Copied",
      description: "The API key has been copied to your clipboard.",
    });
  };

  const handleWebhookTest = () => {
    toast({
      title: "Webhook Test Sent",
      description: "A test payload has been sent to your webhook URL.",
    });
  };

  const handleExportSettings = () => {
    const settings = {
      notifications,
      features,
      webhookUrl,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sentinelx-settings.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <SettingsIcon className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account, security, and preferences</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Profile Information</span>
                </CardTitle>
                <CardDescription>
                  Update your account information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john.doe@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input id="organization" defaultValue="Acme Security Corp" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                      <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                      <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                      <SelectItem value="gmt">GMT (Greenwich Mean Time)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>

            {/* API Key Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Key className="h-5 w-5" />
                  <span>API Keys</span>
                </CardTitle>
                <CardDescription>
                  Manage your API keys for integrations and automation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{apiKey.name}</h4>
                          <Badge variant={apiKey.status === 'active' ? 'secondary' : 'outline'}>
                            {apiKey.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <code className="text-sm bg-muted px-2 py-1 rounded">
                            {showApiKey ? apiKey.key : '••••••••••••••••'}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowApiKey(!showApiKey)}
                          >
                            {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyKey(apiKey.key)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Created: {apiKey.created} • Last used: {apiKey.lastUsed}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Generate New API Key
                </Button>
              </CardContent>
            </Card>

            {/* Webhook Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Webhook className="h-5 w-5" />
                  <span>Webhook Integration</span>
                </CardTitle>
                <CardDescription>
                  Configure webhook endpoints for real-time notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="webhookUrl">Webhook URL</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="webhookUrl"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      placeholder="https://your-api.com/webhook"
                    />
                    <Button variant="outline" onClick={handleWebhookTest}>
                      Test
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="webhookEvents">Events to Send</Label>
                  <Textarea
                    id="webhookEvents"
                    placeholder="scan.completed, threat.detected, system.error"
                    defaultValue="scan.completed, threat.detected, vulnerability.found"
                  />
                </div>
                <Button>Save Webhook Settings</Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            {/* Notification Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notif">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Scan results and alerts</p>
                  </div>
                  <Switch
                    id="email-notif"
                    checked={notifications.email}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, email: checked }))
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notif">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Browser notifications</p>
                  </div>
                  <Switch
                    id="push-notif"
                    checked={notifications.push}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, push: checked }))
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-notif">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Critical alerts only</p>
                  </div>
                  <Switch
                    id="sms-notif"
                    checked={notifications.sms}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, sms: checked }))
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="slack-notif">Slack Integration</Label>
                    <p className="text-sm text-muted-foreground">Team notifications</p>
                  </div>
                  <Switch
                    id="slack-notif"
                    checked={notifications.slack}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, slack: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Feature Toggles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Feature Controls</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="nmap-feature">Enable Nmap</Label>
                    <p className="text-sm text-muted-foreground">Network port scanning</p>
                  </div>
                  <Switch
                    id="nmap-feature"
                    checked={features.nmap}
                    onCheckedChange={(checked) => 
                      setFeatures(prev => ({ ...prev, nmap: checked }))
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="burp-feature">Burp Suite Integration</Label>
                    <p className="text-sm text-muted-foreground">Web app testing</p>
                  </div>
                  <Switch
                    id="burp-feature"
                    checked={features.burpsuite}
                    onCheckedChange={(checked) => 
                      setFeatures(prev => ({ ...prev, burpsuite: checked }))
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="custom-tools">Custom Tools</Label>
                    <p className="text-sm text-muted-foreground">Upload your own scripts</p>
                  </div>
                  <Switch
                    id="custom-tools"
                    checked={features.customTools}
                    onCheckedChange={(checked) => 
                      setFeatures(prev => ({ ...prev, customTools: checked }))
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="ai-analysis">AI Analysis</Label>
                    <p className="text-sm text-muted-foreground">Enhanced threat detection</p>
                  </div>
                  <Switch
                    id="ai-analysis"
                    checked={features.aiAnalysis}
                    onCheckedChange={(checked) => 
                      setFeatures(prev => ({ ...prev, aiAnalysis: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full" onClick={handleExportSettings}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Settings
                </Button>
                <Button variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Settings
                </Button>
                <Separator />
                <Button variant="destructive" className="w-full">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;