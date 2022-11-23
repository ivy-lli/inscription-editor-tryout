import './CallTab.css';
import CollapsiblePart from './CollapsiblePart';
import SelectDialog from './SelectDialog';

const CallTab = () => {
  return (
    <div className='call-tab'>
      <SelectDialog />
      <CollapsiblePart collapsibleLabel='Mapping of process to dialog data' defaultOpen={false}>
        <p>todo: mappings</p>
      </CollapsiblePart>
    </div>
  )
}

export default CallTab;
