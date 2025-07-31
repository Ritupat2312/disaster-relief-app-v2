// File: src/App.jsx
import React, { useState } from 'react';

// This is the main application component.
const App = () => {
  // We use state to manage which page is currently being displayed.
  // The default page is 'home'.
  const [currentPage, setCurrentPage] = useState('home');

  // The Navbar component handles navigation between pages.
  const Navbar = () => {
    const navItems = [
      { name: 'Home', path: 'home' },
      { name: 'Request Help', path: 'request-help' },
      { name: 'Offer Help', path: 'offer-help' },
      { name: 'Dashboard', path: 'dashboard' },
    ];

    // Helper function to handle page changes.
    const handleNavigation = (path) => {
      setCurrentPage(path);
    };

    return (
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold cursor-pointer" onClick={() => handleNavigation('home')}>
            DisasterSenseAI
          </div>
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <a
                key={item.path}
                className={`text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentPage === item.path ? 'bg-gray-900' : 'hover:bg-gray-700'
                } cursor-pointer`}
                onClick={() => handleNavigation(item.path)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    );
  };

  // Here we define the content for each page.
  // You should replace this with your actual page components.
  const Home = () => (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Home Page</h1>
      <p>Welcome to the DisasterSenseAI Relief Application.</p>
    </div>
  );

  const RequestHelp = () => (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Request Help</h1>
      <p>This is where users can request help.</p>
    </div>
  );

  const OfferHelp = () => (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Offer Help</h1>
      <p>This is where users can offer help.</p>
    </div>
  );

  const Dashboard = () => (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <p>This is the user dashboard.</p>
    </div>
  );

  // We use a switch statement to render the correct component based on the current page state.
  // This replaces the need for react-router-dom, making the app self-contained.
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'request-help':
        return <RequestHelp />;
      case 'offer-help':
        return <OfferHelp />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <Home />;
    }
  };

  // This is the main application structure, with the Navbar and the content area.
  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      <Navbar />
      <main className="container mx-auto p-4 md:p-8">
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 min-h-[calc(100vh-160px)] border border-gray-200">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default App;

