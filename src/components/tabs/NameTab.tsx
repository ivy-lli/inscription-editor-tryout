import { Label } from '@radix-ui/react-label';
import React from 'react';
import './NameTab.css';

const NameTab = () => (
  <div className='name-tab'>
    <LabelInput label='Display name' htmlFor='displayName'>
      <input className="input" type="text" id="displayName" defaultValue="" />
    </LabelInput>
    <LabelInput label='Description' htmlFor='description'>
      <textarea className="input" id="description" defaultValue="" />
    </LabelInput>
  </div>
)

const LabelInput = (props: {label: string, htmlFor: string, children: JSX.Element}) => (
  <div className='name-column'>
    <Label className="label" htmlFor="displayName">
      {props.label}
    </Label>
    {props.children}
  </div>
)

export default NameTab;