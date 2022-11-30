export const EMPTY_NAME_DOC: NameDoc = {
  description: '',
  url: '',
  action: ''
};

export type NameDoc = {
  description: string;
  url: string;
  action: string;
};

export type Doc = {
  description: string;
  url: string;
};
