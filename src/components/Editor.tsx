import { Tabs, TabsContent } from '@radix-ui/react-tabs';
import { Separator } from '@radix-ui/react-separator';
import Header, { HeaderProps } from './Header';
import './Editor.css';

export interface EditorProps extends HeaderProps {}

const Editor = (props: EditorProps) => {
  return (
    <div className='editor'>
      <Tabs className='tabs-root' defaultValue={props.activeTab}>
        <Header {...props} />
        <Separator className='separator-root' style={{ margin: '15px 0' }} />
        {props.tabsList.map((tab, index) => (
          <TabsContent key={tab.id || `${index}-${tab.value}`} className='tabs-content' value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Editor;
