import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo192.png';

const NavBar: React.FC = () => {
  const location = useLocation();

  const isActiveLink = (routePath: string) => {
    return location.pathname === routePath;
  };

  return (
    <nav className="bg-green-700 border-b border-green-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            {/* Logo */}
            <Link className="flex flex-shrink-0 items-center mr-4" to="/">
              <img className="h-10 w-auto" src={logo} alt="React Jobs" />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                Issues Dashboard
              </span>
            </Link>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <Link
                  to="/"
                  className={`${
                    isActiveLink('/')
                      ? 'bg-green-900'
                      : 'hover:bg-gray-900 hover:text-white'
                  } text-white px-3 py-2 rounded-md`}
                >
                  Home
                </Link>
                <Link
                  to="/query"
                  className={`${
                    isActiveLink('/query')
                      ? 'bg-green-900'
                      : 'hover:bg-gray-900 hover:text-white'
                  } text-white px-3 py-2 rounded-md`}
                >
                  Query Tab
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;