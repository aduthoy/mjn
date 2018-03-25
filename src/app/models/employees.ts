import {CatAreas} from './cat-areas';
import {Puestos} from './puestos';

export class Employees {
  id: number;
  idEmpleado: string;
  nombreEmpleado: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  activo: boolean;
  user_create: number;
  user_update: number;
  created_at: string;
  updated_at: string;
  area: CatAreas;
  puesto: Puestos;
}
