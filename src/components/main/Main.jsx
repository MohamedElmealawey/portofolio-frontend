import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import Home from '../home/Home';
import Services from '../services/Services';
import Resume from '../resume/Resume';
import Portfolio from '../portfolio/Portfolio';
import Contact from '../contact/Contact';

const Main = () => {
  return (
    <>
      <Sidebar/>
      <main className="snap-container">
        <Home/>
        <Services/>
        <Resume/>
        <Portfolio/>
        <Contact/>
      </main>
    </>
  );
};

export default Main;