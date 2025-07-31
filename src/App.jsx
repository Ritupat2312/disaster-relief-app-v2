import React, { useState } from 'react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const navItems = [
    { name: 'Home', path: 'home' },
    { name: 'Request Help', path: 'request-help' },
    { name: 'Offer Help', path: 'offer-help' },
    { name: 'Dashboard', path: 'dashboard' },
  ];

  const handleNavigation = (path) => {
    setCurrentPage(path);
  };

  const Navbar = () => (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div 
          className="text-white text-2xl font-bold cursor-pointer transition-colors duration-200 hover:text-gray-300 flex items-center space-x-2" 
          onClick={() => handleNavigation('home')}
        >
          {/* Use the img tag to display your logo from the public folder */}
          <img src="%PUBLIC_URL%/app_logo.jpg" alt="DisasterSenseAI Logo" className="h-8 w-auto" />
          <span>DisasterSenseAI</span>
        </div>
        <div className="flex space-x-4">
          {navItems.map((item) => (
            <a
              key={item.path}
              className={`text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                currentPage === item.path ? 'bg-gray-900 text-yellow-400' : 'hover:bg-gray-700'
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

  const Home = () => (
    <div className="text-center py-16">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
        Disaster Relief with AI
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Connecting those in need with those who can help, powered by advanced AI and community support.
      </p>
      <div className="flex justify-center space-x-4">
        <button 
          className="bg-red-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-red-700 transition-colors duration-200"
          onClick={() => handleNavigation('request-help')}
        >
          Request Help
        </button>
        <button 
          className="bg-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-yellow-500 transition-colors duration-200"
          onClick={() => handleNavigation('offer-help')}
        >
          Offer Help
        </button>
      </div>
    </div>
  );

  const RequestHelp = () => (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Request Help</h1>
      <form className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
            Your Name
          </label>
          <input 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" 
            type="text" 
            id="name" 
            placeholder="John Doe" 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="needs">
            What do you need?
          </label>
          <textarea 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" 
            id="needs" 
            rows="4" 
            placeholder="Food, water, shelter, medical aid..."
          ></textarea>
        </div>
        <div className="text-center">
          <button 
            className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-red-700 transition-colors duration-200"
            type="submit"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );

  const OfferHelp = () => (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Offer Help</h1>
      <form className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
            Your Name
          </label>
          <input 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" 
            type="text" 
            id="name" 
            placeholder="Jane Smith" 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="aid">
            What can you offer?
          </label>
          <textarea 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" 
            id="aid" 
            rows="4" 
            placeholder="Medical supplies, transport, temporary housing..."
          ></textarea>
        </div>
        <div className="text-center">
          <button 
            className="w-full bg-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-yellow-500 transition-colors duration-200"
            type="submit"
          >
            Submit Offer
          </button>
        </div>
      </form>
    </div>
  );

  const Dashboard = () => (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">User Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Your Requests</h2>
          <ul className="space-y-4">
            <li className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <p className="font-semibold">Request for Water</p>
              <p className="text-sm text-gray-500">Status: Pending</p>
            </li>
            <li className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <p className="font-semibold">Request for Medical Aid</p>
              <p className="text-sm text-gray-500">Status: Fulfilled</p>
            </li>
          </ul>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Your Offers</h2>
          <ul className="space-y-4">
            <li className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <p className="font-semibold">Offer of Transport</p>
              <p className="text-sm text-gray-500">Status: Active</p>
            </li>
            <li className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <p className="font-semibold">Offer of Food Supplies</p>
              <p className="text-sm text-gray-500">Status: Fulfilled</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

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
