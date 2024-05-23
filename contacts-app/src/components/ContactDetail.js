import React from 'react';
import { useSelector } from 'react-redux';

const ContactDetail = () => {
  const selectedContact = useSelector(state => state.selectedContact);

  if (!selectedContact) {
    return <div className="text-center text-gray-600">No contact selected</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{selectedContact.firstName} {selectedContact.lastName}</h2>
      <p className="text-gray-700">Status: {selectedContact.status}</p>
    </div>
  );
};

export default ContactDetail;
