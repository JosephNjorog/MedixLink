import React, { useState } from 'react';
import { 
  Home, 
  Calendar, 
  FileText, 
  Heart, 
  Users, 
  Video, 
  CreditCard, 
  Settings, 
  Menu, 
  Bell, 
  Search,
  X,
  Loader as LoaderIcon
} from 'lucide-react';

// Header Component
export const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex h-16 items-center px-4 md:px-6">
        {/* Mobile menu button */}
        <button className="mr-2 rounded-md p-2 md:hidden">
          <Menu className="h-6 w-6" />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold">MedixLink</span>
        </div>

        {/* Search */}
        <div className="ml-auto flex items-center space-x-4">
          <div className="hidden md:flex relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input 
              type="search" 
              placeholder="Search..." 
              className="pl-8 h-9 w-64 rounded-md border border-gray-200"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button 
              className="rounded-full p-2 hover:bg-gray-100"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="p-4">
                  <h3 className="text-sm font-medium">Notifications</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="h-2 w-2 mt-2 rounded-full bg-blue-500"></div>
                      <div>
                        <p className="text-sm">Appointment reminder with Dr. Smith</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    {/* Add more notifications as needed */}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <button className="flex items-center gap-2">
            <img 
              src="/api/placeholder/32/32" 
              alt="User" 
              className="h-8 w-8 rounded-full"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

// Sidebar Component
export const Sidebar = () => {
  const menuItems = [
    { icon: <Home className="h-5 w-5" />, label: 'Dashboard', path: '/' },
    { icon: <Calendar className="h-5 w-5" />, label: 'Appointments', path: '/appointments' },
    { icon: <FileText className="h-5 w-5" />, label: 'Health Records', path: '/records' },
    { icon: <Heart className="h-5 w-5" />, label: 'Insurance', path: '/insurance' },
    { icon: <Video className="h-5 w-5" />, label: 'Telemedicine', path: '/telemedicine' },
    { icon: <CreditCard className="h-5 w-5" />, label: 'Transactions', path: '/transactions' },
    { icon: <Settings className="h-5 w-5" />, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="hidden md:flex h-screen w-64 flex-col fixed left-0 top-0 border-r bg-white">
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 hover:bg-gray-100"
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
};

// Footer Component
export const Footer = () => {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 md:flex md:items-center md:justify-between">
        <div className="flex justify-center space-x-6 md:order-2">
          <a href="#" className="text-gray-600 hover:text-gray-900">Terms</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Privacy</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
        </div>
        <div className="mt-4 md:mt-0 md:order-1">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} MedixLink. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Loader Component
export const Loader = ({ size = "default" }) => {
  const sizeClasses = {
    small: "h-4 w-4",
    default: "h-6 w-6",
    large: "h-8 w-8"
  };

  return (
    <div className="flex items-center justify-center p-4">
      <LoaderIcon className={`animate-spin ${sizeClasses[size]} text-blue-600`} />
    </div>
  );
};

// Layout Component that combines Header, Sidebar, and Footer
export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      <main className="md:ml-64 min-h-[calc(100vh-4rem)]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex min-h-screen items-center justify-center p-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default {
  Header,
  Footer,
  Sidebar,
  Loader,
  MainLayout,
  AuthLayout
};
