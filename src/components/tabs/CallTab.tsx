import CollapsiblePart from './CollapsiblePart';
import SelectDialog from './SelectDialog';
import { CallTabData } from '../../data/call-tab';
import './CallTab.css';
import { Message } from '../../data/message';

const CallTab = (props: { data: CallTabData; onChange: (change: CallTabData) => void; messages: Message[] }) => {
  return (
    <div className='call-tab'>
      <SelectDialog data={props.data} onChange={props.onChange} messages={props.messages} />
      <CollapsiblePart collapsibleLabel='Mapping of process to dialog data' defaultOpen={false}>
        <p>todo: mappings</p>
      </CollapsiblePart>
    </div>
  );
};

export default CallTab;
