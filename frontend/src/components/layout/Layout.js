import React, { useState, useEffect } from 'react';
import { Header, Sidebar, Footer, Loader } from '../common/Common';
import { AlertCircle, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Main Layout Component
export const MainLayout = ({ children, loading = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pageError, setPageError] = useState(null);

  // Handle window resize for mobile menu
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" 
               onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 flex w-full flex-col bg-white">
            <div className="flex items-center justify-between h-16 px-4 border-b">
              <span className="text-xl font-bold">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 md:ml-64">
          {/* Error Alert */}
          {pageError && (
            <Alert variant="destructive" className="m-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{pageError}</AlertDescription>
              <button 
                onClick={() => setPageError(null)}
                className="absolute right-2 top-2"
              >
                <X className="h-4 w-4" />
              </button>
            </Alert>
          )}

          {/* Page Content */}
          <div className="px-4 py-6 md:px-6 lg:px-8">
            {children}
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
};

// Auth Layout Component
export const AuthLayout = ({ children, loading = false }) => {
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2">
              <svg 
                className="h-10 w-10 text-blue-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
              <span className="text-2xl font-bold">MedixLink</span>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Error Layout Component
export const ErrorLayout = ({ error, resetError }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Oops!</h1>
          <p className="mt-2 text-base text-gray-600">
            {error?.message || 'Something went wrong'}
          </p>
          {resetError && (
            <button
              onClick={resetError}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Loading Layout Component
export const LoadingLayout = ({ message = 'Loading...' }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader size="large" />
        <p className="mt-4 text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
};

// Simple Layout Component (for minimal pages)
export const SimpleLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default {
  MainLayout,
  AuthLayout,
  ErrorLayout,
  LoadingLayout,
  SimpleLayout
};