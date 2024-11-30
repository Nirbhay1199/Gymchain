import React from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { UploadSection } from './components/upload/UploadSection';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main>
        <Hero />
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Upload Your Yoga Pose
            </h2>
            <UploadSection />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;