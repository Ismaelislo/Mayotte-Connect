import React, { useState } from 'react';
import { Menu, X, Sun, Moon, Globe, User } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMenuOpen }) => {
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg border-b-2 border-mayotte-turquoise">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Menu Button */}
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center ml-2 lg:ml-0">
              <div className="w-8 h-8 bg-gradient-to-br from-mayotte-turquoise to-mayotte-coral rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">MC</span>
              </div>
              <h1 className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                Mayotte Connect
              </h1>
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Globe size={20} />
              </button>
              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50">
                  <button
                    onClick={() => {
                      setLanguage('fr');
                      setShowLanguageMenu(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      language === 'fr' ? 'bg-mayotte-turquoise text-white' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Français
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('shimaoré');
                      setShowLanguageMenu(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      language === 'shimaoré' ? 'bg-mayotte-turquoise text-white' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Shimaoré
                  </button>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* User Menu */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <User size={20} />
                  <span className="ml-1 text-sm hidden sm:block">{user.name}</span>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {t('auth.logout')}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;