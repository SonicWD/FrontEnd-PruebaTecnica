'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ClientForm from '@/components/ClientForm';
import axios from 'axios';
import config from '@/utils/config';

interface IClientForm {
  id?: string;
  name: string;
  identificationType: string;
  identificationNumber: string;
  email: string;
  age: number;
  phoneNumber: string;
}

export default function EditClient({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [formData, setFormData] = useState<IClientForm | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/get_client/${params.id}`);
        console.log('Respuesta de la API:', response.data);
        
        // Transformar los datos para que coincidan con la interfaz IClientForm
        const datosTransformados: IClientForm = {
          id: response.data.id,
          name: response.data.nombre,
          identificationType: response.data.tipo_identificacion,
          identificationNumber: response.data.numero_identificacion,
          email: response.data.correo,
          age: response.data.edad,
          phoneNumber: response.data.telefono,
        };
        
        setFormData(datosTransformados);
        console.log('Datos del cliente transformados:', datosTransformados);
      } catch (err) {
        setError('No se pudo cargar la información del cliente.');
        console.error('Error al obtener los datos del cliente:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [params.id]);

  const handleFormSubmit = async (data: IClientForm) => {
    try {
      await axios.put(`${config.API_URL}/update_client/${params.id}`, data);
      console.log('Datos actualizados:', data);
      router.push(`/clients/${params.id}`);
    } catch (err) {
      console.error('Error al actualizar los datos del cliente:', err);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!formData) {
    return <div>No se encontró el cliente.</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Editar Cliente</h1>
      <ClientForm defaultValues={formData} onSubmit={handleFormSubmit} />
    </div>
  );
}