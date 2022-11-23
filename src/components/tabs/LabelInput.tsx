import { Label } from '@radix-ui/react-label';
import './LabelInput.css';

const LabelInput = (props: {label: string, htmlFor: string, children: JSX.Element}) => (
  <div className='label-input-column'>
    <Label className="label" htmlFor="displayName">
      {props.label}
    </Label>
    {props.children}
  </div>
)

export default LabelInput;