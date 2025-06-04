import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Empleado } from '@app/models/empleado.model';
import { EmpleadoServiceService } from '@app/services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
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
    { nombre: 'Cedula' }
  ];

  listaDepartamentos = [
    { id: '59aa818e-2654-4631-a5c8-de2ed384f0ee', nombre: 'Antioquia' },
    { id: '4fcc60f1-1f15-4462-99f1-60031b26864b', nombre: 'Cundinamarca' },
    { id: 'b1ba914e-8435-4ee5-bab5-0b86c9dd7e9c', nombre: 'Valle del Cauca' },
  ];

  listaCiudades = [
    { id: 'a4bdaa50-6f59-42cb-bf23-a653a44f009d', nombre: 'Medellin', departamentoId: '59aa818e-2654-4631-a5c8-de2ed384f0ee' },
    { id: 'eda344d5-b1c0-4a5e-b364-1b2bd64e93b0', nombre: 'Rionegro', departamentoId: '59aa818e-2654-4631-a5c8-de2ed384f0ee' },
    { id: 'b92a024e-d8e3-4fa7-99d5-e957ed64a91a', nombre: 'Bogota', departamentoId: '4fcc60f1-1f15-4462-99f1-60031b26864b' },
    { id: 'a13f5764-1293-4637-819e-9f579608155f', nombre: 'Cali', departamentoId: 'b1ba914e-8435-4ee5-bab5-0b86c9dd7e9c' },
  ];

  listaEmpresa = [
    { id:'c4bdaa70-6f50-67cb-bf23-a653a44f009d', nombre: 'Empresa ejemplo' }
  ];

  ciudadesFiltradas: any[] = [];

  constructor(private empleadoService: EmpleadoServiceService) {}

  onDepartamentoChange() {
    this.ciudadesFiltradas = this.listaCiudades.filter(
        ciudad => ciudad.departamentoId === this.departamento
    );
    this.ciudad = '';
  }

  agregarEmpleado() {
    if (!this.nombre || !this.apellido || !this.cedula || !this.telefono || !this.correo
        || !this.direccionResidencia || !this.ciudad || !this.departamento || !this.empresa) {
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
      alert('El número de teléfono ingresado no es válido (debe contener solo números, espacios o +)');
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
