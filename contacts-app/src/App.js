import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import ContactDetail from './components/ContactDetail';
import ContactEdit from './components/ContactEdit';
import Dashboard from './components/Dashboard.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between">
              <Link to="/" className="text-white text-lg">Home</Link>
              <Link to="/add-contact" className="text-white text-lg">Add Contact</Link>
              <Link to="/charts-and-maps" className="text-white text-lg">Charts and Maps</Link>
            </div>
          </nav>
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<ContactList />} />
              <Route path="/add-contact" element={<ContactForm />} />
              <Route path="/contact-detail" element={<ContactDetail />} />
              <Route path="/edit-contact" element={<ContactEdit />} />
              <Route path="/charts-and-maps" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
