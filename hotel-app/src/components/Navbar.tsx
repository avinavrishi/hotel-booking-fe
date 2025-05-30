import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { authService, AUTH_STATE_CHANGE } from '../services/authService';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { user, setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleAuthStateChange = (event: CustomEvent) => {
      setIsLoading(event.detail.loading);
    };

    window.addEventListener(AUTH_STATE_CHANGE, handleAuthStateChange as EventListener);
    return () => {
      window.removeEventListener(AUTH_STATE_CHANGE, handleAuthStateChange as EventListener);
    };
  }, []);

  const handleLogout = async () => {
    // Clear user context
    setUser(null);
    // Call auth service logout
    await authService.logout();
  };

  return (
    <nav className="bg-white shadow-lg transform transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Brand */}
            <div className="flex-shrink-0 flex items-center">
              <Link 
                to="/" 
                className="text-2xl font-bold text-indigo-600 transform transition-all duration-300 hover:scale-105 hover:text-indigo-700"
              >
                HotelHub
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300"
              >
                Home
              </Link>
              <Link
                to="/properties"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300"
              >
                Properties
              </Link>
              <Link
                to="/bookings"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-300"
              >
                My Bookings
              </Link>
            </div>
          </div>

          {/* Right side menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">{user.email}</span>
                <Link
                  to="/profile"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-gray-50"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={isLoading}
                  className={`bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium transform transition-all duration-300 ${
                    isLoading 
                      ? 'opacity-50 cursor-not-allowed scale-[0.98]' 
                      : 'hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <svg 
                        className="animate-spin h-4 w-4 text-white transition-all duration-300" 
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
                        />
                        <path 
                          className="opacity-75" 
                          fill="currentColor" 
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span className="animate-pulse">Logging out...</span>
                    </div>
                  ) : (
                    'Logout'
                  )}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all duration-300"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6 transform transition-all duration-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 transition-all duration-300"
          >
            Home
          </Link>
          <Link
            to="/properties"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 transition-all duration-300"
          >
            Properties
          </Link>
          <Link
            to="/bookings"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 transition-all duration-300"
          >
            My Bookings
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {user ? (
            <div className="space-y-1">
              <div className="block px-4 py-2 text-base font-medium text-gray-500">
                {user.email}
              </div>
              <Link
                to="/profile"
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-all duration-300"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                disabled={isLoading}
                className={`block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-all duration-300 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <svg 
                      className="animate-spin h-4 w-4 text-gray-500 transition-all duration-300" 
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
                      />
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span className="animate-pulse">Logging out...</span>
                  </div>
                ) : (
                  'Logout'
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              <Link
                to="/login"
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 