import { useState } from 'react';
import { MoreVertical, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data for initial development
const initialUsers = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    role: 'Admin',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    role: 'Manager',
  },
  {
    id: 3,
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob@example.com',
    role: 'User',
  },
];

const roles = ['Admin', 'Manager', 'User'];

const getRoleBadgeVariant = (role) => {
  const variants = {
    Admin: 'admin',
    Manager: 'manager',
    User: 'user',
  };
  return variants[role] || 'default';
};

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  });

  // Filter users based on search query
  const filteredUsers = users.filter((user) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(searchLower) ||
      user.lastName.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower)
    );
  });

  const handleCreateUser = () => {
    if (
      newUser.firstName &&
      newUser.lastName &&
      newUser.email &&
      newUser.role
    ) {
      setUsers([...users, { ...newUser, id: users.length + 1 }]);
      setNewUser({ firstName: '', lastName: '', email: '', role: '' });
      setIsCreateDialogOpen(false);
    }
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div className="space-y-6 relative min-h-[calc(100vh-4rem)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-base"
          />
        </div>
        {/* Desktop Add Button */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="hidden lg:flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-xl">Create New User</DialogTitle>
              <DialogDescription className="text-base">
                Add a new user to the system. Fill in all fields below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </label>
                <Input
                  id="firstName"
                  value={newUser.firstName}
                  onChange={(e) =>
                    setNewUser({ ...newUser, firstName: e.target.value })
                  }
                  className="text-base"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="lastName" className="text-sm font-medium">
                  Last Name
                </label>
                <Input
                  id="lastName"
                  value={newUser.lastName}
                  onChange={(e) =>
                    setNewUser({ ...newUser, lastName: e.target.value })
                  }
                  className="text-base"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="text-base"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="role" className="text-sm font-medium">
                  Role
                </label>
                <Select
                  value={newUser.role}
                  onValueChange={(value) =>
                    setNewUser({ ...newUser, role: value })
                  }
                >
                  <SelectTrigger className="text-base">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role} className="text-base">
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
                size="lg"
                className="text-base"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateUser}
                size="lg"
                className="text-base"
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-base font-semibold">
                First Name
              </TableHead>
              <TableHead className="text-base font-semibold">
                Last Name
              </TableHead>
              <TableHead className=" text-base font-semibold">Email</TableHead>
              <TableHead className="text-base font-semibold">Role</TableHead>
              <TableHead className="w-[100px] text-base font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="text-base font-medium">
                  {user.firstName}
                </TableCell>
                <TableCell className="text-base">{user.lastName}</TableCell>
                <TableCell className="text-base">{user.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={getRoleBadgeVariant(user.role)}
                    className="text-sm"
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-accent"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      <DropdownMenuItem
                        onClick={() => {
                          // TODO: Implement edit functionality
                          console.log('Edit user:', user.id);
                        }}
                        className="text-base"
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-base text-destructive focus:text-destructive"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Floating Action Button */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow lg:hidden"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Create New User</DialogTitle>
            <DialogDescription className="text-base">
              Add a new user to the system. Fill in all fields below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <label htmlFor="firstName" className="text-sm font-medium">
                First Name
              </label>
              <Input
                id="firstName"
                value={newUser.firstName}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstName: e.target.value })
                }
                className="text-base"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="lastName" className="text-sm font-medium">
                Last Name
              </label>
              <Input
                id="lastName"
                value={newUser.lastName}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastName: e.target.value })
                }
                className="text-base"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="text-base"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="role" className="text-sm font-medium">
                Role
              </label>
              <Select
                value={newUser.role}
                onValueChange={(value) =>
                  setNewUser({ ...newUser, role: value })
                }
              >
                <SelectTrigger className="text-base">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role} className="text-base">
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
              size="lg"
              className="text-base"
            >
              Cancel
            </Button>
            <Button onClick={handleCreateUser} size="lg" className="text-base">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
