import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { firstValueFrom } from "rxjs";

@Injectable()
export class ServiceUpload {

    url = environment.urlApiImagenes;

    constructor(private _http: HttpClient) { }

    async postImageAsync(imagen: any): Promise<any> {
        let request = "api/testingFiles";
        let json = JSON.stringify(imagen);
        let header = new HttpHeaders().set("content-type", "application/json");
        return firstValueFrom(this._http.post(this.url + request, json, { headers: header }));
    }
}