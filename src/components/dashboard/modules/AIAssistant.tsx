import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/global/ui/dialog';
import { Button } from '@/components/global/ui/button';
import { Textarea } from '@/components/global/ui/textarea';
import { ScrollArea } from '@/components/global/ui/scroll-area';
import { useAuth } from '@/contexts/auth/useAuth';
import { useToast } from '@/hooks/use-toast';
import { 
  Send, 
  Bot, 
  User,
  Sparkles,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
// import { supabase } from '@/integrations/supabase/client';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIAssistant = ({ isOpen, onClose }: AIAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Halo! Saya adalah AI Assistant GalyarderOS. Saya siap membantu Anda dengan produktivitas, penetapan tujuan, pelacakan kebiasaan, dan pengembangan diri. Bagaimana saya bisa membantu Anda hari ini?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { user, session } = useAuth();
  const { toast } = useToast();

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !user || !session) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setConnectionError(false);

    // TODO: Implement actual Bolt API call for AI assistant
    console.warn('AI Assistant message sending not implemented.');
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: "Sorry, the AI assistant is currently offline. Please try again later.",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col p-0 bg-card border-2 border-border font-playfair">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <DialogTitle className="flex items-center space-x-2 font-playfair">
            <div className="w-8 h-8 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-muted-foreground" />
            </div>
            <span className="text-foreground">AI Assistant</span>
            {connectionError && (
              <AlertCircle className="h-4 w-4 text-destructive" />
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col min-h-0">
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-6">
            <div className="space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex space-x-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === 'user' 
                          ? 'bg-muted' 
                          : 'bg-muted/50'
                      }`}>
                        {message.role === 'user' ? (
                          <User className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Bot className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      
                      <div className={`rounded-lg px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-muted text-foreground'
                          : 'bg-muted/30 text-foreground'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap font-playfair">{message.content}</p>
                        <p className="text-xs mt-2 opacity-70 font-playfair">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex space-x-3 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="bg-muted/30 text-foreground rounded-lg px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm font-playfair">Sedang berpikir...</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          <div className="p-6 pt-4 border-t border-border">
            <div className="flex space-x-2">
              <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tanya saya tentang produktivitas, tujuan, atau kebiasaan..."
                className="flex-1 min-h-[40px] max-h-32 resize-none border-2 border-border font-playfair"
                disabled={isLoading || !user}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading || !user}
                className="bg-foreground hover:bg-foreground/90 text-background"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {!user && (
              <p className="text-xs text-muted-foreground mt-2 font-playfair">
                Silakan masuk untuk menggunakan AI Assistant
              </p>
            )}
            
            {connectionError && (
              <p className="text-xs text-destructive mt-2 font-playfair">
                ⚠️ Masalah koneksi terdeteksi. Silakan coba lagi atau hubungi administrator.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIAssistant;

