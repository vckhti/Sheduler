import {AuthStateInterface} from "../../types/authState.interface";
import {clientTypeInterface} from "../../types/clientType.interface";
// TODO: додумать
export class TypeOfClientsModel {
  data: any;
  errors: any;
  isLoading: boolean;
  isLoggedIn: boolean | null;
  isSubmitting: boolean;
  asc: boolean = false;

  public sortById(): void {
    console.log('model', this.data);
    /*this.data.data.sort((a: clientTypeInterface, b: clientTypeInterface) => {
      if (a.type < b.type) {
        return this.asc ? 1 : -1;
      } else if (a.type > b.type) {
        return this.asc ? -1 : 1;
      }

      return 0;
    });*/
    console.log('after', this.data);
  }

  constructor()
  {
    this.data = [];
    this.errors = null;
    this.isLoading = false;
    this.isLoggedIn = null;
    this.isSubmitting = false;
  }



}
