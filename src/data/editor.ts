import { useEffect, useState } from 'react';
import { CallTabProps, useCallTab } from './call-tab';
import { Message, MessageSeverity } from './message';
import { NameTabProps, useNameTab } from './name-tab';

export interface UserDialogProps {
  nameTab: NameTabProps;
  callTab: CallTabProps;
  headerState: Message[];
}

export function useUserDialogEditor(): UserDialogProps {
  const nameTabProps = useNameTab({
    name: 'test name',
    description: 'test desc',
    tags: ['bla', 'zag']
  });
  const callTabProps = useCallTab({ dialog: '', start: '' });
  const [headerState, setHeaderState] = useState([] as Message[]);

  useEffect(() => {
    const messages = [...nameTabProps.messages, ...callTabProps.messages];
    if (messages.length > 0) {
      setHeaderState(messages);
    } else {
      setHeaderState([{ field: 'name', severity: MessageSeverity.INFO, message: nameTabProps.data.name }]);
    }
  }, [nameTabProps.data, nameTabProps.messages, callTabProps.messages]);
  return { nameTab: nameTabProps, callTab: callTabProps, headerState: headerState };
}
