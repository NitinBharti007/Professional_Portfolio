import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Tag, ArrowRight, Search, Filter, Grid, List, BookOpen } from 'lucide-react';
import { blogService } from '@/services/blogService';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const navigate = useNavigate();

  const postsPerPage = 9;

  useEffect(() => {
    loadData();
  }, [selectedCategory, currentPage]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [postsData, categoriesData] = await Promise.all([
        blogService.getBlogPosts({
          category: selectedCategory === 'All' ? null : selectedCategory,
          limit: postsPerPage,
          offset: (currentPage - 1) * postsPerPage
        }),
        blogService.getCategories()
      ]);
      setPosts(postsData);
      setCategories(categoriesData);
      
      // Get total count for pagination
      const allPosts = await blogService.getBlogPosts({
        category: selectedCategory === 'All' ? null : selectedCategory
      });
      setTotalPosts(allPosts.length);
    } catch (error) {
      console.error('Error loading blog data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchValue = searchTerm) => {
    if (!searchValue.trim()) {
      loadData();
      return;
    }

    setLoading(true);
    try {
      const searchResults = await blogService.searchBlogPosts(searchValue);
      setPosts(searchResults);
    } catch (error) {
      console.error('Error searching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Real-time search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        handleSearch(searchTerm);
      } else {
        // Only load data if we're not already loading
        if (!loading) {
          loadData();
        }
      }
    }, 300); // 300ms delay

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleCategoryFilter = (categorySlug) => {
    setSelectedCategory(categorySlug);
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden pt-24">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            {/* Welcome Badge */}
            <div className="inline-flex items-center px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-full mb-8">
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 mr-2" />
              <span className="text-emerald-400 text-xs sm:text-sm font-medium">
                Latest Articles & Insights
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 animate-gradient">Blog</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              Thoughts, tutorials, and insights about web development, technology, and my journey as a software developer.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-20">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-14 pr-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base transition-all duration-300 group-hover:bg-white/15"
                />
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300 group-hover:text-emerald-400 transition-colors duration-300" />
              </div>
            </div>

          </div>
        </section>

        {/* Filters and Controls */}
        <section className="py-4 sm:py-6 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-sm border-y border-gray-700/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
              {/* Category Filter */}
              <div className="space-y-3 lg:space-y-0">
                <h3 className="text-xs sm:text-sm font-medium text-emerald-400 lg:hidden">Filter by Category</h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <Button
                    variant={selectedCategory === 'All' ? "default" : "outline"}
                    onClick={() => handleCategoryFilter('All')}
                    className={`rounded-full text-xs sm:text-sm px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 transition-all duration-200 ${
                      selectedCategory === 'All' 
                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg hover:shadow-emerald-500/25' 
                        : 'border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400 bg-transparent'
                    }`}
                    style={{
                      backgroundColor: selectedCategory === 'All' ? undefined : 'transparent'
                    }}
                  >
                    All
                  </Button>
                  {categories.map(category => (
                    <Button
                      key={category.slug}
                      variant={selectedCategory === category.slug ? "default" : "outline"}
                      onClick={() => handleCategoryFilter(category.slug)}
                      className={`rounded-full text-xs sm:text-sm px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 transition-all duration-200 ${
                        selectedCategory === category.slug 
                          ? 'text-white shadow-lg' 
                          : 'border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400 bg-transparent'
                      }`}
                      style={{ 
                        backgroundColor: selectedCategory === category.slug ? category.color : 'transparent'
                      }}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* View Mode Toggle - Hidden on mobile and small screens */}
              <div className="hidden md:flex items-center justify-between lg:justify-start gap-3 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-emerald-400 text-xs sm:text-sm hidden lg:block">View:</span>
                  <div className="flex bg-gray-800/50 border border-emerald-500/20 rounded-lg p-0.5 sm:p-1 gap-1 sm:gap-1.5">
                    <Button
                      variant={viewMode === 'grid' ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className={`px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 transition-all duration-200 ${
                        viewMode === 'grid' 
                          ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg' 
                          : 'text-emerald-400 hover:text-white hover:bg-emerald-500/20 bg-transparent'
                      }`}
                      style={{
                        backgroundColor: viewMode === 'grid' ? undefined : 'transparent'
                      }}
                    >
                      <Grid className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className={`px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 transition-all duration-200 ${
                        viewMode === 'list' 
                          ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg' 
                          : 'text-emerald-400 hover:text-white hover:bg-emerald-500/20 bg-transparent'
                      }`}
                      style={{
                        backgroundColor: viewMode === 'list' ? undefined : 'transparent'
                      }}
                    >
                      <List className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
                <p className="mt-4 text-gray-300">Loading blog posts...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">No posts found</h3>
                <p className="text-gray-400 mb-6">
                  {searchTerm ? `No posts match "${searchTerm}"` : 'No blog posts available yet.'}
                </p>
                {searchTerm && (
                  <Button onClick={() => setSearchTerm('')}>
                    Clear Search
                  </Button>
                )}
              </div>
            ) : (
              <>
                {/* Posts Grid/List */}
                <div className={viewMode === 'grid' 
                  ? "grid sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8" 
                  : "space-y-6 md:space-y-8"
                }>
                  {posts.map(post => (
                    <div key={post.id} className={`group relative ${viewMode === 'grid' ? 'h-full' : ''}`}>
                      {/* Card Glow Effect */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                      
                      <Card 
                        className={`relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-700 h-full ${
                          viewMode === 'list' ? 'flex flex-col sm:flex-row' : 'flex flex-col'
                        }`}
                        onClick={() => navigate(`/blog/${post.slug}`)}
                      >
                        {/* Cover Image */}
                        {post.cover_image && (
                          <div className={`w-full overflow-hidden ${
                            viewMode === 'list' 
                              ? 'h-48 sm:h-full sm:w-80 sm:flex-shrink-0' 
                              : 'h-48'
                          } bg-gray-50 dark:bg-gray-800`}>
                            <img 
                              src={post.cover_image} 
                              alt={post.title}
                              className="w-full h-full object-contain object-center transition-transform duration-300"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                        
                        <div className={`${viewMode === 'list' ? 'p-6 sm:p-8 flex-1' : 'p-6 lg:p-8 flex-1 flex flex-col'} `}>
                          {/* Categories and Featured Badge */}
                          <div className="flex items-center gap-2 mb-4">
                            {(post.categories || []).slice(0, 2).map(category => (
                              <Badge 
                                key={category.id} 
                                variant="secondary" 
                                className="text-xs px-3 py-1.5 rounded-full font-medium"
                                style={{ backgroundColor: category.color + '15', color: category.color, borderColor: category.color + '30' }}
                              >
                                {category.name}
                              </Badge>
                            ))}
                            {post.featured && (
                              <Badge className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
                                ⭐ Featured
                              </Badge>
                            )}
                          </div>
                          
                          {/* Title */}
                          <h3 className={`font-bold text-gray-900 dark:text-white mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-tight ${
                            viewMode === 'list' ? 'text-xl sm:text-2xl' : 'text-xl lg:text-2xl'
                          }`}>
                            {post.title}
                          </h3>
                          
                          {/* Excerpt */}
                          <p className={`text-gray-600 dark:text-gray-300 mb-6 leading-relaxed flex-grow ${
                            viewMode === 'list' ? 'line-clamp-2 text-base sm:text-lg' : 'line-clamp-3 text-base lg:text-lg'
                          }`}>
                            {post.excerpt}
                          </p>
                          
                          {/* Meta Info */}
                          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                                <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                              </div>
                              <span className="font-medium">{formatDate(post.publish_date)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                                <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                              </div>
                              <span className="font-medium">{post.read_time} min read</span>
                            </div>
                          </div>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {(post.tags || []).slice(0, 2).map(tag => (
                              <Badge key={tag.id} variant="outline" className="text-xs px-3 py-1.5 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-emerald-300 dark:hover:border-emerald-600 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                                <Tag className="w-3 h-3 mr-1.5" />
                                {tag.name}
                              </Badge>
                            ))}
                            {(post.tags || []).length > 2 && (
                              <Badge variant="outline" className="text-xs px-3 py-1.5 border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400">
                                +{(post.tags || []).length - 2}
                              </Badge>
                            )}
                          </div>
                          
                          {/* Read More Button - Always at bottom */}
                          <div className="mt-auto">
                            <Button 
                              className={`bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 hover:from-emerald-500 hover:to-cyan-500 text-gray-700 dark:text-gray-300 hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:scale-105 ${
                                viewMode === 'list' ? 'w-auto' : 'w-full'
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/blog/${post.slug}`);
                              }}
                            >
                              Read More
                              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-sm border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
                      >
                        Previous
                      </Button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 text-sm ${
                            currentPage === page 
                              ? 'bg-emerald-500 hover:bg-emerald-600' 
                              : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                          }`}
                        >
                          {page}
                        </Button>
                      ))}
                      
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-sm border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
