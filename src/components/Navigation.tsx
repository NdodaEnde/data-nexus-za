import { Button } from "@/components/ui/button";
import { Search, Menu, BarChart3 } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold text-foreground">DataNexus ZA</h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Education
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Health
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Labour
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Social Development
            </a>
          </div>

          {/* Search and Menu */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;