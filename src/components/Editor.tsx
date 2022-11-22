import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import { Separator } from "@radix-ui/react-separator";
import Header from "./Header";
import './Editor.css';

export interface TabProps {
  id: string,
  label: string,
  content: JSX.Element,
  value: string,
  state?: string
}

export interface EditorProps {
  tabsList: TabProps[],
  activeTab?: string
};

const Editor = (props: EditorProps) => {
  return (
    <div className='editor'>
      <Tabs className='tabs-root' defaultValue={props.activeTab}>
        <Header {...props}/>
        <Separator className="separator-root" style={{ margin: '15px 0' }} />
        {props.tabsList.map((tab, index) => (
          <TabsContent key={tab.id || `${index}-${tab.value}`} className='tabs-content' value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default Editor;
