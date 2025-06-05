export interface Empleado {
  id?: string;
  nombre: string;
  apellido: string;
  tipoDocumento?: string;
  cedula: string;
  telefono: string;
  correo: string;
  direccionResidencia: string;
  departamento: { id: string, };
  ciudad: { id: string };
  empresa: { id: string };
}
