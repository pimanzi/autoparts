import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const permissionDescriptions = {
  'create-product': 'Ability to add new products to the system',
  'edit-product': 'Ability to modify existing product details',
  'delete-product': 'Ability to remove products from the system',
  'view-users': 'Ability to view user information and details',
};

const PermissionCheckbox = ({
  id,
  label,
  checked,
  disabled,
  onCheckedChange,
}) => {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-accent">
            <Checkbox
              id={id}
              checked={checked}
              onCheckedChange={onCheckedChange}
              disabled={disabled}
            />
            <label
              htmlFor={id}
              className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">{permissionDescriptions[id] || label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export function RoleCard({ role, initialPermissions, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [permissions, setPermissions] = useState(initialPermissions);

  const handlePermissionChange = (category, permission, checked) => {
    setPermissions((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [permission]: checked,
      },
    }));
  };

  const handleSave = () => {
    onUpdate(permissions);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setPermissions(initialPermissions);
    setIsEditing(false);
  };

  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'border-l-red-500';
      case 'manager':
        return 'border-l-blue-500';
      case 'user':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn('border-l-4', getRoleColor(role))}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl font-bold font-poppins">
            {role}
          </CardTitle>
          {isEditing ? (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                className="text-destructive"
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Edit Permissions
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>
            <TabsContent value="products" className="space-y-4 mt-4">
              <div className="grid gap-4">
                <PermissionCheckbox
                  id="create-product"
                  label="Create Product"
                  checked={permissions.products['create-product']}
                  onCheckedChange={(checked) =>
                    handlePermissionChange(
                      'products',
                      'create-product',
                      checked
                    )
                  }
                  disabled={!isEditing}
                />
                <PermissionCheckbox
                  id="edit-product"
                  label="Edit Product"
                  checked={permissions.products['edit-product']}
                  onCheckedChange={(checked) =>
                    handlePermissionChange('products', 'edit-product', checked)
                  }
                  disabled={!isEditing}
                />
                <PermissionCheckbox
                  id="delete-product"
                  label="Delete Product"
                  checked={permissions.products['delete-product']}
                  onCheckedChange={(checked) =>
                    handlePermissionChange(
                      'products',
                      'delete-product',
                      checked
                    )
                  }
                  disabled={!isEditing}
                />
              </div>
            </TabsContent>
            <TabsContent value="users" className="space-y-4 mt-4">
              <div className="grid gap-4">
                <PermissionCheckbox
                  id="view-users"
                  label="View Users"
                  checked={permissions.users['view-users']}
                  onCheckedChange={(checked) =>
                    handlePermissionChange('users', 'view-users', checked)
                  }
                  disabled={!isEditing}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}
