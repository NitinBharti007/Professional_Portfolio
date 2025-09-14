import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasShownSuccessToast = useRef(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await signIn(email, password);
      
      if (error) {
        setError(error.message);
        toast.error('Login failed. Please check your credentials.');
      } else if (data.user) {
        // Set flag to indicate fresh login
        sessionStorage.setItem('freshLogin', 'true');
        // Navigate immediately without toast here
        navigate('/admin');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>
      
      {/* Floating Elements - Hidden on mobile for better performance */}
      {/* <div className="hidden sm:block absolute top-20 left-4 sm:left-10 w-16 sm:w-20 h-16 sm:h-20 bg-emerald-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="hidden sm:block absolute top-40 right-4 sm:right-20 w-24 sm:w-32 h-24 sm:h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="hidden sm:block absolute bottom-20 left-1/4 w-20 sm:w-24 h-20 sm:h-24 bg-emerald-400/10 rounded-full blur-xl animate-pulse delay-2000"></div> */}
      
      <main className="relative z-10 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 min-h-screen">
        <div className="w-full max-w-sm sm:max-w-md">
          {/* Welcome Badge */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-full mb-4 sm:mb-6">
              <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 mr-2" />
              <span className="text-emerald-400 text-xs sm:text-sm font-medium">
                Admin Access
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-3 leading-tight">
              Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 animate-gradient">Back</span>
            </h1>
            <p className="text-gray-300 text-sm sm:text-base">Sign in to manage your blog content</p>
          </div>

          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-2xl">

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {error && (
                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-red-500/10 border border-red-500/20 rounded-lg sm:rounded-xl text-red-400 backdrop-blur-sm">
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">{error}</span>
                </div>
              )}

              <div className="space-y-1 sm:space-y-2">
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-200">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-emerald-400 transition-colors" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-gray-800/50 border border-gray-600 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-gray-500 focus:bg-gray-800/70 text-sm sm:text-base"
                    placeholder="admin@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-200">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-emerald-400 transition-colors" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 sm:pl-12 pr-8 sm:pr-10 py-2.5 sm:py-3 bg-gray-800/50 border border-gray-600 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-gray-500 focus:bg-gray-800/70 text-sm sm:text-base"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-400 transition-colors p-0 bg-transparent border-0 outline-none hover:bg-transparent focus:bg-transparent active:bg-transparent"
                    style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" style={{ backgroundColor: 'transparent' }} /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" style={{ backgroundColor: 'transparent' }} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-emerald-500/25 transform hover:scale-[1.02] group relative overflow-hidden text-sm sm:text-base"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {loading ? (
                  <div className="flex items-center justify-center relative z-10">
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2 sm:mr-3"></div>
                    <span className="text-xs sm:text-sm">Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center relative z-10">
                    <span>Sign In</span>
                    <Lock className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </div>
                )}
              </button>
            </form>

            <div className="mt-6 sm:mt-8 text-center">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center text-gray-400 hover:text-white text-xs sm:text-sm font-medium transition-all duration-300 hover:translate-x-1 group bg-transparent border-none outline-none hover:bg-transparent focus:bg-transparent active:bg-transparent"
                style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
              >
                <span className="mr-1 sm:mr-2 group-hover:-translate-x-1 transition-transform duration-300">←</span>
                Back to Portfolio
              </button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminLogin;
