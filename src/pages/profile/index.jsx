import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import {
  Upload,
  Calendar,
  Clock,
  Shield,
  LogOut,
  Key,
  Monitor,
  Smartphone,
  Tablet,
  AlertCircle,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

// Mock data for the profile
const profileData = {
  name: 'John Doe',
  email: 'john.doe@kap.com',
  phone: '+250 789 123 456',
  role: 'Admin',
  joinDate: new Date('2022-03-15'),
  lastLogin: new Date('2023-05-08T14:30:00'),
  passwordChanges: [
    { date: new Date('2023-04-10T09:15:00'), ip: '192.168.1.1' },
    { date: new Date('2022-11-22T16:45:00'), ip: '192.168.1.1' },
  ],
  activeSessions: [
    {
      device: 'Desktop - Chrome',
      location: 'Kigali, Rwanda',
      lastActive: new Date('2023-05-08T14:30:00'),
      current: true,
    },
    {
      device: 'Mobile - Safari',
      location: 'Kigali, Rwanda',
      lastActive: new Date('2023-05-07T10:15:00'),
      current: false,
    },
    {
      device: 'Tablet - Firefox',
      location: 'Kigali, Rwanda',
      lastActive: new Date('2023-05-05T18:45:00'),
      current: false,
    },
  ],
};

export default function ProfilePage() {
  const [avatarSrc, setAvatarSrc] = useState('/avatars/user.png');
  const [isUploading, setIsUploading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);

      // Simulate upload delay
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (event) => {
          setAvatarSrc(event.target.result);
          setIsUploading(false);
          toast.success('Profile picture updated successfully');
        };
        reader.readAsDataURL(file);
      }, 1500);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    // Simulate password change
    setTimeout(() => {
      setPasswordDialogOpen(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      toast.success('Password changed successfully');
    }, 1000);
  };

  const handleLogoutAllDevices = () => {
    toast.success('Logged out from all devices');
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const getDeviceIcon = (device) => {
    if (device.includes('Desktop')) return <Monitor className="h-5 w-5" />;
    if (device.includes('Mobile')) return <Smartphone className="h-5 w-5" />;
    if (device.includes('Tablet')) return <Tablet className="h-5 w-5" />;
    return <Monitor className="h-5 w-5" />;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
        <p className="text-muted-foreground mt-2 text-base">
          View and manage your personal information and account settings.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-8 md:grid-cols-2"
      >
        {/* Personal Info */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Personal Information</CardTitle>
              <CardDescription className="text-base">
                Manage your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32 border-4 border-primary/20">
                  <AvatarImage
                    src={avatarSrc || '/placeholder.svg'}
                    alt="Profile picture"
                  />
                  <AvatarFallback className="text-3xl">JD</AvatarFallback>
                </Avatar>
                <div className="relative">
                  <Input
                    type="file"
                    id="picture"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <Button
                    asChild
                    variant="outline"
                    className="text-base"
                    disabled={isUploading}
                  >
                    <label htmlFor="picture" className="cursor-pointer">
                      {isUploading ? (
                        'Uploading...'
                      ) : (
                        <>
                          <Upload className="mr-2 h-5 w-5" />
                          Change Picture
                        </>
                      )}
                    </label>
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Personal Details */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base">
                    Full Name
                  </Label>
                  <div className="flex items-center border rounded-md px-3 py-2 bg-muted/30">
                    <span className="text-base">{profileData.name}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base">
                    Email Address
                  </Label>
                  <div className="flex items-center border rounded-md px-3 py-2 bg-muted/30">
                    <span className="text-base">{profileData.email}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base">
                    Phone Number
                  </Label>
                  <div className="flex items-center border rounded-md px-3 py-2 bg-muted/30">
                    <span className="text-base">{profileData.phone}</span>
                  </div>
                </div>

                <Dialog
                  open={passwordDialogOpen}
                  onOpenChange={setPasswordDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="w-full mt-4 text-base">
                      <Key className="mr-2 h-5 w-5" />
                      Change Password
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-xl">
                        Change Password
                      </DialogTitle>
                      <DialogDescription className="text-base">
                        Enter your current password and a new password to update
                        your credentials.
                      </DialogDescription>
                    </DialogHeader>
                    <form
                      onSubmit={handlePasswordSubmit}
                      className="space-y-4 py-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword" className="text-base">
                          Current Password
                        </Label>
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          className="text-base"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-base">
                          New Password
                        </Label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          className="text-base"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-base">
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          className="text-base"
                          required
                        />
                      </div>
                      <div className="flex items-center p-3 rounded-md bg-muted/50 text-sm">
                        <AlertCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Password must be at least 8 characters long</span>
                      </div>
                      <DialogFooter className="mt-4">
                        <Button type="submit" className="text-base">
                          Update Password
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Account Info & Activity Log */}
        <motion.div variants={item} className="space-y-8">
          {/* Account Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Account Information</CardTitle>
              <CardDescription className="text-base">
                Details about your account and permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Role</p>
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-primary" />
                    <Badge
                      variant={profileData.role.toLowerCase()}
                      className="text-base"
                    >
                      {profileData.role}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Join Date</p>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    <p className="text-base font-medium">
                      {format(profileData.joinDate, 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Last Login</p>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  <p className="text-base font-medium">
                    {format(profileData.lastLogin, "MMMM d, yyyy 'at' h:mm a")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Log */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Activity Log</CardTitle>
              <CardDescription className="text-base">
                Recent account activity and security events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Password Changes */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Password Changes</h3>
                {profileData.passwordChanges.map((change, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="mt-1">
                      <Key className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-base">Password changed</p>
                      <p className="text-sm text-muted-foreground">
                        {format(change.date, "MMMM d, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Separator />

              {/* Active Sessions */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Active Sessions</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogoutAllDevices}
                    className="text-destructive border-destructive/30 hover:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout All Devices
                  </Button>
                </div>

                <div className="space-y-4">
                  {profileData.activeSessions.map((session, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-3 rounded-md border bg-card"
                    >
                      <div className="mt-1">
                        {getDeviceIcon(session.device)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-base font-medium">
                            {session.device}
                          </p>
                          {session.current && (
                            <Badge
                              variant="outline"
                              className="text-xs bg-primary/10 border-primary/30"
                            >
                              Current
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {session.location}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Last active:{' '}
                          {format(
                            session.lastActive,
                            "MMMM d, yyyy 'at' h:mm a"
                          )}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
