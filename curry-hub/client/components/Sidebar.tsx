import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Zap,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ReactNode;
  roles?: string[];
}

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const sidebarLinks: SidebarLink[] = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      href: '/components',
      label: 'Components',
      icon: <Zap className="h-5 w-5" />,
    },
    {
      href: '/users',
      label: 'Users',
      icon: <Users className="h-5 w-5" />,
      roles: ['admin', 'manager'],
    },
    {
      href: '/forms',
      label: 'Dynamic Forms',
      icon: <Zap className="h-5 w-5" />,
    },
    {
      href: '/profile',
      label: 'Profile',
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return null;
  }

  // Filter links based on user role
  const visibleLinks = sidebarLinks.filter((link) => {
    if (!link.roles) return true;
    return link.roles.includes(user.role);
  });

  return (
    <aside className="hidden lg:flex w-64 h-full border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed left-0 top-16 flex-col py-6 px-4 space-y-6">
      {/* Sidebar links */}
      <nav className="space-y-2 flex-1">
        {visibleLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 relative group',
              isActive(link.href)
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            )}
          >
            {link.icon}
            <span className="flex-1">{link.label}</span>
            {isActive(link.href) && (
              <ChevronRight className="h-4 w-4 ml-auto" />
            )}
            {/* Active indicator line */}
            {isActive(link.href) && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-foreground rounded-r" />
            )}
          </Link>
        ))}
      </nav>

      {/* Logout button */}
      <Button
        onClick={handleLogout}
        variant="ghost"
        className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <LogOut className="h-5 w-5 mr-3" />
        Logout
      </Button>
    </aside>
  );
};
