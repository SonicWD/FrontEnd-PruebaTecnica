import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import * as yup from "yup";
import { useClientStore } from "@/store/clientStore";  // Importa el store

interface IClientForm {
  name: string;
  identificationType: string;
  identificationNumber: string;
  email: string;
  age: number;
  phoneNumber: string;
}

interface ClientFormProps {
  defaultValues: IClientForm;
  clientId?: number; 
  onSubmit: (data: IClientForm) => void;
}

const schema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  identificationType: yup
    .string()
    .required("El tipo de identificación es obligatorio"),
  identificationNumber: yup
    .string()
    .required("El número de identificación es obligatorio"),
  email: yup
    .string()
    .email("Correo electrónico inválido")
    .required("El correo es obligatorio"),
  age: yup
    .number()
    .min(18, "Debes tener al menos 18 años")
    .required("La edad es obligatoria"),
  phoneNumber: yup.string().required("El número de teléfono es obligatorio"),
});

const ClientForm: React.FC<ClientFormProps> = ({ defaultValues, clientId, onSubmit }) => {
  console.log('Valores por defecto recibidos:', defaultValues);
  console.log('ID del cliente recibido:', clientId);

  const { clients } = useClientStore();
  const selectedClient = clientId ? clients.find(client => client.id === clientId) : null;

  console.log('Cliente seleccionado del store:', selectedClient);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IClientForm>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || (selectedClient ? {
      name: selectedClient.nombre,
      identificationType: selectedClient.tipo_identificacion,
      identificationNumber: selectedClient.numero_identificacion,
      email: selectedClient.correo,
      age: selectedClient.edad,
      phoneNumber: selectedClient.telefono,
    } : undefined),
  });

  useEffect(() => {
    console.log('useEffect activado. Valores por defecto:', defaultValues);
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  console.log('Errores del formulario:', errors);
  return (
    <form
    onSubmit={handleSubmit((data) => {
      console.log('Formulario enviado con datos:', data);
      onSubmit(data);
    })}
      className="bg-black text-white p-6 rounded-lg shadow-lg"
    >
      {/* Nombre */}
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="name"
        >
          Nombre
        </label>
        <input
          className={`shadow appearance-none border ${
            errors.name ? "border-red-500" : "border-white"
          } rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline`}
          id="name"
          {...register("name")}placeholder="Nombre"
        />
        {errors.name && (
          <p className="text-red-500 text-xs italic">{errors.name.message}</p>
        )}
      </div>

      {/* Tipo de identificación */}
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="identificationType"
        >
          Tipo de Identificación
        </label>
        <select
          className={`shadow appearance-none border ${
            errors.identificationType ? "border-red-500" : "border-white"
          } rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline`}
          id="identificationType"
          {...register("identificationType")}
        >
          <option value="">Seleccione...</option>
          <option value="DNI">DNI</option>
          <option value="Pasaporte">Pasaporte</option>
          <option value="Cédula">Cédula</option>
        </select>
        {errors.identificationType && (
          <p className="text-red-500 text-xs italic">
            {errors.identificationType.message}
          </p>
        )}
      </div>

      {/* Número de identificación */}
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="identificationNumber"
        >
          Número de Identificación
        </label>
        <input
          className={`shadow appearance-none border ${
            errors.identificationNumber ? "border-red-500" : "border-white"
          } rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline`}
          id="identificationNumber"
          {...register("identificationNumber")}
        />
        {errors.identificationNumber && (
          <p className="text-red-500 text-xs italic">
            {errors.identificationNumber.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="email"
        >
          Correo Electrónico
        </label>
        <input
          className={`shadow appearance-none border ${
            errors.email ? "border-red-500" : "border-white"
          } rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline`}
          id="email"
          type="email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-xs italic">{errors.email.message}</p>
        )}
      </div>

      {/* Edad */}
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="age"
        >
          Edad
        </label>
        <input
          className={`shadow appearance-none border ${
            errors.age ? "border-red-500" : "border-white"
          } rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline`}
          id="age"
          type="number"
          {...register("age")}
        />
        {errors.age && (
          <p className="text-red-500 text-xs italic">{errors.age.message}</p>
        )}
      </div>

      {/* Número de teléfono */}
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="phoneNumber"
        >
          Número de Teléfono
        </label>
        <input
          className={`shadow appearance-none border ${
            errors.phoneNumber ? "border-red-500" : "border-white"
          } rounded w-full py-2 px-3 text-white bg-black leading-tight focus:outline-none focus:shadow-outline`}
          id="phoneNumber"
          type="text"
          {...register("phoneNumber")}
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-xs italic">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      <button
        className="bg-black text-white border border-white font-bold py-3 px-6 rounded-md transition-colors duration-300 ease-in-out hover:bg-white hover:text-black hover:border-black focus:outline-none focus:ring-2 focus:ring-white"
        type="submit"
      >
        Guardar Cliente
      </button>
    </form>
  );
};

export default ClientForm;
