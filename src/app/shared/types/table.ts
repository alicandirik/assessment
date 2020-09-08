import { Card } from './card';

export interface Table {
  name: string;
  cards?: Card[];
  showInput?: boolean;
}
