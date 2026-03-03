import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Layout from './components/Layout';
import Philosophy from './pages/Philosophy';
import Story from './pages/Story';

import Hero from './sections/Hero';
import Problem from './sections/Problem';
import WhatWeDo from './sections/WhatWeDo';
import FeaturedUseCases from './sections/FeaturedUseCases';
import Architecture from './sections/Architecture';
import JoinMovement from './sections/JoinMovement';
import Newsletter from './sections/Newsletter';
import Footer from './sections/Footer';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Home page component
function Home() {
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <Hero />
      <Problem />
      <WhatWeDo />
      <FeaturedUseCases />
      <Architecture />
      <JoinMovement />
      <Newsletter />
      <Footer />
    </>
  );
}

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/philosophy" element={<Philosophy />} />
          <Route path="/story" element={<Story />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
