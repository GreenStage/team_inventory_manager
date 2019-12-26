import React from 'react';
import SearchBar from '../../components/searchbar';
import EnterForm from '../../components/enterForm';
import { useState } from 'react';

export default function AddLocation() {
  const [validated,setValidated] = useState(false);

  function onClickSubmit(event, values) {
    event.preventDefault();
    setValidated(true);
    if (event.currentTarget.checkValidity()) {
    }
  }

  return (
    <div>
      <div className="sectionTitle">
        <h4>Manage Locations</h4>
        <div className="sectionSubtitle">
          
          <h5>Add a new location</h5>
          <EnterForm
            fields={[
              {
                id: 'name',
                name: 'Location name',
                placeholder: 'An indentifier for the location',
                warning: 'Invalid location code',
              },
              {
                id: 'address',
                name: 'Address',
                placeholder: 'The location\'s address',
                warning: 'Invalid address',
              },
            ]}
            submit={{
              value: 'Add location',
              handle: (event, values) => onClickSubmit(event, values),
              style:{width:"8em",float:"right"}
            }}
            validated={validated}
          />
        </div>
      </div>
    </div>
  );
}
