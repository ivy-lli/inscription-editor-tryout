import React from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@radix-ui/react-tabs';
import './TabsDemo.css';

export interface TabProps {
  id: string,
  label: string,
  content: JSX.Element,
  value: string,
  state?: string
}

export interface TabsDemoProps {
  tabsList: TabProps[],
  value: string
};

const TabsDemo = (props: TabsDemoProps) => (
  <Tabs className='tabs-root' defaultValue={props.value}>
    <TabsList className='tabs-list'>
      {props.tabsList.map((tab, index) => (
        <TabsTrigger key={tab.id || `${index}-${tab.value}`} className='tabs-trigger' value={tab.value}>
          <span className='dirty-state' data-state={tab.state} />
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>
    {props.tabsList.map((tab, index) => (
      <TabsContent key={tab.id || `${index}-${tab.value}`} className='tabs-content' value={tab.value}>
        {tab.content}
      </TabsContent>
    ))}
  </Tabs>
);

export default TabsDemo;
