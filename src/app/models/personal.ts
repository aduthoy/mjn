import {CatAreas} from './cat-areas';
import {Puestos} from './puestos';

export class Personal {
  id: number;
  idEmpleado: string;
  nombreEmpleado: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  areaEmpleado: CatAreas;
  puestoEmpleado: Puestos;
}
