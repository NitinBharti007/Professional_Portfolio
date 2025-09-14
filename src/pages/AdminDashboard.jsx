import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { blogService } from '@/services/blogService';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BlogEditor from '@/components/admin/BlogEditor';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Search, 
  Filter,
  Calendar,
  Clock,
  Tag,
  LogOut,
  BarChart3,
  FileText,
  Users,
  ExternalLink,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import AdminHeader from '@/components/layout/AdminHeader';
import toast, { Toaster } from 'react-hot-toast';

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'published', 'draft'
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const hasShownWelcomeToast = useRef(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadPosts();
  }, []);

  // Show welcome toast when user first arrives at dashboard (only after login, not on refresh)
  useEffect(() => {
    if (user && !hasShownWelcomeToast.current) {
      // Check if this is a fresh login (not a page refresh)
      const isFreshLogin = sessionStorage.getItem('freshLogin') === 'true';
      
      if (isFreshLogin) {
        hasShownWelcomeToast.current = true;
        toast.success('Login successful! Welcome back.');
        // Clear the session storage flag
        sessionStorage.removeItem('freshLogin');
      }
    }
  }, [user]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const postsData = await blogService.getAllBlogPosts();
      setPosts(postsData);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;
    
    try {
      await blogService.deleteBlogPost(postToDelete.id);
      setPosts(posts.filter(post => post.id !== postToDelete.id));
      toast.success('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Error deleting post');
    } finally {
      setShowDeleteDialog(false);
      setPostToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
    setPostToDelete(null);
  };

  const handleToggleStatus = async (postId, currentStatus) => {
    try {
      await blogService.togglePostStatus(postId, !currentStatus);
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, published: !currentStatus }
          : post
      ));
    } catch (error) {
      console.error('Error toggling post status:', error);
      alert('Error updating post status');
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'published' && post.published) ||
                         (filterStatus === 'draft' && !post.published);
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: posts.length,
    published: posts.filter(p => p.published).length,
    drafts: posts.filter(p => !p.published).length,
    featured: posts.filter(p => p.featured).length
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Logged out successfully! See you next time.');
    setTimeout(() => {
      navigate('/admin/login');
    }, 1000);
  };

  const handleSavePost = (savedPost) => {
    if (editingPost) {
      setPosts(posts.map(post => post.id === savedPost.id ? savedPost : post));
    } else {
      setPosts([savedPost, ...posts]);
    }
    setShowCreateForm(false);
    setEditingPost(null);
  };

  const handleCancelEdit = () => {
    setShowCreateForm(false);
    setEditingPost(null);
  };

  useEffect(() => {
    if (!user && !loading) {
      navigate('/admin/login');
    }
  }, [user, loading, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Pattern - Matching Portfolio Sections */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-transparent to-cyan-50/30 dark:from-emerald-900/5 dark:via-transparent dark:to-cyan-900/5"></div>
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-bl from-emerald-100/20 to-transparent dark:from-emerald-800/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-tr from-cyan-100/20 to-transparent dark:from-cyan-800/10 rounded-full blur-3xl"></div>
      
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
      <AdminHeader onSignOut={handleSignOut} />
      
      <main className="pt-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Dashboard Header */}
          <div className="mb-6 sm:mb-8">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl shadow-sm">
              <div className="px-4 py-4 sm:px-6 sm:py-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
                  {/* Left Section - Title and Description */}
                  <div className="flex-1">
                    <div className="mb-3 sm:mb-4">
                      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                        <span className="bg-gradient-to-r from-gray-900 via-emerald-600 to-cyan-600 dark:from-white dark:via-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
                          Blog Dashboard
                        </span>
                      </h1>
                      <div className="flex items-center gap-2 mt-1 sm:mt-2">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <p className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                          Content Management System
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
                      Create, edit, and manage your blog posts with ease. Monitor your content performance and grow your audience.
                    </p>
                  </div>
                  
                  {/* Right Section - Action Button */}
                  <div className="flex-shrink-0 w-full sm:w-auto">
                    <button
                      onClick={() => setShowCreateForm(true)}
                      className="group relative inline-flex items-center justify-center w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                      <span className="relative z-10 group-hover:translate-x-0.5 transition-transform duration-300">Create New Post</span>
                    </button>
                  </div>
                </div>
                
                {/* Quick Stats Row */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
                    <div className="text-center">
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">{stats.total}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">Total Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">{stats.published}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">Published</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">{stats.drafts}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">Drafts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">{stats.featured}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">Featured</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Filters and Search */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
              
              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2 lg:flex-nowrap">
                <button
                  onClick={() => setFilterStatus('all')}
                  className="px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors duration-200 border flex-1 lg:flex-none min-w-0"
                  style={{
                    backgroundColor: filterStatus === 'all' ? '#059669' : '#ffffff',
                    color: filterStatus === 'all' ? '#ffffff' : '#374151',
                    borderColor: filterStatus === 'all' ? '#059669' : '#d1d5db'
                  }}
                  onMouseEnter={(e) => {
                    if (filterStatus !== 'all') {
                      e.target.style.backgroundColor = '#f9fafb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (filterStatus !== 'all') {
                      e.target.style.backgroundColor = '#ffffff';
                    }
                  }}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterStatus('published')}
                  className="px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors duration-200 border flex-1 lg:flex-none min-w-0"
                  style={{
                    backgroundColor: filterStatus === 'published' ? '#059669' : '#ffffff',
                    color: filterStatus === 'published' ? '#ffffff' : '#374151',
                    borderColor: filterStatus === 'published' ? '#059669' : '#d1d5db'
                  }}
                  onMouseEnter={(e) => {
                    if (filterStatus !== 'published') {
                      e.target.style.backgroundColor = '#f9fafb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (filterStatus !== 'published') {
                      e.target.style.backgroundColor = '#ffffff';
                    }
                  }}
                >
                  Published
                </button>
                <button
                  onClick={() => setFilterStatus('draft')}
                  className="px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors duration-200 border flex-1 lg:flex-none min-w-0"
                  style={{
                    backgroundColor: filterStatus === 'draft' ? '#059669' : '#ffffff',
                    color: filterStatus === 'draft' ? '#ffffff' : '#374151',
                    borderColor: filterStatus === 'draft' ? '#059669' : '#d1d5db'
                  }}
                  onMouseEnter={(e) => {
                    if (filterStatus !== 'draft') {
                      e.target.style.backgroundColor = '#f9fafb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (filterStatus !== 'draft') {
                      e.target.style.backgroundColor = '#ffffff';
                    }
                  }}
                >
                  Drafts
                </button>
              </div>
            </div>
          </div>

          {/* Posts Table */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Blog Posts</h2>
            </div>
            <div className="p-6">
              
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto"></div>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">Loading posts...</p>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No posts found</p>
                </div>
              ) : (
                <>
                  {/* Desktop Table View */}
                  <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                    <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[200px]">Title</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[120px]">Status</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[140px]">Date</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[150px]">Categories</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[180px]">Actions</th>
                      </tr>
                    </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredPosts.map(post => (
                          <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <td className="py-4 px-4 min-w-[200px]">
                            <div>
                                <h3 className="font-medium text-gray-900 dark:text-white mb-1 line-clamp-1">
                                {post.title}
                              </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                                {post.excerpt}
                              </p>
                            </div>
                          </td>
                            <td className="py-4 px-4 min-w-[120px]">
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant={post.published ? "default" : "secondary"}
                                  className={post.published ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"}
                              >
                                {post.published ? 'Published' : 'Draft'}
                              </Badge>
                              {post.featured && (
                                  <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs">
                                  Featured
                                </Badge>
                              )}
                            </div>
                          </td>
                            <td className="py-4 px-4 min-w-[140px]">
                              <div className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                              <div className="flex items-center gap-1 mb-1">
                                  <Calendar className="w-4 h-4 flex-shrink-0" />
                                  <span className="truncate">{formatDate(post.publish_date)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4 flex-shrink-0" />
                                  <span>{post.read_time} min</span>
                                </div>
                            </div>
                          </td>
                            <td className="py-4 px-4 min-w-[150px]">
                            <div className="flex flex-wrap gap-1">
                              {(post.categories || []).slice(0, 2).map(category => (
                                <Badge 
                                  key={category.id} 
                                  variant="outline" 
                                    className="text-xs whitespace-nowrap"
                                  style={{ 
                                    borderColor: category.color,
                                    color: category.color 
                                  }}
                                >
                                  {category.name}
                                </Badge>
                              ))}
                              {(post.categories || []).length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{(post.categories || []).length - 2}
                                </Badge>
                              )}
                            </div>
                          </td>
                            <td className="py-4 px-4 min-w-[180px]">
                            <div className="flex items-center gap-2">
                                <div className="inline-flex items-center justify-center p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600 flex-shrink-0 transition-colors duration-200 cursor-pointer"
                                onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                                  title="View Post"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </div>
                                <div className="inline-flex items-center justify-center p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600 flex-shrink-0 transition-colors duration-200 cursor-pointer"
                                onClick={() => setEditingPost(post)}
                                  title="Edit Post"
                              >
                                <Edit className="w-4 h-4" />
                                </div>
                                <div className="inline-flex items-center justify-center p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600 flex-shrink-0 transition-colors duration-200 cursor-pointer"
                                onClick={() => handleToggleStatus(post.id, post.published)}
                                  title={post.published ? "Unpublish" : "Publish"}
                                >
                                  {post.published ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                                </div>
                              <div className="inline-flex items-center justify-center p-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800 flex-shrink-0 transition-colors duration-200 cursor-pointer"
                                onClick={() => handleDeleteClick(post)}
                                title="Delete Post"
                              >
                                <Trash2 className="w-4 h-4" />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                  {/* Mobile Card View */}
                  <div className="lg:hidden space-y-4">
                    {filteredPosts.map(post => (
                      <div key={post.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        {/* Header with title and status */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1 line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                              {post.excerpt}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                            <Badge 
                              variant={post.published ? "default" : "secondary"}
                              className={post.published ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs" : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 text-xs"}
                            >
                              {post.published ? 'Published' : 'Draft'}
                            </Badge>
                            {post.featured && (
                              <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs">
                                Featured
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Date and read time */}
                        <div className="flex items-center gap-4 mb-3 text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(post.publish_date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{post.read_time} min</span>
                          </div>
                        </div>

                        {/* Categories */}
                        {(post.categories || []).length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {(post.categories || []).slice(0, 3).map(category => (
                              <Badge 
                                key={category.id} 
                                variant="outline" 
                                className="text-xs"
                                style={{ 
                                  borderColor: category.color,
                                  color: category.color 
                                }}
                              >
                                {category.name}
                              </Badge>
                            ))}
                            {(post.categories || []).length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{(post.categories || []).length - 3}
                              </Badge>
                            )}
                          </div>
                        )}

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                          <div className="inline-flex items-center justify-center p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600 flex-shrink-0 transition-colors duration-200 cursor-pointer"
                            onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                            title="View Post"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </div>
                          <div className="inline-flex items-center justify-center p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600 flex-shrink-0 transition-colors duration-200 cursor-pointer"
                            onClick={() => setEditingPost(post)}
                            title="Edit Post"
                          >
                            <Edit className="w-4 h-4" />
                          </div>
                          <div className="inline-flex items-center justify-center p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600 flex-shrink-0 transition-colors duration-200 cursor-pointer"
                            onClick={() => handleToggleStatus(post.id, post.published)}
                            title={post.published ? "Unpublish" : "Publish"}
                          >
                            {post.published ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                          </div>
                          <div className="inline-flex items-center justify-center p-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800 flex-shrink-0 transition-colors duration-200 cursor-pointer"
                            onClick={() => handleDeleteClick(post)}
                            title="Delete Post"
                          >
                            <Trash2 className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Blog Editor Modal */}
      {(showCreateForm || editingPost) && (
        <BlogEditor
          post={editingPost}
          onSave={handleSavePost}
          onCancel={handleCancelEdit}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-lg sm:rounded-xl shadow-xl max-w-sm sm:max-w-md w-full p-4 sm:p-6 border border-white/20 dark:border-gray-700/50">
            <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-4">
              <div className="p-2 sm:p-3 bg-red-100 dark:bg-red-900/30 rounded-full flex-shrink-0">
                <Trash2 className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                  Delete Post
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                  This action cannot be undone
                </p>
              </div>
            </div>
            
            <div className="mb-4 sm:mb-6">
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-3">
                Are you sure you want to delete this post?
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1 line-clamp-2">
                  {postToDelete?.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                  {postToDelete?.excerpt}
                </p>
              </div>
            </div>
            
            <div className="flex flex-row gap-2 sm:gap-3">
              <button
                onClick={handleDeleteCancel}
                className="flex-1 px-4 py-2.5 sm:py-2 text-sm font-medium rounded-lg transition-colors duration-200 border"
                style={{ 
                  backgroundColor: '#ffffff',
                  color: '#374151',
                  borderColor: '#d1d5db'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f9fafb';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#ffffff';
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 px-4 py-2.5 sm:py-2 text-sm font-medium text-white rounded-lg transition-colors duration-200"
                style={{ backgroundColor: '#dc2626' }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#b91c1c';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#dc2626';
                }}
              >
                Delete Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
