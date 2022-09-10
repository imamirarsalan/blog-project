import React from 'react';

import { Routes, Route } from 'react-router-dom';
// Components
import HomePage from './components/home/HomePage';
import Layout from './components/layout/Layout';
import AuthorPage from './components/author/AuthorPage';
import BlogPage from './components/blog/BlogPage';
import ScrollToTop from './components/shared/ScrollToTop';



const App = () => {
  return (
    <div>
      <Layout>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs/:slug" element={<BlogPage />} />
          <Route path="/authors/:slug" element={<AuthorPage />} />
        </Routes>
      </Layout>

    </div>
  );
};

export default App;
