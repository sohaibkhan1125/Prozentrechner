import React, { useEffect, useState } from 'react';
import { loadHeroSettings } from '../utils/heroHelper';

const HeroSection = () => {
  const [heroContent, setHeroContent] = useState(() => loadHeroSettings());

  useEffect(() => {
    const handleHeroUpdate = (event) => {
      if (event?.detail) {
        setHeroContent({
          title: event.detail.title,
          description: event.detail.description,
        });
      } else {
        setHeroContent(loadHeroSettings());
      }
    };

    const handleStorage = (event) => {
      if (event.key === 'heroSectionSettings') {
        setHeroContent(loadHeroSettings());
      }
    };

    window.addEventListener('heroSectionUpdated', handleHeroUpdate);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('heroSectionUpdated', handleHeroUpdate);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          {heroContent.title}
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          {heroContent.description}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;

