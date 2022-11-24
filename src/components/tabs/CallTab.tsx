import { useEffect, useState } from 'react';
import { Message, MessageSeverity } from '../../data/message';
import { TabState } from '../Header';
import './CallTab.css';
import CollapsiblePart from './CollapsiblePart';
import SelectDialog from './SelectDialog';

export interface CallData {
  dialog: string;
  start: string;
  messages: Map<string, Message>;
}

export function useCallTab(): [CallData, TabState, (change: CallData) => void] {
  const [callData, setCallData] = useState({ dialog: '', start: '', messages: new Map() } as CallData);
  const [callTab, setCallTab] = useState(TabState.WARNING);
  const handleCallDataChange = (change: CallData) => {
    setCallData(change);
  };
  useEffect(() => {
    const messages = structuredClone(callData.messages);
    if (callData.dialog.length === 0) {
      messages.set('dialog', {
        field: 'dialog',
        severity: MessageSeverity.WARNING,
        message: '⚠️ No User Dialog specified, auto dialog will be shown.'
      });
    } else {
      messages.delete('dialog');
    }
    if (messages.size !== callData.messages.size) {
      setCallData({ ...callData, messages: messages });
    }
    const errors = Array.from(callData.messages.values()).find(message => message.severity === MessageSeverity.ERROR);
    const warnings = Array.from(callData.messages.values()).find(message => message.severity === MessageSeverity.WARNING);
    if (errors) {
      setCallTab(TabState.ERROR);
    } else if (warnings) {
      setCallTab(TabState.WARNING);
    } else {
      setCallTab(TabState.DIRTY);
    }
  }, [callData]);
  return [callData, callTab, handleCallDataChange];
}

const CallTab = (props: { data: CallData; onChange: (change: CallData) => void }) => {
  return (
    <div className='call-tab'>
      <SelectDialog data={props.data} onChange={props.onChange} />
      <CollapsiblePart collapsibleLabel='Mapping of process to dialog data' defaultOpen={false}>
        <p>todo: mappings</p>
      </CollapsiblePart>
    </div>
  );
};

export default CallTab;
