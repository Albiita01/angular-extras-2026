import { Component, inject } from '@angular/core';
import { ServiceUpload } from '../../services/service.upload';

@Component({
  selector: 'app-home-component',
  standalone: false,
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {

  private _service: ServiceUpload = inject(ServiceUpload);

  async subirImagen(): Promise<void> {

  }
}
