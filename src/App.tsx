import React from 'react';
import TabsDemo, { TabProps } from './components/TabsDemo';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Editor from './components/Editor';

function App() {
  const tabsList: TabProps[] = [
    {id: 'name', label: 'Name', value: 'name', content: <div>Content of Name</div>}, 
    {id: 'call', label: 'Call', value: 'call', content: <div>Content of Call</div>, state: 'dirty'},
    {id: 'result', label: 'Result', value: 'result', content: <div>Content of Result</div>, state: 'error'}
  ];

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
        <Editor tabsList={tabsList} activeTab={tabsList[0].value}/>
        {/* <TabsDemo tabsList={tabsList} value={tabsList[0].value}/> */}
      </header>
    </div>
  );
}

export default App;
