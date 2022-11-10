import {RoutersStateInterface} from "../types/routersState.interface";
import {Observable, of} from "rxjs";


export class RouterModel implements RoutersStateInterface {

  isLoggedIn: boolean =  false;
  isLoading: boolean = false;
  data: any[];
  errors: any[];


}
