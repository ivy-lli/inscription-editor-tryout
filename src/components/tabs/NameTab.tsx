import React from 'react';
import CollapsiblePart from './CollapsiblePart';
import LabelInput from './LabelInput';
import './NameTab.css';

export interface NameData {
  name: string;
  description: string;
}

const NameTab = (props: { data: NameData; onChange: (change: NameData) => void }) => {
  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    props.onChange({ ...props.data, name: event.target.value });
  }

  function handleDescChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    props.onChange({ ...props.data, description: event.target.value });
  }

  return (
    <div className='name-tab'>
      <LabelInput label='Display name' htmlFor='displayName'>
        <input className='input' type='text' id='displayName' value={props.data.name} onChange={handleNameChange} />
      </LabelInput>
      <LabelInput label='Description' htmlFor='description'>
        <textarea className='input' id='description' value={props.data.description} onChange={handleDescChange} />
      </LabelInput>
      <LabelInput label='Means / Documents' htmlFor='documents'>
        <textarea className='input' id='documents' defaultValue='todo: documents list' />
      </LabelInput>
      <CollapsiblePart collapsibleLabel='Tags' defaultOpen={false}>
        <p>todo: tags</p>
      </CollapsiblePart>
    </div>
  );
};

export default NameTab;
