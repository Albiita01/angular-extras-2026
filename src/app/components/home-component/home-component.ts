import { ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ServiceUpload } from '../../services/service.upload';

@Component({
  selector: 'app-home-component',
  standalone: false,
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {

  private _serviceUpload: ServiceUpload = inject(ServiceUpload);

  @ViewChild("cajaImagen") cajaImagen!: ElementRef<HTMLInputElement>;
  public mensaje!: string;

  constructor(private _cdr: ChangeDetectorRef) { }

  private convertirBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  async subirImagen(): Promise<void> {
    const file = this.cajaImagen.nativeElement.files?.[0];

    if (!file) {
      this.mensaje = "Por favor, selecciona una imagen primero.";
      this._cdr.detectChanges();
      return;
    }

    try {
      const dataUrl = await this.convertirBase64(file);
      const base64Content = dataUrl.split(',')[1];

      const imagenData = {
        fileContent: base64Content,
        fileName: file.name
      };

      await this._serviceUpload.postImageAsync(imagenData);
      this.mensaje = "¡Fichero subido con éxito al servidor!";
    } catch (error: any) {
      console.error(error);
      this.mensaje = "Error al subir el fichero.";
    }

    this._cdr.detectChanges();
  }
}