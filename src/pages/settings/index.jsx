'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Check } from 'lucide-react';
import { useTheme } from '@/contexts/theme-provider';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const fontOptions = [
  { value: 'poppins', label: 'Poppins' },
  { value: 'inter', label: 'Inter' },
  { value: 'roboto', label: 'Roboto' },
  { value: 'open-sans', label: 'Open Sans' },
];

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'French' },
  { value: 'rw', label: 'Kinyarwanda' },
  { value: 'sw', label: 'Swahili' },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState({
    font: 'poppins',
    language: 'en',
    isDarkMode: false,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize settings based on current theme
  useEffect(() => {
    setSettings((prev) => ({
      ...prev,
      isDarkMode: theme === 'dark',
    }));
  }, [theme]);

  // Apply font changes immediately for preview
  useEffect(() => {
    document.documentElement.style.fontFamily = getFontFamily(settings.font);

    // Track changes
    setHasChanges(true);
  }, [settings.font]);

  const getFontFamily = (font) => {
    switch (font) {
      case 'inter':
        return "'Inter', sans-serif";
      case 'roboto':
        return "'Roboto', sans-serif";
      case 'open-sans':
        return "'Open Sans', sans-serif";
      case 'poppins':
      default:
        return "'Poppins', sans-serif";
    }
  };

  const handleThemeToggle = (checked) => {
    const newTheme = checked ? 'dark' : 'light';
    setTheme(newTheme);
    setSettings((prev) => ({ ...prev, isDarkMode: checked }));
    setHasChanges(true);
  };

  const handleSaveSettings = () => {
    setIsSaving(true);

    // Simulate saving to backend
    setTimeout(() => {
      setIsSaving(false);
      setHasChanges(false);
      toast.success('Settings saved successfully', {
        description: 'Your preferences have been updated.',
      });
    }, 1000);

    // In a real app, you would save these settings to localStorage or a backend
    localStorage.setItem('autoparts-font', settings.font);
    localStorage.setItem('autoparts-language', settings.language);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground mt-2">
          Customize your application preferences.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-8 md:grid-cols-2"
      >
        {/* Appearance Settings */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Appearance</CardTitle>
              <CardDescription className="text-base">
                Customize how the application looks and feels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Theme Toggle */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Dark Mode</h3>
                    <p className="text-muted-foreground text-base">
                      Toggle between light and dark themes
                    </p>
                  </div>
                  <Switch
                    checked={settings.isDarkMode}
                    onCheckedChange={handleThemeToggle}
                  />
                </div>
                <Separator />
              </div>

              {/* Font Style Picker */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Font Style</h3>
                  <p className="text-muted-foreground text-base mb-4">
                    Choose your preferred font family
                  </p>
                  <Select
                    value={settings.font}
                    onValueChange={(value) =>
                      setSettings({ ...settings, font: value })
                    }
                  >
                    <SelectTrigger className="w-full text-base">
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      {fontOptions.map((font) => (
                        <SelectItem
                          key={font.value}
                          value={font.value}
                          className="text-base"
                        >
                          {font.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-4 border rounded-md bg-muted/30">
                  <p className="text-base">
                    This is a preview of the <strong>{settings.font}</strong>{' '}
                    font.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Preferences Settings */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Preferences</CardTitle>
              <CardDescription className="text-base">
                Manage your application preferences and regional settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Language Selector */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Language</h3>
                  <p className="text-muted-foreground text-base mb-4">
                    Select your preferred language
                  </p>
                  <Select
                    value={settings.language}
                    onValueChange={(value) => {
                      setSettings({ ...settings, language: value });
                      setHasChanges(true);
                    }}
                  >
                    <SelectTrigger className="w-full text-base">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languageOptions.map((language) => (
                        <SelectItem
                          key={language.value}
                          value={language.value}
                          className="text-base"
                        >
                          {language.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-end"
      >
        <Button
          size="lg"
          onClick={handleSaveSettings}
          disabled={isSaving || !hasChanges}
          className="text-base px-8"
        >
          {isSaving ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                }}
                className="mr-2"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </motion.div>
              Saving...
            </>
          ) : (
            <>
              {hasChanges ? (
                <Save className="mr-2 h-5 w-5" />
              ) : (
                <Check className="mr-2 h-5 w-5" />
              )}
              {hasChanges ? 'Save Settings' : 'Settings Saved'}
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
}
