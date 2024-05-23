import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, selectContact } from '../redux/actions';
import { Link } from 'react-router-dom';

const ContactList = () => {
  const contacts = useSelector(state => state.contacts);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  const handleSelect = (id) => {
    dispatch(selectContact(id));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">Contact List</h2>
      {contacts.map(contact => (
        <div key={contact.id} className="flex justify-between items-center mb-4 p-2 border-b border-gray-200">
          <span className={`font-semibold ${contact.status === 'active' ? 'text-green-500' : 'text-red-500'}`} >{contact.firstName} {contact.lastName}</span>
          <div>
            <Link to="/contact-detail">
              <button 
                onClick={() => handleSelect(contact.id)} 
                className="bg-green-500 text-white px-4 py-1 rounded-md mr-2"
              >
                View
              </button>
            </Link>
            <Link to="/edit-contact">
              <button 
                onClick={() => handleSelect(contact.id)} 
                className="bg-yellow-500 text-white px-4 py-1 rounded-md mr-2"
              >
                Edit
              </button>
            </Link>
            <button 
              onClick={() => handleDelete(contact.id)} 
              className="bg-red-500 text-white px-4 py-1 rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
