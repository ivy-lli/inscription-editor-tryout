import React from 'react';
import TabsDemo, { TabProps } from './components/TabsDemo';
import logo from './logo.svg';
import './App.css';

function App() {
  const tabsList: TabProps[] = [{id: 'name', label: 'Name', value: 'name', content: <div>Content of Name</div>}, 
  {id: 'call', label: 'Call', value: 'call', content: <div>Content of Name</div>, state: 'dirty'},
  {id: 'result', label: 'Result', value: 'result', content: <div>Content of Name</div>}];

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <TabsDemo tabsList={tabsList} value={tabsList[0].value}/>
      </header>
    </div>
  );
}

export default App;
