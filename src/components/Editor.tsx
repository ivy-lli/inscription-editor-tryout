import { Tabs, TabsContent } from "@radix-ui/react-tabs";
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
