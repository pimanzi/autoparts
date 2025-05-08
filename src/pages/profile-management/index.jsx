import { useState } from 'react';
import { motion } from 'framer-motion';
import { RoleCard } from '@/components/profile/RoleCard';
import { toast } from 'sonner';

const initialRoles = [
  {
    name: 'Admin',
    permissions: {
      products: {
        'create-product': true,
        'edit-product': true,
        'delete-product': true,
      },
      users: {
        'view-users': true,
      },
    },
  },
  {
    name: 'Manager',
    permissions: {
      products: {
        'create-product': true,
        'edit-product': true,
        'delete-product': false,
      },
      users: {
        'view-users': true,
      },
    },
  },
  {
    name: 'User',
    permissions: {
      products: {
        'create-product': false,
        'edit-product': false,
        'delete-product': false,
      },
      users: {
        'view-users': false,
      },
    },
  },
];

export default function ProfileManagementPage() {
  const [roles, setRoles] = useState(initialRoles);

  const handlePermissionUpdate = (roleIndex, newPermissions) => {
    setRoles((prevRoles) => {
      const updatedRoles = [...prevRoles];
      updatedRoles[roleIndex] = {
        ...updatedRoles[roleIndex],
        permissions: newPermissions,
      };
      return updatedRoles;
    });

    // Show success toast
    toast.success('Permissions updated successfully');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Profile Management
        </h2>
        <p className="text-muted-foreground mt-2">
          Manage roles and their associated permissions.
        </p>
      </div>

      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, staggerChildren: 0.1 }}
      >
        {roles.map((role, index) => (
          <RoleCard
            key={role.name}
            role={role.name}
            initialPermissions={role.permissions}
            onUpdate={(newPermissions) =>
              handlePermissionUpdate(index, newPermissions)
            }
          />
        ))}
      </motion.div>
    </div>
  );
}
