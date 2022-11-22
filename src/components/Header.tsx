import { TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { EditorProps } from "./Editor";
import editorIcon from '../icons/user-dialog.svg';
import './Header.css';

const Header = (props: EditorProps) => (
  <div className="header">
    <div className="header-title">
      <div className="header-editor">Inscribe User Dialog</div>
      <div className="header-status">Enter Request</div>
    </div>
    <TabsList className='tabs-list'>
      {props.tabsList.map((tab, index) => (
        <TabsTrigger key={tab.id || `${index}-${tab.value}`} className='tabs-trigger' value={tab.value}>
          <span className='dirty-state' data-state={tab.state} />
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>
    <img src={editorIcon} className="header-icon" alt="icon" />
  </div>
)

export default Header;
