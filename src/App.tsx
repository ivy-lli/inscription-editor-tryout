import './App.css';
import Editor from './components/Editor';
import NameTab, { useNameTab } from './components/tabs/NameTab';
import ResultTab from './components/tabs/ResultTab';
import CallTab, { useCallTab } from './components/tabs/CallTab';
import { TabProps, TabState } from './components/Header';
import { useEffect, useState } from 'react';
import { Message, MessageSeverity } from './data/message';

function App() {
  const [nameData, nameTab, handleNameDataChange] = useNameTab();
  const [callData, callTab, handleCallDataChange] = useCallTab();

  const [headerStatus, setHeaderStatus] = useState([] as Message[]);
  useEffect(() => {
    const messages = [...Array.from(nameData.messages.values()), ...Array.from(callData.messages.values())];
    if (messages.length > 0) {
      setHeaderStatus(messages);
    } else {
      setHeaderStatus([{ field: 'name', severity: MessageSeverity.INFO, message: nameData.name }]);
    }
  }, [nameData, callData]);

  const tabsList: TabProps[] = [
    { name: 'Name', state: nameTab, content: <NameTab data={nameData} onChange={handleNameDataChange} /> },
    { name: 'Call', state: callTab, content: <CallTab data={callData} onChange={handleCallDataChange} /> },
    { name: 'Result', state: TabState.CONFIGURED, content: <ResultTab /> }
  ];

  return (
    <div className='App-header'>
      <Editor title='Inscribe User Dialog' status={headerStatus} tabsList={tabsList} activeTab={tabsList[0].name} />
    </div>
  );
}

export default App;
