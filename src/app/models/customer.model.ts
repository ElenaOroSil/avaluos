export class Customer {
    folio: number;
    producto: string;
    origen: string;
    tipoInmueble: string;
    valuador: string;
    responsable: number;
    propietario: string;
    solicitante: string;
    fecha: string;
    labels: any;
  
    constructor(customer) {
      this.folio = customer.folio;
      this.producto = customer.producto;
      this.origen = customer.origen;
      this.tipoInmueble = customer.tipoInmueble;
      this.valuador = customer.valuador;
      this.responsable = customer.responsable;
      this.propietario = customer.propietario;
      this.solicitante = customer.solicitante;
      this.fecha = customer.fecha;
      this.labels = customer.labels;
    }
  
  //  get name() {
  //    let name = '';
  
  //    if (this.firstName && this.lastName) {
  //      name = this.firstName + ' ' + this.lastName;
  //    } else if (this.firstName) {
  //      name = this.firstName;
  //    } else if (this.lastName) {
   //     name = this.lastName;
   //   }
  
  //    return name;
   // }
  
  //  set name(value) {
  //  }
  
  //  get address() {
  //    return `${this.street}, ${this.zipcode} ${this.city}`;
  //  }
  
  //  set address(value) {
  //  }
  }
  