import { Message } from '../../data/message';
import './CallTab.css';
import CollapsiblePart from './CollapsiblePart';
import SelectDialog from './SelectDialog';

export interface CallData {
  dialog: string;
  start: string;
  messages: Map<string, Message>;
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
