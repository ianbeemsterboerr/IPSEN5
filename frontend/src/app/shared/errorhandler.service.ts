import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class ErrorhandlerService {
  constructor(private toastr: ToastrService) {
  }
  public handleError(error: HttpErrorResponse, title: any= 'Error!') {
    if (error.error instanceof ErrorEvent) {
      this.toastr.error( 'Could not connect to server!');

    } else {
      console.log('httperror');
      this.toastr.error(error.error.message, title);
    }
  }
}
