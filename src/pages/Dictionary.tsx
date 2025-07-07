import React, { useState, useEffect } from 'react';
import { Search, Volume2, BookOpen, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { DictionaryEntry } from '../types';

const Dictionary: React.FC = () => {
  const { t } = useLanguage();
  const [entries, setEntries] = useState<DictionaryEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { value: 'all', label: 'Toutes catégories' },
    { value: 'daily', label: 'Vie quotidienne' },
    { value: 'health', label: 'Santé' },
    { value: 'admin', label: 'Administration' },
    { value: 'tourism', label: 'Tourisme' },
  ];

  useEffect(() => {
    // Mock dictionary data
    const mockEntries: DictionaryEntry[] = [
      {
        id: '1',
        french: 'Bonjour',
        shimaore: 'Bari',
        category: 'daily',
        examples: ['Bari, habari gani? - Bonjour, comment allez-vous ?']
      },
      {
        id: '2',
        french: 'Merci',
        shimaore: 'Marahaba',
        category: 'daily',
        examples: ['Marahaba mingi - Merci beaucoup']
      },
      {
        id: '3',
        french: 'Eau',
        shimaore: 'Madji',
        category: 'daily',
        examples: ['Madji baridi - Eau froide']
      },
      {
        id: '4',
        french: 'Hôpital',
        shimaore: 'Hospitali',
        category: 'health',
        examples: ['Nenda hospitali - Aller à l\'hôpital']
      },
      {
        id: '5',
        french: 'Mairie',
        shimaore: 'Mairie',
        category: 'admin',
        examples: ['Nenda mairie - Aller à la mairie']
      },
      {
        id: '6',
        french: 'Plage',
        shimaore: 'Ufukoni',
        category: 'tourism',
        examples: ['Ufukoni mzuri - Belle plage']
      },
      {
        id: '7',
        french: 'Famille',
        shimaore: 'Familia',
        category: 'daily',
        examples: ['Familia yangu - Ma famille']
      },
      {
        id: '8',
        french: 'Maison',
        shimaore: 'Nyumba',
        category: 'daily',
        examples: ['Nyumba yangu - Ma maison']
      }
    ];

    setTimeout(() => {
      setEntries(mockEntries);
      setLoading(false);
    }, 500);
  }, []);

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.french.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.shimaore.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || entry.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const playAudio = (text: string) => {
    // Mock audio playback - in real app, this would play actual audio
    console.log(`Playing audio for: ${text}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mayotte-turquoise mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t('nav.dictionary')}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Dictionnaire Français - Shimaoré
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={t('common.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mayotte-turquoise dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mayotte-turquoise dark:bg-gray-700 dark:text-white"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Dictionary Entries */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-8">
            <BookOpen className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-500 dark:text-gray-400">
              Aucun résultat trouvé
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Français:</span>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          {entry.french}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Shimaoré:</span>
                        <div className="flex items-center space-x-2">
                          <p className="text-lg font-semibold text-mayotte-turquoise">
                            {entry.shimaore}
                          </p>
                          <button
                            onClick={() => playAudio(entry.shimaore)}
                            className="p-1 text-gray-400 hover:text-mayotte-turquoise transition-colors"
                          >
                            <Volume2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-2 py-1 bg-mayotte-turquoise/10 text-mayotte-turquoise text-xs rounded-full">
                        {categories.find(cat => cat.value === entry.category)?.label}
                      </span>
                    </div>

                    {entry.examples && entry.examples.length > 0 && (
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Exemple:</span>
                        <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                          {entry.examples[0]}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Catégories populaires
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.slice(1).map(category => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedCategory === category.value
                  ? 'border-mayotte-turquoise bg-mayotte-turquoise/10 text-mayotte-turquoise'
                  : 'border-gray-200 dark:border-gray-700 hover:border-mayotte-turquoise/50'
              }`}
            >
              <div className="text-center">
                <BookOpen className="mx-auto mb-2" size={24} />
                <p className="text-sm font-medium">{category.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {entries.filter(e => e.category === category.value).length} mots
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dictionary;