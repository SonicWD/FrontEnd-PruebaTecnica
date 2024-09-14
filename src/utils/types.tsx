export interface Client {
    id: number;
    nombre: string;
    tipo_identificacion: string;  // Cambiado a `string` si `TipoIdentificacion` en la API es una cadena simple.
    numero_identificacion: string;
    correo: string;  // Cambiado a `string` si `EmailStr` en la API es una cadena simple.
    edad: number;
    telefono: string;
    fecha_creacion: string;  // En caso de que se devuelva en formato ISO 8601
    fecha_actualizacion?: string;  // Opcional
  }
  