'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ClientForm from '@/components/ClientForm';

// Define la interfaz para el tipo de datos del formulario
interface IClientForm {
  id?: string;
  name: string;
  identificationType: string;
  identificationNumber: string;
  email: string;
  age: number;
  phoneNumber: string;
}

const clientData: IClientForm = {
  id: '1',
  name: 'Juan Pérez',
  identificationType: 'DNI',
  identificationNumber: '12345678',
  email: 'juan@example.com',
  age: 35,
  phoneNumber: '+1234567890',
};

export default function EditClient({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [formData, setFormData] = useState<IClientForm>(clientData);

  useEffect(() => {
    // Aquí podrías hacer una llamada a la API para obtener los datos del cliente
    setFormData(clientData);
  }, [params.id]);

  const handleFormSubmit = (data: IClientForm) => {
    console.log('Datos actualizados:', data);
    // Lógica para enviar los datos actualizados al servidor
    router.push(`/clients/${params.id}`);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Editar Cliente</h1>
      <ClientForm defaultValues={formData} onSubmit={handleFormSubmit} />
    </div>
  );
}
