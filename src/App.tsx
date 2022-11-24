import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import Editor from './components/Editor';
import NameTab, { NameData } from './components/tabs/NameTab';
import ResultTab from './components/tabs/ResultTab';
import CallTab, { CallData } from './components/tabs/CallTab';
import { TabProps, TabState } from './components/Header';
import { Message, MessageSeverity } from './data/message';

function App() {
  const [nameData, setNameData] = useState({ name: 'test name', description: 'test desc', messages: new Map() } as NameData);
  const [nameTab, setNameTab] = useState({ state: TabState.EMPTY });
  const handleNameDataChange = (change: NameData) => {
    setNameData(change);
    if (change.messages.size > 0) {
      setNameTab({ state: TabState.ERROR });
    } else {
      setNameTab({ state: TabState.DIRTY });
    }
  };

  const [callData, setCallData] = useState({ dialog: '', start: '', messages: new Map() } as CallData);
  const [callTab, setCallTab] = useState({ state: TabState.WARNING });
  const handleCallDataChange = (change: CallData) => {
    setCallData(change);
  };
  useEffect(() => {
    const messages = structuredClone(callData.messages);
    if (callData.dialog.length === 0) {
      messages.set('dialog', {
        field: 'dialog',
        severity: MessageSeverity.WARNING,
        message: '⚠️ No User Dialog specified, auto dialog will be shown.'
      });
    } else {
      messages.delete('dialog');
    }
    if (messages.size !== callData.messages.size) {
      setCallData({ ...callData, messages: messages });
    }
    const errors = Array.from(callData.messages.values()).find(message => message.severity === MessageSeverity.ERROR);
    const warnings = Array.from(callData.messages.values()).find(message => message.severity === MessageSeverity.WARNING);
    if (errors) {
      setCallTab({ state: TabState.ERROR });
    } else if (warnings) {
      setCallTab({ state: TabState.WARNING });
    } else {
      setCallTab({ state: TabState.DIRTY });
    }
  }, [callData]);

  const [headerStatus, setHeaderStatus] = useState([] as Message[]);
  useEffect(() => {
    const messages = Array.from(nameData.messages.values()).concat(Array.from(callData.messages.values()));
    if (messages.length > 0) {
      setHeaderStatus(messages);
    } else {
      setHeaderStatus([{ field: 'name', severity: MessageSeverity.INFO, message: nameData.name }]);
    }
  }, [nameData, callData]);

  const tabsList: TabProps[] = [
    { name: 'Name', state: nameTab.state, content: <NameTab data={nameData} onChange={handleNameDataChange} /> },
    {
      name: 'Call',
      state: callTab.state,
      content: <CallTab data={callData} onChange={handleCallDataChange} />
    },
    { name: 'Result', state: TabState.CONFIGURED, content: <ResultTab /> }
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
        <Editor title='Inscribe User Dialog' status={headerStatus} tabsList={tabsList} activeTab={tabsList[0].name} />
      </header>
    </div>
  );
}

export default App;
