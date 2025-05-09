import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  BoxesIcon,
  UsersRound,
  Settings,
  LogOut,
  Menu,
  UserCog,
  User,
} from 'lucide-react';
import { Button } from './button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

const menuItems = [
  { icon: LayoutDashboard, name: 'Dashboard', path: '/dashboard' },
  { icon: Package, name: 'Products', path: '/products' },
  { icon: BoxesIcon, name: 'Stock', path: '/stock' },
  {
    icon: UsersRound,
    name: 'User Management',
    shortName: 'Users',
    path: '/users',
  },
  {
    icon: UserCog,
    name: 'Manage Profiles',
    shortName: 'Profile',
    path: '/profile-management',
  },
  { icon: Settings, name: 'Settings', path: '/settings' },
];

export function Sidebar({ expanded, onToggle }) {
  const location = useLocation();

  // Auto collapse on mobile and tablet
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        onToggle?.(false);
      } else {
        onToggle?.(true);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [onToggle]);

  return (
    <motion.div
      animate={{ width: expanded ? 240 : 70 }}
      transition={{ duration: 0.15 }}
      className={cn(
        'h-screen bg-background border-r flex flex-col fixed top-0 left-0 z-50 py-6',
        expanded ? 'px-4' : 'px-2',
        'lg:z-20 lg:py-4',
        !expanded && 'w-[70px]'
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between mb-2 lg:mb-8 h-12">
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <img
              src="/images/logo.png"
              alt="KAP Logo"
              className="h-[80px] md:h-[120px] w-auto mt-2 lg:mt-5"
            />
          </motion.div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onToggle?.(!expanded)}
          className="rounded-full lg:hidden hover:bg-accent"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1 lg:space-y-2 overflow-y-auto">
        <TooltipProvider delayDuration={0}>
          {menuItems.map(({ icon: Icon, name, shortName, path }) => {
            const isActive = location.pathname === path;
            const displayName = expanded ? name : '';

            return (
              <Tooltip key={path}>
                <TooltipTrigger asChild>
                  <Link to={path}>
                    <motion.div
                      className={cn(
                        'flex items-center gap-4 px-3 py-1.5 lg:py-2.5 rounded-lg mt-1 lg:mt-4 font-medium cursor-pointer transition-all duration-150',
                        isActive
                          ? 'bg-primary text-primary-foreground font-medium'
                          : 'hover:bg-accent hover:text-accent-foreground'
                      )}
                      whileHover={{ scale: 1.01, x: expanded ? 4 : 0 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ duration: 0.1 }}
                    >
                      <Icon size={20} />
                      {displayName && (
                        <span className="truncate">{displayName}</span>
                      )}
                    </motion.div>
                  </Link>
                </TooltipTrigger>
                {!expanded && (
                  <TooltipContent side="right" className="text-sm">
                    {name}
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </nav>

      {/* View Profile & Logout */}
      <div className="mt-1 lg:mt-4 space-y-1 lg:space-y-2">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/profile">
                <motion.div
                  className="flex items-center gap-4 px-3 py-1.5 lg:py-2.5 rounded-lg cursor-pointer transition-all duration-150 hover:bg-accent hover:text-accent-foreground"
                  whileHover={{ scale: 1.01, x: expanded ? 4 : 0 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.1 }}
                >
                  <User size={20} />
                  {expanded && <span className="truncate">View Profile</span>}
                </motion.div>
              </Link>
            </TooltipTrigger>
            {!expanded && (
              <TooltipContent side="right">View Profile</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  'flex items-center gap-4 w-full hover:bg-destructive/10 hover:text-destructive transition-colors duration-150',
                  !expanded && 'justify-center'
                )}
              >
                <LogOut size={20} />
                {expanded && <span className="truncate">Logout</span>}
              </Button>
            </TooltipTrigger>
            {!expanded && <TooltipContent side="right">Logout</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
      </div>
    </motion.div>
  );
}
