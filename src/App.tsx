import './App.css';
import Editor from './components/Editor';
import NameTab from './components/tabs/NameTab';
import ResultTab from './components/tabs/ResultTab';
import CallTab from './components/tabs/CallTab';
import { TabProps, TabState } from './components/Header';
import { useUserDialogEditor } from './data/editor';

function App() {
  const { nameTab, callTab, headerState } = useUserDialogEditor();

  const tabsList: TabProps[] = [
    {
      name: 'Name',
      state: nameTab.state,
      content: <NameTab data={nameTab.data} onChange={nameTab.setData} messages={nameTab.messages} />
    },
    { name: 'Call', state: callTab.state, content: <CallTab data={callTab.data} onChange={callTab.setData} messages={callTab.messages} /> },
    { name: 'Result', state: TabState.CONFIGURED, content: <ResultTab /> }
  ];

  return (
    <div className='App-header'>
      <Editor title='Inscribe User Dialog' status={headerState} tabsList={tabsList} activeTab={tabsList[0].name} />
    </div>
  );
}

export default App;
