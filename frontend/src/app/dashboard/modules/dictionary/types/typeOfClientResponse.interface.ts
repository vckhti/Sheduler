import {clientTypeInterface} from "./clientType.interface";

export interface typeOfClientResponseInterface {
  data: clientTypeInterface[],
  error: string,
  success : boolean
}
