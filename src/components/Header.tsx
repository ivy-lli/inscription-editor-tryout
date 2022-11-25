import { TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { useEffect, useState } from 'react';
import { Message, MessageSeverity } from '../data/message';
import editorIcon from '../icons/user-dialog.svg';
import './Header.css';

export interface HeaderProps {
  title: string;
  status: Message[];
  tabsList: TabProps[];
  activeTab?: string;
}

export interface TabProps {
  name: string;
  content: JSX.Element;
  state: TabState;
}

export enum TabState {
  EMPTY = 'empty',
  CONFIGURED = 'configured',
  DIRTY = 'dirty',
  WARNING = 'warning',
  ERROR = 'error'
}

const Header = (props: HeaderProps) => (
  <>
    <div className='header'>
      <div className='header-title'>
        <div className='header-editor'>{props.title}</div>
      </div>
      <TabsList className='tabs-list'>
        {props.tabsList.map((tab, index) => (
          <TabsTrigger key={`${index}-${tab.name}`} className='tabs-trigger' value={tab.name}>
            <span className='dirty-state' data-state={tab.state ?? TabState.EMPTY} />
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      <img src={editorIcon} className='header-icon' alt='icon' />
    </div>
    {props.status.map((state, index) => (
      <div key={`${index}-${state.field}`} className={`header-status message-${state.severity}`}>
        {state.message}
      </div>
    ))}
  </>
);

export default Header;
