import { motion } from 'framer-motion';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsLoading(true);

    // // Simulate API call
    // try {
    //   await new Promise((resolve) => setTimeout(resolve, 1000));
    //   console.log('Login attempt:', { email, password, rememberMe });
    //   // Redirect to dashboard or show success
    // } catch (error) {
    //   console.error('Login failed:', error);
    // } finally {
    //   setIsLoading(false);
    // }
    navigate('/dashboard');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const backgroundImageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        delay: 0.3,
      },
    },
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-900">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full relative overflow-hidden"
        >
          <motion.img
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 1.5,
              ease: [0.4, 0, 0.2, 1],
              opacity: { duration: 1 },
            }}
            src="/images/loginImage.jpg"
            alt="Auto Parts"
            className="w-full h-full object-cover"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/40 flex items-center justify-center"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center px-8 max-w-xl"
            >
              <motion.h1
                variants={itemVariants}
                className="text-5xl font-bold text-white mb-4 leading-tight"
              >
                Kigali Auto Parts
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-xl text-white/90 leading-relaxed mb-6"
              >
                Your trusted partner for premium automotive parts and
                accessories
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6 sm:p-8 md:p-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          {/* Logo Placeholder */}
          <motion.div variants={itemVariants} className="mb-5 text-center">
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className="w-70 mx-auto flex items-center justify-center"
            >
              <img src="/images/logo.png" alt="Kigali Auto Parts Logo" />
            </motion.div>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold text-center mb-6"
          >
            Admin Dashboard
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-center mb-8"
          >
            Log in to manage your inventory and orders
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MailIcon className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kigaliautoparts.com"
                  //   required
                  className="pl-10 w-full focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-2 border-gray-200"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <LockIcon className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  //   required
                  className="pl-10 w-full focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-2 border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={setRememberMe}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-primary hover:text-primary/80"
              >
                Forgot password?
              </a>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-primary text-black hover:bg-primary/90 transition-colors duration-200 font-semibold"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    'Sign in to Dashboard'
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </form>

          <motion.div
            variants={itemVariants}
            className="mt-8 text-center text-sm text-gray-500"
          >
            <p>
              Need technical support?{' '}
              <a
                href="#"
                className="font-medium text-primary hover:text-primary/80"
              >
                Contact IT department
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
