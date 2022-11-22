import { Label } from '@radix-ui/react-label';
import './NameTab.css';

const NameTab = () => (
  <div className='name-tab'>
    <Label className="label" htmlFor="displayName">
      Display name
    </Label>
    <input className="input" type="text" id="displayName" defaultValue="" />
  </div>
)

export default NameTab;