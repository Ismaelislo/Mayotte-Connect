import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Traffic from './pages/Traffic';
import Dictionary from './pages/Dictionary';
import RideShare from './pages/RideShare';
import Ads from './pages/Ads';
import Tourism from './pages/Tourism';
import Events from './pages/Events';
import Jobs from './pages/Jobs';
import Alerts from './pages/Alerts';
import Help from './pages/Help';
import Environment from './pages/Environment';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="traffic" element={<Traffic />} />
                <Route path="dictionary" element={<Dictionary />} />
                <Route path="rideshare" element={<RideShare />} />
                <Route path="ads" element={<Ads />} />
                <Route path="tourism" element={<Tourism />} />
                <Route path="events" element={<Events />} />
                <Route path="jobs" element={<Jobs />} />
                <Route path="alerts" element={<Alerts />} />
                <Route path="help" element={<Help />} />
                <Route path="environment" element={<Environment />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;