import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import Editor from './components/Editor';
import NameTab, { NameData } from './components/tabs/NameTab';
import ResultTab from './components/tabs/ResultTab';
import CallTab, { CallData } from './components/tabs/CallTab';
import { TabProps, TabState } from './components/Header';

function App() {
  const [nameData, setNameData] = useState({ name: 'test name', description: 'test desc' } as NameData);
  function handleNameDataChange(change: NameData) {
    setNameData(change);
  }
  const [callData, setCallData] = useState({ dialog: '', start: '' } as CallData);
  function handleCallDataChange(change: CallData) {
    setCallData(change);
  }
  const tabsList: TabProps[] = [
    { id: 'name', label: 'Name', value: 'name', content: <NameTab data={nameData} onChange={handleNameDataChange} /> },
    {
      id: 'call',
      label: 'Call',
      value: 'call',
      content: <CallTab data={callData} onChange={handleCallDataChange} />,
      state: TabState.DIRTY
    },
    { id: 'result', label: 'Result', value: 'result', content: <ResultTab />, state: TabState.ERROR }
  ];

  return (
    <div className='App'>
      <header className='App-header'>
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
        <Editor title='Inscribe User Dialog' status='Enter Request' tabsList={tabsList} activeTab={tabsList[0].value} />
        {/* <TabsDemo tabsList={tabsList} value={tabsList[0].value}/> */}
      </header>
    </div>
  );
}

export default App;
