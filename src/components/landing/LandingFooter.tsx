import { Mail, Phone } from 'lucide-react';

const LandingFooter = () => {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
              <img 
                src="/logo.png" 
                alt="GalyarderOS Logo" 
                className="w-5 h-5 object-contain"
              />
            </div>
            <span className="text-lg font-bold font-playfair text-foreground">GalyarderOS</span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 text-muted-foreground">
            <a href="mailto:galyarder@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                <span>galyarder@gmail.com</span>
            </a>
            <a href="tel:+6281388649050" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                <span>+62 813 8864 9050</span>
            </a>
          </div>
          
          <p className="text-muted-foreground">
            © 2025 GalyarderOS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
