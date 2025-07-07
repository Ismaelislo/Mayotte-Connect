import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Car,
  Users,
  MessageSquare,
  Book,
  MapPin,
  Calendar,
  Briefcase,
  AlertTriangle,
  Heart,
  Leaf,
  X
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  const menuItems = [
    { icon: Home, label: t('nav.home'), path: '/' },
    { icon: Car, label: t('nav.traffic'), path: '/traffic' },
    { icon: Users, label: t('nav.rideshare'), path: '/rideshare' },
    { icon: MessageSquare, label: t('nav.ads'), path: '/ads' },
    { icon: Book, label: t('nav.dictionary'), path: '/dictionary' },
    { icon: MapPin, label: t('nav.tourism'), path: '/tourism' },
    { icon: Calendar, label: t('nav.events'), path: '/events' },
    { icon: Briefcase, label: t('nav.jobs'), path: '/jobs' },
    { icon: AlertTriangle, label: t('nav.alerts'), path: '/alerts' },
    { icon: Heart, label: t('nav.help'), path: '/help' },
    { icon: Leaf, label: t('nav.environment'), path: '/environment' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 w-64 h-full bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 lg:hidden">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-4 lg:mt-8">
          <ul className="space-y-2 px-4">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'bg-mayotte-turquoise text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`
                  }
                >
                  <item.icon size={20} className="mr-3" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;