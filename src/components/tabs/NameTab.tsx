import React from 'react';
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
    <LabelInput label='Documents' htmlFor='documents'>
      {/* todo: documents list */}
      <textarea className="input" id="documents" defaultValue="some documents" />
    </LabelInput>
    {/* todo: tags */}
  </div>
)

export default NameTab;