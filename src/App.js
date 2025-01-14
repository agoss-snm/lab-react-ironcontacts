import React, { useState } from 'react';
import contactsData from './contacts.json';
import '../src/App.css';

function App() {
  const [filteredContacts, setFilteredContacts]= useState(filterFunction(contactsData))

  function filterFunction(contacts) {
    let newArray = [];
    for (let i = 0; i < 5; i++) {
      newArray.push(contacts[i]);
    }
    return newArray;
  }

  function addRandomContact() {
    const randomIndex = Math.floor(Math.random() * (contactsData.length - 5)) + 5;
    const randomActor = contactsData[randomIndex]; 
    setFilteredContacts(prevFilteredContacts => [...prevFilteredContacts, randomActor]);
  }

  function sortByPopularity() {
    const updatedContacts = [...filteredContacts];
    updatedContacts.sort((a, b) => b.popularity - a.popularity);
    const finalContacts = updatedContacts.slice(0, 5);
    setFilteredContacts(finalContacts);
  }
  

  function sortByName() {
    const sortedContacts = [...filteredContacts].sort((a, b) => a.name.localeCompare(b.name));
    setFilteredContacts(sortedContacts);
  }

  function deleteContact(id) {
    const updatedContacts = filteredContacts.filter(contact => contact.id !== id);
    setFilteredContacts(updatedContacts);
  }


  return (
    <div className="App">
      <div className='buttonsList'>
      <button className='buttonAdd' onClick={addRandomContact}>Add Random Contact</button>
      <button className='buttonSortP' onClick={sortByPopularity}>Sort by popularity</button>
      <button className='buttonSortN'  onClick={sortByName}>Sort by name</button>
      </div>
     
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar?</th>
            <th>Won Emmy?</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                <img className='imageF1' src={contact.pictureUrl} alt={contact.name} />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td>{contact.wonOscar ? '🏆' : ''}</td>
              <td>{contact.wonEmmy ? '🏆' : ''}</td>
              <td>
                <button onClick={() => deleteContact(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
