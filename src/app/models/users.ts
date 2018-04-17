import {Address} from './address';
import {Company} from './company';

export class Users {
  id: number;
  name: string;
  email: string;
  token: string;
  created_at: string;
  updated_at: string;
  administrador: boolean;
  employeeId: number;
}
