import { useAuth } from '@/hooks/useAuth';
import { MainLayout } from '@/layouts/MainLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { RoleGuard } from '@/components/RoleGuard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, Activity, Clock } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Users',
      value: '2,543',
      description: 'Active users this month',
      icon: Users,
      trend: '+12.5%',
    },
    {
      title: 'Revenue',
      value: '$45,231.89',
      description: 'Total revenue generated',
      icon: TrendingUp,
      trend: '+8.2%',
    },
    {
      title: 'Active Sessions',
      value: '573',
      description: 'Currently active users',
      icon: Activity,
      trend: '+3.1%',
    },
    {
      title: 'Avg. Session',
      value: '2h 34m',
      description: 'Average session duration',
      icon: Clock,
      trend: '+2.4%',
    },
  ];

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome, {user?.name}!
              </h1>
              <p className="text-muted-foreground mt-1">
                Here's what's happening with your dashboard today.
              </p>
            </div>
            <Badge variant="outline" className="w-fit">
              Role: <span className="ml-2 font-semibold text-primary">{user?.role}</span>
            </Badge>
          </div>

          {/* Stats grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.title} className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-muted-foreground">{stat.description}</p>
                      <span className="text-xs font-semibold text-green-600">{stat.trend}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Role-based content */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Admin section */}
            <RoleGuard allowedRoles={['admin']}>
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle>Admin Panel</CardTitle>
                  <CardDescription>Administrative controls and settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      You have full access to all system settings and user management tools.
                    </p>
                    <ul className="text-sm space-y-1 mt-4 text-muted-foreground">
                      <li>✓ Manage all users and permissions</li>
                      <li>✓ System configuration</li>
                      <li>✓ Analytics and reporting</li>
                      <li>✓ Security settings</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </RoleGuard>

            {/* Manager section */}
            <RoleGuard allowedRoles={['manager', 'admin']}>
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle>Manager Dashboard</CardTitle>
                  <CardDescription>Team management and oversight</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Monitor your team's activity and manage workflows.
                    </p>
                    <ul className="text-sm space-y-1 mt-4 text-muted-foreground">
                      <li>✓ Team member overview</li>
                      <li>✓ Task management</li>
                      <li>✓ Performance metrics</li>
                      <li>✓ Team reports</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </RoleGuard>

            {/* User section */}
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>Personal account settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    View and manage your personal account settings.
                  </p>
                  <ul className="text-sm space-y-1 mt-4 text-muted-foreground">
                    <li>✓ Profile information</li>
                    <li>✓ Security settings</li>
                    <li>✓ Preferences</li>
                    <li>✓ Activity log</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coming soon section */}
          <Card className="bg-gradient-to-r from-primary/5 to-transparent border-primary/20">
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
              <CardDescription>Features in development</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We're working on additional features to enhance your dashboard experience. 
                Check back soon for updates!
              </p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
