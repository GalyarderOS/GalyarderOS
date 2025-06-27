import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/global/ui/card';
import { Button } from '@/components/global/ui/button';
import { Input } from '@/components/global/ui/input';
import { Label } from '@/components/global/ui/label';
import { Badge } from '@/components/global/ui/badge';
import { Switch } from '@/components/global/ui/switch';
import { useAuth } from '@/contexts/auth/useAuth';
import { useTheme } from '@/contexts/useTheme';
// import { supabase } from '@/integrations/supabase/client';
import { 
  Save, 
  Palette, 
  Check,
  Settings as SettingsIcon,
  Brain,
  Sparkles,
  FileText
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { user } = useAuth();
  const { theme, language, setTheme, setLanguage } = useTheme();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    gemini_api_key: '',
    notion_token: '',
    notifications_enabled: true,
    dark_mode: theme === 'dark',
    language: language as 'en' | 'id'
  });

  useEffect(() => {
    // TODO: Implement actual data fetching from Bolt API
    // For now, settings will start empty
    setSettings({
      gemini_api_key: '',
      notion_token: '',
      notifications_enabled: true,
      dark_mode: theme === 'dark',
      language: language as 'en' | 'id'
    });
  }, [user, theme, language]);

  const saveSettings = async () => {
    setLoading(true);
    // TODO: Implement actual data saving to Bolt API
    console.warn('Saving settings: Not implemented.', settings);

      // Update theme context
      if (settings.dark_mode !== (theme === 'dark')) {
        setTheme(settings.dark_mode ? 'dark' : 'light');
      }

      // Update language context
      if (settings.language !== language) {
        setLanguage(settings.language);
      }

    setLoading(false);
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const translations = {
    en: {
      title: 'Settings',
      subtitle: 'Manage your account preferences and integrations',
      appearance: 'Appearance',
      appearanceDesc: 'Customize your interface',
      integrations: 'AI Integrations',
      integrationsDesc: 'Connect external services',
      notionSection: 'Notion Workspace',
      notionSectionDesc: 'Manage your Notion integration',
      darkMode: 'Dark Mode',
      darkModeDesc: 'Switch between light and dark themes',
      language: 'Language',
      languageDesc: 'Choose your preferred language',
      geminiKey: 'Gemini API Key',
      geminiDesc: 'Enter your Google Gemini API key for AI features',
      notionToken: 'Notion Integration Token',
      notionDesc: 'Connect your Notion workspace',
      save: 'Save Changes',
      saving: 'Saving...',
      english: 'English',
      indonesian: 'Bahasa Indonesia'
    },
    id: {
      title: 'Pengaturan',
      subtitle: 'Kelola preferensi akun dan integrasi Anda',
      appearance: 'Tampilan',
      appearanceDesc: 'Sesuaikan antarmuka Anda',
      integrations: 'Integrasi AI',
      integrationsDesc: 'Hubungkan layanan eksternal',
      notionSection: 'Workspace Notion',
      notionSectionDesc: 'Kelola integrasi Notion Anda',
      darkMode: 'Mode Gelap',
      darkModeDesc: 'Beralih antara tema terang dan gelap',
      language: 'Bahasa',
      languageDesc: 'Pilih bahasa yang Anda sukai',
      geminiKey: 'Kunci API Gemini',
      geminiDesc: 'Masukkan kunci API Google Gemini untuk fitur AI',
      notionToken: 'Token Integrasi Notion',
      notionDesc: 'Hubungkan workspace Notion Anda',
      save: 'Simpan Perubahan',
      saving: 'Menyimpan...',
      english: 'English',
      indonesian: 'Bahasa Indonesia'
    }
  };

  const t = translations[language];

  const settingsSections = [
    {
      title: t.appearance,
      description: t.appearanceDesc,
      icon: <Palette className="h-6 w-6" />,
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium text-foreground font-playfair">{t.darkMode}</Label>
              <p className="text-sm text-muted-foreground font-playfair">{t.darkModeDesc}</p>
            </div>
            <Switch
              checked={settings.dark_mode}
              onCheckedChange={(checked) => setSettings({...settings, dark_mode: checked})}
            />
          </div>
          
          <div className="space-y-3">
            <Label className="text-base font-medium text-foreground font-playfair">{t.language}</Label>
            <p className="text-sm text-muted-foreground font-playfair">{t.languageDesc}</p>
            <div className="flex gap-3">
              <Button
                variant={settings.language === 'en' ? 'default' : 'outline'}
                onClick={() => setSettings({...settings, language: 'en'})}
                className="font-playfair"
              >
                {settings.language === 'en' && <Check className="w-4 h-4 mr-2" />}
                {t.english}
              </Button>
              <Button
                variant={settings.language === 'id' ? 'default' : 'outline'}
                onClick={() => setSettings({...settings, language: 'id'})}
                className="font-playfair"
              >
                {settings.language === 'id' && <Check className="w-4 h-4 mr-2" />}
                {t.indonesian}
              </Button>
            </div>
          </div>
        </div>
      )
    },
    {
      title: t.integrations,
      description: t.integrationsDesc,
      icon: <Brain className="h-6 w-6" />,
      content: (
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-muted-foreground" />
              <Label className="text-base font-medium text-foreground font-playfair">{t.geminiKey}</Label>
            </div>
            <p className="text-sm text-muted-foreground font-playfair">{t.geminiDesc}</p>
            <Input
              type="password"
              value={settings.gemini_api_key}
              onChange={(e) => setSettings({...settings, gemini_api_key: e.target.value})}
              placeholder="Enter your Gemini API key"
              className="font-playfair"
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <SettingsIcon className="h-4 w-4 text-muted-foreground" />
              <Label className="text-base font-medium text-foreground font-playfair">{t.notionToken}</Label>
            </div>
            <p className="text-sm text-muted-foreground font-playfair">{t.notionDesc}</p>
            <Input
              type="password"
              value={settings.notion_token}
              onChange={(e) => setSettings({...settings, notion_token: e.target.value})}
              placeholder="Enter your Notion integration token"
              className="font-playfair"
            />
          </div>
        </div>
      )
    },
    {
      title: t.notionSection,
      description: t.notionSectionDesc,
      icon: <FileText className="h-6 w-6" />,
      content: (
        <div className="space-y-4">
          {settings.notion_token ? (
            <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <div>
                <p className="font-semibold text-green-700">Notion is connected</p>
                <p className="text-sm text-muted-foreground">Your workspace is ready to be used.</p>
              </div>
              <Button variant="destructive" size="sm">Disconnect</Button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border">
              <div>
                <p className="font-semibold text-foreground">Connect to Notion</p>
                <p className="text-sm text-muted-foreground">Link your workspace to unlock features.</p>
              </div>
              <Button>Connect</Button>
            </div>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="p-3 bg-muted rounded-xl">
            <SettingsIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <Badge variant="outline" className="font-playfair border-muted-foreground/20">
            System Configuration
          </Badge>
        </div>
        <h1 className="text-4xl font-bold text-foreground font-playfair">{t.title}</h1>
        <p className="text-xl text-muted-foreground font-playfair max-w-2xl mx-auto">
          {t.subtitle}
        </p>
      </motion.div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingsSections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="border-2 border-border bg-card/80">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-muted/50 rounded-lg">
                    {section.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-foreground font-playfair">
                      {section.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground font-playfair">
                      {section.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {section.content}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center pt-6"
      >
        <Button
          onClick={saveSettings}
          disabled={loading}
          size="lg"
          className="bg-foreground hover:bg-foreground/90 text-background px-8 py-6 text-lg font-playfair"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" />
              {t.saving}
            </>
          ) : (
            <>
              <Save className="mr-2 h-5 w-5" />
              {t.save}
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
};

export default Settings;
