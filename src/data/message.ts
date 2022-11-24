export enum MessageSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error'
}

export interface Message {
  field: string;
  severity: MessageSeverity;
  message: string;
}
