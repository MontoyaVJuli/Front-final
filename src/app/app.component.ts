import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  RouterModule } from '@angular/router';
import {Client} from '@app/models/client.model';
import {ClientServiceService} from '@app/services';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Lilfac';
  id = '00000000-0000-0000-0000-000000000000';
  nombre = '';
  apellido = '';
  cedula = '';
  telefono = '';
  correo = '';
  direccionResidencia = '';
  ciudad = '';
  listaCiudades = [
    { nombre: 'Medellín' },
    { nombre: 'Bogotá' },
    { nombre: 'Cali' },
    { nombre: 'Rionegro' }
  ];
  departamento = '';
  listaDepartamentos = [
    { nombre: 'Antioquia' },
    { nombre: 'Cundinamarca' },
    { nombre: 'Valle del cauca' },
  ];

  constructor(private clientService: ClientServiceService) {}

  agregarCliente() {
    if (!this.nombre || !this.apellido || !this.cedula || !this.telefono || !this.correo || !this.direccionResidencia || !this.ciudad || !this.departamento) {
      alert('Por favor completa todos los campos');
      return;
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.correo);
    if (!correoValido) {
      alert('Correo electrónico  inválido');
      return;
    }

    const cliente: Client = {
      nombre: this.nombre,
      apellido: this.apellido,
      cedula: this.cedula,
      telefono: this.telefono,
      correo: this.correo,
      direccionResidencia: this.direccionResidencia,
      ciudad: this.ciudad,
      departamento: this.departamento,
    };

    this.clientService.createClient(cliente).subscribe({
      next: (respuesta) => {
        console.log('Cliente agregado exitosamente', respuesta);
        alert('Cliente agregado con éxito');
      },
      error: (error) => {
        console.error('Error al agregar el cliente', error);
        alert('Hubo un error al agregar el cliente');
      }
    });
  }

}
