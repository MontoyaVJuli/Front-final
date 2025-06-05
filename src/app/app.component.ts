import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Empleado } from '@app/models/empleado.model';
import { EmpleadoServiceService } from '@app/services';
import { Component, OnInit } from '@angular/core';
import { DepartamentoService} from "@app/services/departamento.service";
import { CiudadService} from "@app/services/ciudad.service";
import { EmpresaService} from "@app/services/empresa.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Lilfac';
  id = '00000000-0000-0000-0000-000000000000';
  nombre = '';
  apellido = '';
  tipoDocumento = '';
  cedula = '';
  telefono = '';
  correo = '';
  direccionResidencia = '';
  departamento = '';
  ciudad = '';
  empresa = '';


  listaTipoDocumento = [
    { id: 'CC', nombre: 'Cédula de ciudadanía' },
  ];

  listaDepartamentos: any[] = [];
  listaCiudades: any[] = [];
  listaEmpresa: any[] = [];
  ciudadesFiltradas: any[] = [];

  constructor(
      private empleadoService: EmpleadoServiceService,
      private departamentoService: DepartamentoService,
      private ciudadService: CiudadService,
      private empresaService: EmpresaService

){}

  ngOnInit(): void {
    this.departamentoService.getDepartamentos().subscribe(data => this.listaDepartamentos = data);
    this.ciudadService.getCiudades().subscribe(data => this.listaCiudades = data);
    this.empresaService.getEmpresas().subscribe(data => this.listaEmpresa = data);
  }

  onDepartamentoChange() {
    this.ciudadesFiltradas = this.listaCiudades.filter(
        ciudad => ciudad.departamento?.id === this.departamento
    );
    this.ciudad = '';
  }

  agregarEmpleado() {
    if (
        !this.nombre || !this.apellido || !this.cedula || !this.telefono ||
        !this.correo || !this.direccionResidencia || !this.departamento || !this.ciudad || !this.empresa
    ) {
      alert('Por favor completa todos los campos');
      return;
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.correo);
    if (!correoValido) {
      alert('El correo electrónico ingresado no es válido');
      return;
    }

    const telefonoValido = /^\+?[0-9]{7,20}$/.test(this.telefono);
    if (!telefonoValido) {
      alert('El número de teléfono ingresado no es válido (debe contener solo números y opcional +)');
      return;
    }

    const empleado: Empleado = {
      nombre: this.nombre.trim(),
      apellido: this.apellido.trim(),
      cedula: this.cedula.trim(),
      telefono: this.telefono.trim(),
      correo: this.correo.trim(),
      direccionResidencia: this.direccionResidencia.trim(),
      ciudad: { id: this.ciudad },
      departamento: { id: this.departamento },
      empresa: { id: this.empresa }
    };

    this.empleadoService.createEmpleado(empleado).subscribe({
      next: (respuesta) => {
        console.log('Empleado agregado exitosamente', respuesta);
        alert('Empleado agregado con éxito');
      },
      error: (error) => {
        console.error('Error al agregar el empleado', error);
        alert('Hubo un error al agregar el empleado');
      }
    });
  }
}