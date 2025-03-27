import { UUID } from 'crypto';

export interface ResponseProduct {
  id: UUID;
  name: string;
  price: number;
}
