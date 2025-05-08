import { motion } from 'framer-motion';
import { Package, DollarSign, Users, Warehouse } from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/lib/utils';

const stats = [
  {
    title: 'Total Products',
    value: 1284,
    change: 12,
    icon: Package,
  },
  {
    title: 'Total Sales',
    value: 45231.89,
    change: 8.2,
    icon: DollarSign,
    format: formatCurrency,
  },
  {
    title: 'Active Users',
    value: 573,
    change: 5,
    icon: Users,
  },
  {
    title: 'Inventory Value',
    value: 128450,
    change: 3.1,
    icon: Warehouse,
    format: formatCurrency,
  },
];

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

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your auto parts business
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.title}
            variants={item}
            className="rounded-xl border bg-card p-6 text-card-foreground shadow"
          >
            <div className="flex items-center justify-between">
              <stat.icon className="h-5 w-5 text-muted-foreground" />
              <span
                className={`text-sm font-medium ${
                  stat.change > 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {formatPercentage(stat.change)}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">
                {stat.format ? stat.format(stat.value) : stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Placeholder for Sales Chart */}
      <div className="rounded-xl border bg-card p-6 text-card-foreground shadow">
        <h3 className="font-semibold mb-4">Sales Overview</h3>
        <div className="h-[300px] flex items-center justify-center bg-accent/10 rounded-lg">
          Chart placeholder - Will implement with real data
        </div>
      </div>

      {/* Recent Activities */}
      <div className="rounded-xl border bg-card p-6 text-card-foreground shadow">
        <h3 className="font-semibold mb-4">Recent Activities</h3>
        <div className="space-y-4">
          {[
            'New product added - 2 hours ago',
            'Stock updated for SKU #12345 - 3 hours ago',
            'New user registered - 5 hours ago',
            'Large order processed #789 - 6 hours ago',
          ].map((activity, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center space-x-2 text-sm"
            >
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>{activity}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
