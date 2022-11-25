import { useEffect, useState } from 'react';
import { Message, MessageSeverity } from './message';

export enum TabState {
  EMPTY = 'empty',
  CONFIGURED = 'configured',
  DIRTY = 'dirty',
  WARNING = 'warning',
  ERROR = 'error'
}

export function useTabState(messages: Message[]): TabState {
  const [tabState, setTabState] = useState(TabState.EMPTY);
  useEffect(() => {
    const errors = messages.find(message => message.severity === MessageSeverity.ERROR);
    const warnings = messages.find(message => message.severity === MessageSeverity.WARNING);
    if (errors) {
      setTabState(TabState.ERROR);
    } else if (warnings) {
      setTabState(TabState.WARNING);
    } else {
      setTabState(TabState.DIRTY);
    }
  }, [messages]);
  return tabState;
}
