const initialState = {
    contacts: [],
    selectedContact: null
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_CONTACT':
        return { ...state, contacts: [...state.contacts, action.payload] };
      case 'DELETE_CONTACT':
        return { ...state, contacts: state.contacts.filter(contact => contact.id !== action.payload) };
      case 'SELECT_CONTACT':
        return { ...state, selectedContact: state.contacts.find(contact => contact.id === action.payload) };
      case 'EDIT_CONTACT':
        return {
          ...state,
          contacts: state.contacts.map(contact =>
            contact.id === action.payload.id ? action.payload : contact
          )
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  