import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Sidebar } from '@/components/ui/sidebar';
import { ThemeProvider } from '@/contexts/theme-provider';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { UserNav } from '@/components/ui/user-nav';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const getPageTitle = (pathname) => {
  const titles = {
    '/dashboard': 'Dashboard',
    '/products': 'Products',
    '/stock': 'Stock',
    '/users': 'User Management',
    '/profile-management': 'Profile Management',
    '/profile': 'View Profile',
    '/settings': 'Settings',
  };
  return titles[pathname] || 'Dashboard';
};

export function DashboardLayout() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const location = useLocation();

  return (
    <ThemeProvider defaultTheme="light" storageKey="autoparts-theme">
      <div className="min-h-screen bg-background">
        <Sidebar expanded={sidebarExpanded} onToggle={setSidebarExpanded} />

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="flex h-16 items-center gap-4 px-4">
              <div className="flex items-center gap-4 flex-1  ml-[70px]">
                <h1 className="text-xl font-semibold">
                  {getPageTitle(location.pathname)}
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <ModeToggle />
                <UserNav />
              </div>
            </div>
          </div>

          {/* Mobile Main Content with margin */}
          <main className="p-4 md:p-6 ml-[70px]">
            <Outlet />
          </main>
        </div>

        {/* Desktop Layout */}
        <div
          className={cn(
            'transition-[margin] duration-150 hidden lg:block',
            sidebarExpanded ? 'lg:ml-[240px]' : 'lg:ml-[70px]'
          )}
        >
          {/* Header */}
          <div className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="flex h-16 items-center gap-4 px-4 md:px-6">
              <div className="flex items-center gap-4 flex-1">
                <h1 className="text-2xl font-semibold flex items-center gap-4 ">
                  <span className="text-primary font-semibold">
                    Kigali Auto Parts
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setSidebarExpanded(!sidebarExpanded)}
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                  <Separator orientation="vertical" className="h-8" />
                  <span className="text-muted-foreground">
                    {getPageTitle(location.pathname)}
                  </span>
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <ModeToggle />
                <Separator orientation="vertical" className="h-8" />
                <UserNav />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
