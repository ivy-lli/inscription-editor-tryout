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
  const [nameTab, setNameTab] = useState({ state: TabState.EMPTY });
  const handleNameDataChange = (change: NameData) => {
    setNameData(change);
    if (change.name.length === 0) {
      setNameTab({ state: TabState.ERROR });
    } else {
      setNameTab({ state: TabState.DIRTY });
    }
  };

  const [callData, setCallData] = useState({ dialog: '', start: '' } as CallData);
  const [callTab, setCallTab] = useState({ state: TabState.WARNING });
  const handleCallDataChange = (change: CallData) => {
    setCallData(change);
    setCallTab({ state: TabState.DIRTY });
  };

  const tabsList: TabProps[] = [
    { name: 'Name', state: nameTab.state, content: <NameTab data={nameData} onChange={handleNameDataChange} /> },
    {
      name: 'Call',
      state: callTab.state,
      content: <CallTab data={callData} onChange={handleCallDataChange} />
    },
    { name: 'Result', state: TabState.ERROR, content: <ResultTab /> }
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
        <Editor title='Inscribe User Dialog' status='Enter Request' tabsList={tabsList} activeTab={tabsList[0].name} />
        {/* <TabsDemo tabsList={tabsList} value={tabsList[0].value}/> */}
      </header>
    </div>
  );
}

export default App;
