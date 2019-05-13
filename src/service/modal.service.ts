import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals: any[] = [];

  open(id: string) {
    // open modal specified by id
    let modal: any = this.modals.filter(x => x.id === id)[0];
    modal.open();
  }

  close(id: string) {
    // close modal specified by id
    let modal: any = this.modals.filter(x => x.id === id)[0];
    modal.close();
  }
}
