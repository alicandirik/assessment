import { Table } from './table';

export interface Board {
  id: string;
  name: string;
  creator: string;
  createdAt: Date;
  viewedAt?: Date;
  color: string;
  tables?: Table[];
}
