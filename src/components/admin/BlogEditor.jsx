import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Save, Eye, EyeOff, Calendar, Clock, Tag, Image, FileText, Settings, Wand2, AlertCircle, CheckCircle, Check } from 'lucide-react';
import { blogService } from '@/services/blogService';
import toast from 'react-hot-toast';

const BlogEditor = ({ post, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'Nitin Bharti',
    read_time: 5,
    featured: false,
    published: false,
    cover_image: ''
  });

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  
  const steps = [
    { id: 1, title: 'Content', description: 'Write your post', icon: FileText },
    { id: 2, title: 'Settings', description: 'Configure options', icon: Settings },
    { id: 3, title: 'Preview', description: 'Review & publish', icon: Eye }
  ];

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        slug: post.slug || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        author: post.author || 'Nitin Bharti',
        read_time: post.read_time || 5,
        featured: post.featured || false,
        published: post.published || false,
        cover_image: post.cover_image || ''
      });
      setSelectedCategories(post.categories || []);
      setSelectedTags(post.tags || []);
    }
  }, [post]);

  useEffect(() => {
    loadCategoriesAndTags();
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const words = formData.content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    setCharCount(formData.content.length);
    
    // Auto-calculate read time based on word count (average reading speed: 200 words per minute)
    const calculatedReadTime = Math.max(1, Math.ceil(words.length / 200));
    setFormData(prev => ({
      ...prev,
      read_time: calculatedReadTime
    }));
  }, [formData.content]);

  const loadCategoriesAndTags = async () => {
    try {
      const [categoriesData, tagsData] = await Promise.all([
        blogService.getCategories(),
        blogService.getTags()
      ]);
      setCategories(categoriesData);
      setTags(tagsData);
    } catch (error) {
      console.error('Error loading categories and tags:', error);
    }
  };

  const generateSlug = (title) => {
    if (!title || typeof title !== 'string') {
      return '';
    }
    
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 100); // Limit slug length
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'title') {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value)
      }));
    }
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.find(c => c.id === category.id)
        ? prev.filter(c => c.id !== category.id)
        : [...prev, category]
    );
  };

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.find(t => t.id === tag.id)
        ? prev.filter(t => t.id !== tag.id)
        : [...prev, tag]
    );
  };

  const nextStep = () => {
    // Validate current step before moving to next
    if (currentStep === 1) {
      // Validate Step 1: Content
      if (!formData.title.trim()) {
        setErrors({ title: 'Title is required' });
        return;
      }
      if (!formData.content.trim()) {
        setErrors({ content: 'Content is required' });
        return;
      }
    }
    
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      setErrors({}); // Clear errors when moving to next step
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({}); // Clear errors when going back
    }
  };

  const goToStep = (step) => {
    // Allow going back to previous steps, but validate if going forward
    if (step <= currentStep || step === 1) {
      setCurrentStep(step);
      setErrors({});
    } else {
      // If trying to go forward, validate current step first
      if (currentStep === 1) {
        if (!formData.title.trim() || !formData.content.trim()) {
          setErrors({ 
            title: !formData.title.trim() ? 'Title is required' : '',
            content: !formData.content.trim() ? 'Content is required' : ''
          });
          return;
        }
      }
      setCurrentStep(step);
      setErrors({});
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.trim().length < 100) {
      newErrors.content = 'Content should be at least 100 characters';
    }
    
    if (selectedCategories.length === 0) {
      newErrors.categories = 'Please select at least one category';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors before saving');
      // Go to the first step with errors
      if (errors.title || errors.content) {
        setCurrentStep(1);
      } else if (errors.categories) {
        setCurrentStep(2);
      }
      return;
    }
    
    setLoading(true);

    try {
      const postData = {
        ...formData,
        categories: selectedCategories,
        tags: selectedTags,
        publish_date: new Date().toISOString()
      };

      // Debug logging
      console.log('Post data being saved:', {
        title: postData.title,
        slug: postData.slug,
        slugLength: postData.slug?.length,
        categories: postData.categories?.length || 0,
        tags: postData.tags?.length || 0
      });

      let savedPost;
      if (post) {
        savedPost = await blogService.updateBlogPost(post.id, postData);
        toast.success('Post updated successfully!');
      } else {
        savedPost = await blogService.createBlogPost(postData);
        toast.success('Post created successfully!');
      }

      onSave(savedPost);
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('Error saving post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden border border-gray-200 dark:border-gray-700 mx-2 sm:mx-0">
        {/* Header */}
        <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="p-1.5 sm:p-2 bg-emerald-500 rounded-lg flex-shrink-0">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
                  {post ? 'Edit Post' : 'Create New Post'}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                  {post ? 'Update your blog post' : 'Write and publish a new blog post'}
                </p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="p-2 rounded-lg transition-colors duration-200 flex-shrink-0 ml-2"
              style={{
                backgroundColor: 'transparent',
                color: '#9ca3af'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f3f4f6';
                e.target.style.color = '#4b5563';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#9ca3af';
              }}
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center overflow-x-auto">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-max">
              {steps.map((step, index) => {
                const isCompleted = currentStep > step.id;
                const isCurrent = currentStep === step.id;
                const isClickable = step.id <= currentStep || step.id === 1;
                
                return (
                  <div key={step.id} className="flex items-center">
                    <button
                      onClick={() => isClickable && goToStep(step.id)}
                      className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-200 ${
                        isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                      }`}
                      style={{
                        backgroundColor: isCurrent 
                          ? '#059669' 
                          : isCompleted 
                          ? '#10b981' 
                          : '#ffffff',
                        borderColor: isCurrent 
                          ? '#059669' 
                          : isCompleted 
                          ? '#10b981' 
                          : '#d1d5db',
                        color: isCurrent || isCompleted 
                          ? '#ffffff' 
                          : '#6b7280'
                      }}
                      onMouseEnter={(e) => {
                        if (isClickable && !isCurrent && !isCompleted) {
                          e.target.style.borderColor = '#059669';
                          e.target.style.backgroundColor = '#f0fdf4';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (isClickable && !isCurrent && !isCompleted) {
                          e.target.style.borderColor = '#d1d5db';
                          e.target.style.backgroundColor = '#ffffff';
                        }
                      }}
                      disabled={!isClickable}
                    >
                      {isCompleted ? (
                        <span className="text-white font-bold text-sm sm:text-lg">✓</span>
                      ) : (
                        <span className="text-xs sm:text-sm font-semibold">{step.id}</span>
                      )}
                    </button>
                    
                    {index < steps.length - 1 && (
                      <div 
                        className="h-0.5 transition-colors duration-200"
                        style={{
                          width: '16px',
                          backgroundColor: isCompleted ? '#10b981' : '#d1d5db',
                          marginLeft: '8px',
                          marginRight: '8px'
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="text-center mt-2 sm:mt-3">
            <span className="text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-400">
              {steps[currentStep - 1].title}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1 sm:ml-2">
              Step {currentStep} of {steps.length}
            </span>
          </div>
        </div>

        {/* Content */}
        <div 
          className="flex-1 overflow-y-auto max-h-[45vh] sm:max-h-[50vh]"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#d1d5db #f3f4f6'
          }}
        >
          <div className="p-3 sm:p-6">

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* General Error Display */}
              {Object.keys(errors).length > 0 && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 sm:p-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-400 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-medium text-red-800 dark:text-red-200 mb-1 sm:mb-2">
                        Please fix the following errors:
                      </h4>
                      <ul className="text-xs sm:text-sm text-red-700 dark:text-red-300 space-y-1">
                        {errors.title && <li>• {errors.title}</li>}
                        {errors.slug && <li>• {errors.slug}</li>}
                        {errors.content && <li>• {errors.content}</li>}
                        {errors.categories && <li>• {errors.categories}</li>}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: Content */}
              {currentStep === 1 && (
                <div className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
              <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-gray-700 border rounded-lg text-sm sm:text-base text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          errors.title ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                        }`}
                        placeholder="Enter your post title..."
                  required
                />
                      {errors.title && (
                        <p className="mt-1 text-xs sm:text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                          {errors.title}
                        </p>
                      )}
              </div>

              <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                  Slug <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                            errors.slug ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                          }`}
                          placeholder="post-url-slug"
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 dark:text-gray-400">
                    {formData.slug.length}/100
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  URL: /blog/{formData.slug || 'your-slug-here'}
                </p>
                      {errors.slug && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.slug}
                        </p>
                      )}
              </div>
            </div>

            <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Excerpt
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows={3}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Brief description of your post..."
              />
            </div>

            <div>
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                Content <span className="text-red-500">*</span>
              </label>
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>{wordCount} words</span>
                        <span>{charCount} characters</span>
                      </div>
                    </div>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                      rows={12}
                      className={`w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.content ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                      }`}
                      placeholder="Write your post content here..."
                required
              />
                    {errors.content && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.content}
                      </p>
                    )}
                  </div>
            </div>
              )}

              {/* Step 2: Settings */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                  Read Time (minutes)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="read_time"
                    value={formData.read_time}
                    onChange={handleInputChange}
                    min="1"
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 dark:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg text-sm sm:text-base text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 dark:text-gray-400">
                    Auto
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Automatically calculated based on content length
                </p>
              </div>

              <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cover Image URL
                </label>
                      <div className="relative">
                <input
                  type="url"
                  name="cover_image"
                  value={formData.cover_image}
                  onChange={handleInputChange}
                          className="w-full px-4 py-3 pl-10 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="https://example.com/image.jpg"
                />
                        <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
              </div>

                  <div className="flex items-center gap-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                        className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                      <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Featured Post</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="published"
                    checked={formData.published}
                    onChange={handleInputChange}
                        className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                      <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Published</span>
                </label>
            </div>

            {/* Categories */}
            <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
                      Categories <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {(categories || []).map(category => {
                  const isSelected = selectedCategories.find(c => c.id === category.id);
                  return (
                    <div
                      key={category.id}
                      onClick={() => handleCategoryToggle(category)}
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer hover:scale-105 transition-all duration-200 ${
                        isSelected
                          ? 'text-white border border-transparent'
                          : 'bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'
                      }`}
                      style={{
                        backgroundColor: isSelected ? category.color : undefined
                      }}
                    >
                      {category.name}
                    </div>
                  );
                })}
              </div>
                    {errors.categories && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.categories}
                      </p>
                    )}
            </div>

            {/* Tags */}
            <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {(tags || []).map(tag => {
                  const isSelected = selectedTags.find(t => t.id === tag.id);
                  return (
                    <div
                      key={tag.id}
                      onClick={() => handleTagToggle(tag)}
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer hover:scale-105 transition-all duration-200 ${
                        isSelected
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700'
                          : 'bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'
                      }`}
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag.name}
                    </div>
                  );
                })}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Preview */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {formData.title || 'Untitled Post'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {formData.excerpt || 'No excerpt provided'}
                    </p>
                    <div className="prose dark:prose-invert max-w-none">
                      <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                        {formData.content || 'No content provided'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="px-3 sm:px-6 py-3 sm:py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-between items-center">
            <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>~{formData.read_time} min read</span>
              </div>
              <div className="flex items-center gap-1">
                <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{wordCount} words</span>
              </div>
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onCancel}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors duration-200 border flex-1 sm:flex-none"
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
              
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors duration-200 border flex-1 sm:flex-none"
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
                  Previous
                </button>
              )}
              
              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium text-white rounded-lg transition-colors duration-200 flex-1 sm:flex-none"
                  style={{ backgroundColor: '#059669' }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#047857';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#059669';
                  }}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-1 sm:gap-2 flex-1 sm:flex-none"
                  style={{ 
                    backgroundColor: loading ? '#6ee7b7' : '#059669'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.target.style.backgroundColor = '#047857';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.target.style.backgroundColor = '#059669';
                    }
                  }}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                      <span className="hidden sm:inline">Saving...</span>
                      <span className="sm:hidden">Save</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">{post ? 'Update Post' : 'Create Post'}</span>
                      <span className="sm:hidden">{post ? 'Update' : 'Create'}</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
