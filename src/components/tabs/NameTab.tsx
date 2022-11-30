import React from 'react';
import { NameDoc } from '../../data/document';
import { Message, MessageUtil } from '../../data/message';
import { NameTabData } from '../../data/name-tab';
import CollapsiblePart from '../widgets/CollapsiblePart';
import LabelInput from '../widgets/LabelInput';
import Table from '../widgets/Table';
import Tags from '../widgets/Tags';
import './NameTab.css';

const NameTab = (props: { data: NameTabData; onChange: (change: NameTabData) => void; messages: Message[] }) => {
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => props.onChange({ ...props.data, name: event.target.value });
  const handleDescChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    props.onChange({ ...props.data, description: event.target.value });
  const handleDocChange = (change: NameDoc[]) => props.onChange({ ...props.data, documents: change });
  const handleTagsChange = (change: string[]) => props.onChange({ ...props.data, tags: change });

  return (
    <div className='name-tab'>
      <LabelInput label='Display name' htmlFor='displayName' message={MessageUtil.findMessage(props.messages, 'name')}>
        <input className='input' type='text' id='displayName' value={props.data.name} onChange={handleNameChange} />
      </LabelInput>
      <LabelInput label='Description' htmlFor='description' message={MessageUtil.findMessage(props.messages, 'description')}>
        <textarea className='input' id='description' value={props.data.description} onChange={handleDescChange} />
      </LabelInput>
      <LabelInput label='Means / Documents' htmlFor='documents'>
        {/* <textarea className='input' id='documents' defaultValue='todo: documents list' /> */}
        <Table data={props.data.documents} onChange={handleDocChange} />
      </LabelInput>
      <CollapsiblePart collapsibleLabel='Tags' defaultOpen={props.data.tags.length > 0}>
        <Tags tags={props.data.tags} onChange={handleTagsChange} />
      </CollapsiblePart>
    </div>
  );
};

export default NameTab;
