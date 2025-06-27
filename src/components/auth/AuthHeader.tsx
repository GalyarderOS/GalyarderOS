import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/global/ui/button';
import { ArrowLeft } from 'lucide-react';

interface AuthHeaderProps {
  isLogin: boolean;
}

export const AuthHeader = ({ isLogin }: AuthHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="text-center mb-8">
      <Button
        variant="ghost"
        onClick={() => navigate('/')}
        className="mb-6 text-muted-foreground hover:text-foreground font-playfair"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Button>
      
      <div className="flex items-center justify-center space-x-3 mb-6">
        <div className="w-12 h-12 flex items-center justify-center">
          <img 
            src="/logo.png" 
            alt="GalyarderOS Logo" 
            className="h-8 w-8 object-contain"
          />
        </div>
        <span className="text-2xl font-bold text-foreground font-playfair">
          GalyarderOS
        </span>
      </div>
      
      <h1 className="text-3xl font-bold text-foreground mb-2 font-playfair">
        {isLogin ? 'Welcome Back' : 'Join the Elite'}
      </h1>
      <p className="text-muted-foreground font-playfair">
        {isLogin 
          ? 'Access your personal operating system' 
          : 'Begin your journey to refined productivity'
        }
      </p>
    </div>
  );
};
