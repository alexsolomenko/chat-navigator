export interface DOMData {
  title: string;
  url: string;
  headings: string[];
  links: string[];
  textContent: string;
}

export interface Message {
  type: string;
  data?: any;
}