import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../redux/actions';

const ContactForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState('active');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addContact({ id: Date.now(), firstName, lastName, status }));
    setFirstName('');
    setLastName('');
    setStatus('active');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Add Contact</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">First Name</label>
        <input 
          type="text"
          placeholder='Jone' 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded-md" 
          required 
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Last Name</label>
        <input 
          type="text" 
          placeholder='Doe'
          value={lastName} 
          onChange={(e) => setLastName(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded-md" 
          required 
        />
      </div>
      <div className="mb-4">
        <span className="block text-gray-700 mb-2">Status</span>
        <div className="flex items-center">
          <label className="inline-flex items-center mr-4">
            <input 
              type="radio" 
              value="active" 
              checked={status === 'active'} 
              onChange={() => setStatus('active')} 
              className="form-radio h-5 w-5 text-blue-600" 
            />
            <span className="ml-2">Active</span>
          </label>
          <label className="inline-flex items-center">
            <input 
              type="radio" 
              value="inactive" 
              checked={status === 'inactive'} 
              onChange={() => setStatus('inactive')} 
              className="form-radio h-5 w-5 text-red-600" 
            />
            <span className="ml-2">Inactive</span>
          </label>
        </div>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">Add Contact</button>
    </form>
  );
};

export default ContactForm;
