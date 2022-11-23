import React, { useState } from "react"
import {useCombobox} from 'downshift'
import './CallTab.css';

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

const CallTab = () => (
  <div>
    <SelectCallable callables={callables} />
  </div>
)

const SelectCallable = (props: {callables: Callable[]}) => {
  const itemFilter = (item: Callable, input?: string) => {
    return (
      !input ||
      item.value.toLowerCase().includes(input) ||
      item.process.toLowerCase().includes(input) ||
      item.project.toLowerCase().includes(input)
    )
  }

  const [items, setItems] = useState(callables);
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
    onInputValueChange({inputValue}) {
      setItems(callables.filter(callable => itemFilter(callable, inputValue)))
    },
    items,
    itemToString(item) {
      return item?.value ?? ''
    },
  });

  return (
    <div className="combobox">
      <div className="label-input-column">
        <label className="label" {...getLabelProps()}>
          User Dialog Start
        </label>
        <div className="combobox-input">
          <input placeholder="Select callable" className="input" {...getInputProps()} />
          <button aria-label="toggle menu" className="combobox-button" type="button" {...getToggleButtonProps()}>
            {isOpen ? <>&#8593;</> : <>&#8595;</>}
          </button>
        </div>
      </div>
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