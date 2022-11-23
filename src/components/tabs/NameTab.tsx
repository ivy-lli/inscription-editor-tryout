import React from 'react';
import CollapsiblePart from './CollapsiblePart';
import LabelInput from './LabelInput';
import './NameTab.css';

const NameTab = () => (
  <div className='name-tab'>
    <LabelInput label='Display name' htmlFor='displayName'>
      <input className="input" type="text" id="displayName" defaultValue="" />
    </LabelInput>
    <LabelInput label='Description' htmlFor='description'>
      <textarea className="input" id="description" defaultValue="" />
    </LabelInput>
    <LabelInput label='Means / Documents' htmlFor='documents'>
      <textarea className="input" id="documents" defaultValue="todo: documents list" />
    </LabelInput>
    <CollapsiblePart collapsibleLabel='Tags' defaultOpen={false}>
      <p>todo: tags</p>
    </CollapsiblePart>
  </div>
)

export default NameTab;