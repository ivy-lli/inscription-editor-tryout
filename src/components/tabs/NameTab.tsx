import React, { useState } from 'react';
import { Message, MessageSeverity } from '../../data/message';
import { TabState } from '../Header';
import CollapsiblePart from './CollapsiblePart';
import LabelInput from './LabelInput';
import './NameTab.css';
import Tags from './Tags';

export interface NameData {
  name: string;
  description: string;
  tags: string[];
  messages: Map<string, Message>;
}

export function useNameTab(): [NameData, TabState, (change: NameData) => void] {
  const [nameData, setNameData] = useState({
    name: 'test name',
    description: 'test desc',
    tags: ['bla', 'zag'],
    messages: new Map()
  } as NameData);
  const [nameTab, setNameTab] = useState(TabState.EMPTY);
  const handleNameDataChange = (change: NameData) => {
    setNameData(change);
    if (change.messages.size > 0) {
      setNameTab(TabState.ERROR);
    } else {
      setNameTab(TabState.DIRTY);
    }
  };
  return [nameData, nameTab, handleNameDataChange];
}

const NameTab = (props: { data: NameData; onChange: (change: NameData) => void }) => {
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = { ...props.data, name: event.target.value };
    if (data.name.length === 0) {
      data.messages.set('name', { field: 'name', severity: MessageSeverity.ERROR, message: '🚫 Name must not be empty' });
    } else {
      data.messages.delete('name');
    }
    props.onChange(data);
  };
  const handleDescChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    props.onChange({ ...props.data, description: event.target.value });
  const handleTagsChange = (change: string[]) => props.onChange({ ...props.data, tags: change });

  return (
    <div className='name-tab'>
      <LabelInput label='Display name' htmlFor='displayName' message={props.data.messages.get('name')}>
        <input className='input' type='text' id='displayName' value={props.data.name} onChange={handleNameChange} />
      </LabelInput>
      <LabelInput label='Description' htmlFor='description'>
        <textarea className='input' id='description' value={props.data.description} onChange={handleDescChange} />
      </LabelInput>
      <LabelInput label='Means / Documents' htmlFor='documents'>
        <textarea className='input' id='documents' defaultValue='todo: documents list' />
      </LabelInput>
      <CollapsiblePart collapsibleLabel='Tags' defaultOpen={props.data.tags.length > 0}>
        <Tags tags={props.data.tags} onChange={handleTagsChange} />
      </CollapsiblePart>
    </div>
  );
};

export default NameTab;
