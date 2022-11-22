import React from 'react';
import logo from './logo.svg';
import './App.css';
import Editor from './components/Editor';
import NameTab from './components/tabs/NameTab';
import ResultTab from './components/tabs/ResultTab';
import CallTab from './components/tabs/CallTab';
import { TabProps, TabState } from './components/Header';

function App() {
  const tabsList: TabProps[] = [
    {id: 'name', label: 'Name', value: 'name', content: <NameTab />}, 
    {id: 'call', label: 'Call', value: 'call', content: <CallTab />, state: TabState.DIRTY},
    {id: 'result', label: 'Result', value: 'result', content: <ResultTab />, state: TabState.ERROR}
  ];

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
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
        </a> */}
        <Editor title='Inscribe User Dialog' status='Enter Request' tabsList={tabsList} activeTab={tabsList[0].value}/>
        {/* <TabsDemo tabsList={tabsList} value={tabsList[0].value}/> */}
      </header>
    </div>
  );
}

export default App;
