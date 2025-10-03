import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Bell, Lock, Globe, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { useCallback } from 'react';

export const Settings = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  
  // Get base theme name (without -dark suffix)
  const getBaseTheme = (themeName: string | undefined): string => {
    if (!themeName || themeName === 'dark') return 'light';
    return themeName.replace('-dark', '');
  };
  
  // Determine if current theme is in dark mode
  const isDarkMode = theme?.endsWith('-dark') || theme === 'dark';
  const baseTheme = getBaseTheme(theme);
  
  const handleDarkModeToggle = useCallback((checked: boolean) => {
    const currentBase = getBaseTheme(theme);
    console.log('Dark mode toggle:', { checked, currentBase, theme });
    
    if (checked) {
      // Apply dark mode: "light" becomes "dark", others get "-dark" suffix
      const newTheme = currentBase === 'light' ? 'dark' : `${currentBase}-dark`;
      console.log('Setting theme to:', newTheme);
      setTheme(newTheme);
    } else {
      // Remove dark mode: just use base theme
      console.log('Setting theme to:', currentBase);
      setTheme(currentBase);
    }
  }, [theme, setTheme]);

  const handleThemeChange = useCallback((newTheme: string) => {
    // Check current dark mode state directly from theme
    const currentIsDark = theme?.endsWith('-dark') || theme === 'dark';
    console.log('Theme change:', { newTheme, currentIsDark, currentTheme: theme });
    
    // Preserve dark mode state when changing themes
    if (currentIsDark) {
      const themeWithDark = newTheme === 'light' ? 'dark' : `${newTheme}-dark`;
      console.log('Applying dark version:', themeWithDark);
      setTheme(themeWithDark);
    } else {
      console.log('Applying light version:', newTheme);
      setTheme(newTheme);
    }
  }, [theme, setTheme]);

  const handleBackClick = useCallback(() => {
    // Try to go back, or navigate to home if no history
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/more');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background pb-6">
      <Header 
        title="Settings" 
        showNotifications={false} 
        showProfile={false} 
        showBackButton={true}
        onBackClick={handleBackClick}
      />
      
      <main className="px-4 py-6 max-w-2xl mx-auto">
        <Card className="p-6 mb-6">
          <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
            <Sun className="w-5 h-5" />
            Appearance
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch 
                id="dark-mode" 
                checked={isDarkMode}
                onCheckedChange={handleDarkModeToggle}
              />
            </div>
            <div>
              <Label htmlFor="theme-select">Theme</Label>
              <select
                id="theme-select"
                value={baseTheme}
                onChange={(e) => handleThemeChange(e.target.value)}
                className="w-full mt-2 h-10 px-3 rounded-md border border-input bg-card text-card-foreground"
              >
                <option value="light">Default Theme</option>
                <option value="clean-minimalist">Clean & Minimalist Theme</option>
                <option value="cozy-rustic">Cozy & Rustic Theme</option>
                <option value="vibrant-healthy">Vibrant & Healthy Theme</option>
                <option value="gourmet-elegant">Gourmet & Elegant Theme</option>
                <option value="playful-fun">Playful & Fun Theme</option>
                <option value="comic">Comic Theme</option>
              </select>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notif">Push Notifications</Label>
              <Switch id="push-notif" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notif">Email Notifications</Label>
              <Switch id="email-notif" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="meal-reminders">Meal Reminders</Label>
              <Switch id="meal-reminders" defaultChecked />
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Preferences
          </h3>
          <div className="space-y-4">
            <Link to="/preferences">
              <Button variant="outline" className="w-full">
                Manage Preferences
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Privacy & Security
          </h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Privacy Policy
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Terms of Service
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};
