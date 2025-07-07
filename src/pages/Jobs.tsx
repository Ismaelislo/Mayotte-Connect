import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, Euro, Search, Filter, Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface JobOffer {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary?: string;
  description: string;
  requirements: string[];
  createdAt: string;
}

const Jobs: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [jobs, setJobs] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const jobTypes = [
    { value: 'all', label: 'Tous les types' },
    { value: 'full-time', label: 'Temps plein' },
    { value: 'part-time', label: 'Temps partiel' },
    { value: 'contract', label: 'Contrat' },
    { value: 'internship', label: 'Stage' },
  ];

  useEffect(() => {
    // Mock data
    const mockJobs: JobOffer[] = [
      {
        id: '1',
        title: 'Développeur Web',
        company: 'TechMayotte',
        location: 'Mamoudzou',
        type: 'full-time',
        salary: '2500-3000€',
        description: 'Nous recherchons un développeur web expérimenté pour rejoindre notre équipe dynamique.',
        requirements: ['React', 'Node.js', 'TypeScript', '3+ ans d\'expérience'],
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Infirmier/Infirmière',
        company: 'CHM Mayotte',
        location: 'Mamoudzou',
        type: 'full-time',
        salary: '2200-2800€',
        description: 'Poste d\'infirmier en service de médecine générale. Diplôme d\'État requis.',
        requirements: ['Diplôme d\'État', 'Expérience hospitalière', 'Disponibilité'],
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Guide Touristique',
        company: 'Mayotte Découverte',
        location: 'Dzaoudzi',
        type: 'part-time',
        salary: '1500-2000€',
        description: 'Guide touristique pour excursions en bateau et randonnées. Connaissance de l\'île requise.',
        requirements: ['Permis bateau', 'Anglais courant', 'Connaissance locale'],
        createdAt: new Date().toISOString()
      },
      {
        id: '4',
        title: 'Professeur de Mathématiques',
        company: 'Collège de Koungou',
        location: 'Koungou',
        type: 'full-time',
        salary: '2000-2500€',
        description: 'Enseignement des mathématiques niveau collège. Titulaire de l\'Éducation Nationale.',
        requirements: ['CAPES', 'Expérience enseignement', 'Pédagogie'],
        createdAt: new Date().toISOString()
      }
    ];

    setTimeout(() => {
      setJobs(mockJobs);
      setLoading(false);
    }, 500);
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || job.type === selectedType;
    return matchesSearch && matchesType;
  });

  const CreateJobForm = () => {
    const [formData, setFormData] = useState({
      title: '',
      company: '',
      location: '',
      type: 'full-time',
      salary: '',
      description: '',
      requirements: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newJob: JobOffer = {
        id: Date.now().toString(),
        title: formData.title,
        company: formData.company,
        location: formData.location,
        type: formData.type as any,
        salary: formData.salary || undefined,
        description: formData.description,
        requirements: formData.requirements.split(',').map(req => req.trim()),
        createdAt: new Date().toISOString()
      };
      setJobs([newJob, ...jobs]);
      setShowCreateForm(false);
      setFormData({
        title: '',
        company: '',
        location: '',
        type: 'full-time',
        salary: '',
        description: '',
        requirements: ''
      });
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Publier une offre d'emploi
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Titre du poste
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="input"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Entreprise
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="input"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Localisation
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="input"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Type de contrat
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="input"
              >
                {jobTypes.slice(1).map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Salaire
              </label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) => setFormData({...formData, salary: e.target.value})}
                className="input"
                placeholder="ex: 2000-2500€"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="input"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Compétences requises (séparées par des virgules)
            </label>
            <input
              type="text"
              value={formData.requirements}
              onChange={(e) => setFormData({...formData, requirements: e.target.value})}
              className="input"
              placeholder="ex: React, Node.js, TypeScript"
            />
          </div>

          <div className="flex space-x-3">
            <button type="submit" className="btn-primary">
              Publier l'offre
            </button>
            <button
              type="button"
              onClick={() => setShowCreateForm(false)}
              className="btn-secondary"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-green-100 text-green-800';
      case 'part-time': return 'bg-blue-100 text-blue-800';
      case 'contract': return 'bg-orange-100 text-orange-800';
      case 'internship': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
          {t('nav.jobs')}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Offres d'emploi à Mayotte
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher un emploi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mayotte-turquoise dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mayotte-turquoise dark:bg-gray-700 dark:text-white"
            >
              {jobTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="btn-primary flex items-center justify-center"
          >
            <Plus size={20} className="mr-2" />
            Publier
          </button>
        </div>
      </div>

      {showCreateForm && <CreateJobForm />}

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {job.title}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(job.type)}`}>
                    {jobTypes.find(type => type.value === job.type)?.label}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                  <div className="flex items-center">
                    <Briefcase size={14} className="mr-1" />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-1" />
                    <span>{job.location}</span>
                  </div>
                  {job.salary && (
                    <div className="flex items-center text-mayotte-green font-semibold">
                      <Euro size={14} className="mr-1" />
                      <span>{job.salary}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    <span>{new Date(job.createdAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {job.description}
            </p>
            
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Compétences requises :
              </h4>
              <div className="flex flex-wrap gap-2">
                {job.requirements.map((req, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-mayotte-turquoise/10 text-mayotte-turquoise text-xs rounded-full"
                  >
                    {req}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button className="btn-primary">
                Postuler
              </button>
              <button className="btn-secondary">
                Sauvegarder
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg text-center">
          <Briefcase className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-500 dark:text-gray-400">
            Aucune offre d'emploi trouvée
          </p>
        </div>
      )}
    </div>
  );
};

export default Jobs;