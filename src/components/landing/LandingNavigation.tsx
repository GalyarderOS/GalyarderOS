import { motion } from 'framer-motion';
import { Button } from '@/components/global/ui/button';
import { MobileHeader } from '@/components/global/ui/mobile-header';
import { useIsMobile } from '@/hooks/use-mobile';

interface LandingNavigationProps {
  theme: string;
  setTheme: (theme: string) => void;
  onSignIn: () => void;
  onGetStarted: () => void;
}

const LandingNavigation = ({ theme, setTheme, onSignIn, onGetStarted }: LandingNavigationProps) => {
  const isMobile = useIsMobile();

  const logo = (
    <motion.div 
      className="w-10 h-10 flex items-center justify-center overflow-hidden"
      whileHover={{ scale: 1.05, rotate: 5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <img 
        src="/logo.png" 
        alt="GalyarderOS Logo" 
        className="w-6 h-6 object-contain"
      />
    </motion.div>
  );

  const actions = (
    <div className="flex items-center space-x-2">
      <Button 
        variant="ghost" 
        size={isMobile ? "sm" : "default"}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </Button>
      {!isMobile && (
        <>
          <Button variant="outline" onClick={onSignIn}>
            Sign In
          </Button>
          <Button onClick={onGetStarted} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Get Started
          </Button>
        </>
      )}
    </div>
  );

  const menuItems = isMobile ? [
    { label: 'Sign In', onClick: onSignIn },
    { label: 'Get Started', onClick: onGetStarted },
  ] : undefined;

  if (isMobile) {
    return (
      <MobileHeader
        logo={logo}
        title="GalyarderOS"
        actions={actions}
        menuItems={menuItems}
      />
    );
  }

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {logo}
          <span className="text-xl font-bold font-serif text-foreground">GalyarderOS</span>
        </div>
        {actions}
      </div>
    </motion.nav>
  );
};

export default LandingNavigation;
