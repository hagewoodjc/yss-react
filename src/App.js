import React, { Component } from 'react';
import System from './views/system';
import './App.css'

import Dropdown from 'buildo-react-components/lib/Dropdown';

class App extends Component {
  render() {
    const options = [
      { value: 'apple', label: 'Apple' },
      { value: 'avocado', label: 'Avocado' },
      { value: 'orange', label: 'Orange' },
      { value: 'lemon', label: 'Lemon' },
      { value: 'mandarin', label: 'Mandarin' },
      { value: 'lime', label: 'Lime' },
      { value: 'peach', label: 'Peach' },
      { value: 'apricot', label: 'Apricot' },
      { value: 'pineapple', label: 'Pineapple' },
      { value: 'banana', label: 'Banana' }
    ];
    return (
      // <System />  
      <div>
        <Dropdown
          className='custom'
          searchable
          clearable
          backspaceRemoves
          placeholder='Select some fruit (try to type "Banana")'
          options={options}
        />
      </div>
    );
  }
}

export default App;
