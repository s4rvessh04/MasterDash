import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import './App.css';

import Navbar from './components/Navbar';
import Home from './components/Home/Home';
import GitHubStats from './components/Github/GithubStats';

function App() {
  var initialState = false;

  if (window.innerWidth > 768) {
    initialState = true;
  }
  const [isOpen, setIsOpen] = useState(initialState);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const hideMenu = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', hideMenu);

    return () => {
      window.removeEventListener('resize', hideMenu);
    };
  });

  return (
    <>
      <div className='min-h-screen lg:flex font-titillium bg-gray-50'>
        <Navbar toggle={toggle} isOpen={isOpen} />
        <Switch>
          <Route exact path='/'>
            <Redirect to='/home' />
          </Route>
          <Route path='/home' exact component={Home} />
          <Route path='/github' exact component={GitHubStats} />
        </Switch>
        {/*
        // Add this only on home screen
        <Particles
        className="absolute w-full"
          params={{
            particles: {
              line_linked: {
                color: "#FFE57F"
              },
              number: {
                value: 20,
                density: {
                  enable: true,
                  value_area: 1000,
                }
              },
            },
          }}
        /> */}
      </div>
    </>
  );
}

export default App;
