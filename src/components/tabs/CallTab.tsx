import React, { useState } from "react"
import { useCombobox } from 'downshift'
import './CallTab.css';
import LabelInput from "./LabelInput";

const callables: Callable[] = [
  {value: 'workflow.humantask.AcceptRequest', process: 'AcceptRequest', project: 'workflow.humantask [workflow-demos]'},
  {value: 'workflow.credit.ApproveLevel1', process: 'ApproveLevel1', project: 'workflow.credit [workflow-demos]'},
  {value: 'workflow.credit.ApproveLevel2', process: 'ApproveLevel2', project: 'workflow.credit [workflow-demos]'},
  {value: 'demo.test1', process: 'test1', project: 'demo [demo]'},
  {value: 'demo.test2', process: 'test2', project: 'demo [demo]'},
  {value: 'demo.test3', process: 'test3', project: 'demo [demo]'},
  {value: 'demo.test4', process: 'test4', project: 'demo [demo]'},
  {value: 'demo.test5', process: 'test5', project: 'demo [demo]'},
  {value: 'demo.test6', process: 'test6', project: 'demo [demo]'},
  {value: 'demo.test7', process: 'test7', project: 'demo [demo]'},
  {value: 'demo.test8', process: 'test8', project: 'demo [demo]'},
  {value: 'demo.test9', process: 'test9', project: 'demo [demo]'}
]

const starts: Start[] = [
  {value: 'start():ProcurementRequest,LogEntry'},
  {value: 'start2()'},
  {value: 'test(String):boolean'},
]

const CallTab = () => (
  <div className='call-tab'>
    <SelectCallable callables={callables} />
    <SelectStart starts={starts} />
  </div>
)

const SelectStart = (props: {starts: Start[]}) => {
  const itemFilter = (item: Start, input?: string) => {
    if (!input) {
      return true;
    }
    var filter = input.toLowerCase();
    return (
      item.value.toLowerCase().includes(filter)
    )
  }

  const [items, setItems] = useState(props.starts);
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem
  } = useCombobox({
    onSelectedItemChange() {
      setItems(props.starts)
    },
    onInputValueChange(change) {
      if (change.type !== '__item_click__') {
        setItems(props.starts.filter(start => itemFilter(start, change.inputValue)))
      }
    },
    items,
    itemToString(item) {
      return item?.value ?? ''
    },
  });

  return (
    <div className="combobox">
      <LabelInput label='Start' htmlFor='startSelect' {...getLabelProps()}>
        <div className="combobox-input">
          <input id='startSelect' placeholder="Select start" className="input" {...getInputProps()} />
          <button aria-label="toggle menu" className="combobox-button" type="button" {...getToggleButtonProps()}>
            {isOpen ? <>&#8593;</> : <>&#8595;</>}
          </button>
        </div>
      </LabelInput>
      <ul {...getMenuProps()} className="combobox-menu">
        {isOpen && items.map((item, index) => (
          <li className={`combobox-menu-entry ${highlightedIndex === index ? 'hover' : ''} ${selectedItem?.value === item.value ? 'selected' : ''}`}
            key={`${item.value}${index}`}
            {...getItemProps({item, index})}
          >
            <span>{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface Start {
  value: string
}

const SelectCallable = (props: {callables: Callable[]}) => {
  const itemFilter = (item: Callable, input?: string) => {
    if (!input) {
      return true;
    }
    var filter = input.toLowerCase();
    return (
      item.value.toLowerCase().includes(filter) ||
      item.process.toLowerCase().includes(filter) ||
      item.project.toLowerCase().includes(filter)
    )
  }

  const [items, setItems] = useState(props.callables);
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem
  } = useCombobox({
    onSelectedItemChange() {
      setItems(props.callables)
    },
    onInputValueChange(change) {
      if (change.type !== '__item_click__') {
        setItems(props.callables.filter(callable => itemFilter(callable, change.inputValue)))
      }
    },
    items,
    itemToString(item) {
      return item?.value ?? ''
    },
  });

  return (
    <div className="combobox">
      <LabelInput label='User Dialog Start' htmlFor='dialogSelect' {...getLabelProps()}>
        <div className="combobox-input">
          <input id='dialogSelect' placeholder="Select callable" className="input" {...getInputProps()} />
          <button aria-label="toggle menu" className="combobox-button" type="button" {...getToggleButtonProps()}>
            {isOpen ? <>&#8593;</> : <>&#8595;</>}
          </button>
        </div>
      </LabelInput>
      <ul {...getMenuProps()} className="combobox-menu">
        {isOpen && items.map((item, index) => (
          <li className={`combobox-menu-entry ${highlightedIndex === index ? 'hover' : ''} ${selectedItem?.value === item.value ? 'selected' : ''}`}
            key={`${item.value}${index}`}
            {...getItemProps({item, index})}
          >
            <span>{item.process}</span>
            <span className="comboboy-menu-entry-additional"> - {item.project}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface Callable {
  value: string,
  process: string,
  project: string
}

export default CallTab;