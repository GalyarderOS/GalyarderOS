import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Moon, Sun, LogOut, User as UserIcon, ArrowRight } from 'lucide-react';
import { Button } from '@/components/global/ui/button';
import { ThemeToggle } from '@/components/global/ui/theme-toggle';
import { Input } from '@/components/global/ui/input';
import { Badge } from '@/components/global/ui/badge';
import { useCommandPalette, Command } from '@/hooks/useCommandPalette';
import NotificationCenter from './NotificationCenter';
import SystemStatusIndicator from './SystemStatusIndicator';
import { Dialog, DialogTrigger } from '@/components/global/ui/dialog';
import { AccountSettingsDialog } from './AccountSettingsDialog';
import { Profile, User } from '@/contexts/auth/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/global/ui/avatar';

interface TopBarProps {
  user: User | null;
  profile: Profile | null;
  theme: string;
  setTheme: (theme: string) => void;
  language: string;
  onSearch: () => void;
  onSignOut: () => void;
  onOpenAIAssistant?: () => void;
  onOpenNotionAI?: () => void;
}

const TopBar = ({
  user,
  profile,
  theme,
  setTheme,
  language,
  onSearch,
  onSignOut,
  onOpenAIAssistant,
  onOpenNotionAI
}: TopBarProps) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  
  const {
    commands,
    executeCommand
  } = useCommandPalette(onOpenAIAssistant, onOpenNotionAI);

  // Filter commands based on local search
  const filteredCommands = commands.filter(command => 
    command.label.toLowerCase().includes(localSearch.toLowerCase()) || 
    command.keywords.some(keyword => keyword.toLowerCase().includes(localSearch.toLowerCase()))
  );

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleSearchClick = () => {
    setIsSearchExpanded(true);
  };

  const handleSearchBlur = () => {
    // Delay to allow click on results
    setTimeout(() => {
      setIsSearchExpanded(false);
      setLocalSearch('');
    }, 200);
  };

  const handleCommandClick = (command: Command) => {
    executeCommand(command);
    setIsSearchExpanded(false);
    setLocalSearch('');
  };

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-md border-b border-border z-40"
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Logo and App Name */}
        <div className="flex items-center space-x-3">
          <img 
            src="/logo.png" 
            alt="GalyarderOS Logo" 
            className="w-10 h-10 object-contain" 
          />
          <div>
            <h1 className="text-lg font-bold text-foreground font-playfair">GalyarderOS</h1>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-8 relative">
          {!isSearchExpanded ? (
            <Button
              variant="ghost"
              onClick={handleSearchClick}
              className="w-full justify-start text-muted-foreground hover:text-foreground"
            >
              <Search className="h-4 w-4 mr-2" />
              Search modules...
            </Button>
          ) : (
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  onBlur={handleSearchBlur}
                  placeholder="Search modules..."
                  className="pl-10 pr-4"
                  autoFocus
                />
              </div>
              
              {/* Search Results Dropdown */}
              <AnimatePresence>
                {isSearchExpanded && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 w-full bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
                  >
                    {filteredCommands.length === 0 ? (
                      <div className="p-4 text-center text-muted-foreground text-sm">
                        No modules found
                      </div>
                    ) : (
                      <div className="p-2">
                        {Object.entries(
                          filteredCommands.reduce((acc, command) => {
                            if (!acc[command.category]) acc[command.category] = [];
                            acc[command.category].push(command);
                            return acc;
                          }, {} as Record<string, Command[]>)
                        ).map(([category, categoryCommands]) => (
                          <div key={category} className="mb-2">
                            <div className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                              {category}
                            </div>
                            {categoryCommands.map((command) => (
                              <button
                                key={command.id}
                                onClick={() => handleCommandClick(command)}
                                className="w-full p-2 rounded-md hover:bg-muted/50 flex items-center justify-between group transition-all text-left"
                              >
                                <span className="text-foreground text-sm">{command.label}</span>
                                <div className="flex items-center space-x-2">
                                  {command.shortcut && (
                                    <Badge variant="outline" className="text-xs">
                                      ⌘{command.shortcut}
                                    </Badge>
                                  )}
                                  <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                              </button>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Right Section - Status and Controls */}
        <div className="flex items-center space-x-4">
          {/* System Status - Real-time indicators */}
          <SystemStatusIndicator />

          {/* Notification Center */}
          <NotificationCenter />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Menu */}
          {user && (
            <Dialog open={isAccountSettingsOpen} onOpenChange={setIsAccountSettingsOpen}>
              <div className="flex items-center space-x-2">
                <div className="hidden md:block text-sm text-right">
                  <p className="font-medium text-foreground truncate max-w-[150px]">
                    {profile?.full_name || user.email}
                  </p>
                </div>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile?.avatar_url || user.user_metadata?.avatar_url} />
                      <AvatarFallback>
                        <UserIcon className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DialogTrigger>
                <Button variant="ghost" size="sm" onClick={onSignOut}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
              <AccountSettingsDialog onOpenChange={setIsAccountSettingsOpen} />
            </Dialog>
          )}

          {/* Time and Date */}
          <div className="text-sm text-foreground font-medium">
            <div>{getCurrentTime()}</div>
            <div className="text-xs text-muted-foreground">{getCurrentDate()}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TopBar;
