//Esto ya no se utiliza en la API, pero se mantiene por si acaso.    //     try {
export interface Client {
    id: number;
    nombre: string;
    tipo_identificacion: string;  
    numero_identificacion: string;
    correo: string; 
    edad: number;
    telefono: string;
    fecha_creacion: string;  
    fecha_actualizacion?: string;  
  }
  