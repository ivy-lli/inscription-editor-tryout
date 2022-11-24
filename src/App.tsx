import './App.css';
import Editor from './components/Editor';
import NameTab, { useNameTab } from './components/tabs/NameTab';
import ResultTab from './components/tabs/ResultTab';
import CallTab, { useCallTab } from './components/tabs/CallTab';
import { TabProps, TabState, useHeaderStatus } from './components/Header';

function App() {
  const [nameData, nameTab, handleNameDataChange] = useNameTab();
  const [callData, callTab, handleCallDataChange] = useCallTab();

  const [headerStatus] = useHeaderStatus(nameData.name, [nameData.messages, callData.messages]);

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
