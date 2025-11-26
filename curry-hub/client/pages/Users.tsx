import { useAuth } from '@/hooks/useAuth';
import { MainLayout } from '@/layouts/MainLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { RoleGuard } from '@/components/RoleGuard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

export default function Users() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock users data
  const mockUsers = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin' as const,
      status: 'active' as const,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin@example.com',
      joinedDate: '2024-01-01',
    },
    {
      id: '2',
      name: 'Manager User',
      email: 'manager@example.com',
      role: 'manager' as const,
      status: 'active' as const,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=manager@example.com',
      joinedDate: '2024-02-15',
    },
    {
      id: '3',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'user' as const,
      status: 'active' as const,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john.doe@example.com',
      joinedDate: '2024-03-10',
    },
    {
      id: '4',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'user' as const,
      status: 'active' as const,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane.smith@example.com',
      joinedDate: '2024-03-12',
    },
    {
      id: '5',
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      role: 'user' as const,
      status: 'inactive' as const,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob.johnson@example.com',
      joinedDate: '2024-03-15',
    },
  ];

  const filteredUsers = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={['admin', 'manager']}>
        <MainLayout>
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">Users Management</h1>
              <p className="text-muted-foreground mt-1">Manage and view all system users</p>
            </div>

            {/* Search and filter */}
            <Card>
              <CardHeader>
                <CardTitle>Find Users</CardTitle>
                <CardDescription>Search and filter users by name or email</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Users list */}
            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <CardDescription>
                  Showing {filteredUsers.length} of {mockUsers.length} users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold text-sm">User</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Role</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Joined</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((userData) => (
                        <tr
                          key={userData.id}
                          className="border-b hover:bg-accent/50 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={userData.avatar} alt={userData.name} />
                                <AvatarFallback>
                                  {userData.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium text-sm">{userData.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-sm text-muted-foreground">
                            {userData.email}
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant="outline" className="capitalize">
                              {userData.role}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <Badge
                              variant={userData.status === 'active' ? 'default' : 'secondary'}
                              className="capitalize"
                            >
                              {userData.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-sm text-muted-foreground">
                            {new Date(userData.joinedDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </td>
                          <td className="py-4 px-4">
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredUsers.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No users found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </MainLayout>
      </RoleGuard>
    </ProtectedRoute>
  );
}
