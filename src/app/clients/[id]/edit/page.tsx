'use client'
//ClientList.tsx
// Se edita un cliente por ID
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ClientForm from '@/components/ClientForm';
import axios from 'axios';
import config from '@/utils/config';
import LoadingSpinner from '@/components/LoadingSpinner';

interface IClientForm {
  id?: string;
  name: string;
  identificationType: string;
  identificationNumber: string;
  email: string;
  age: number;
  phoneNumber: string;
}
// Se obtiene el cliente por ID y se actualiza
export default function EditClient({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [formData, setFormData] = useState<IClientForm | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/get_client/${params.id}`);
        console.log('Respuesta de la API (GET):', response.data);
        
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
// Se actualiza el cliente
  const handleFormSubmit = async (data: IClientForm) => {
    const transformedData = {
      nombre: data.name,
      tipo_identificacion: data.identificationType,
      numero_identificacion: data.identificationNumber,
      correo: data.email,
      edad: data.age,
      telefono: data.phoneNumber,
    };
  
  
    try {//se manda a la API la Informacion 
      const response = await axios.put(`${config.API_URL}/update_client/${params.id}`, transformedData);
      console.log('Respuesta de la API después de actualizar:', response.data);
      router.push(`/clients/${params.id}`);
    } catch (err) {
      console.error('Error al actualizar los datos del cliente:', err);
      if (axios.isAxiosError(err)) {
        if (err.response) {
          console.error('Respuesta de error del servidor:', err.response.data);
          // Verificar y manejar posibles respuestas vacías o errores
          if (err.response.data) {
            setError(`Error al actualizar: ${err.response.data.detail || 'Revise los datos e intente de nuevo.'}`);
          } else {
            setError('Respuesta vacía del servidor.');
          }
        } else {
          setError('Hubo un error al guardar los datos del cliente. Por favor, intente de nuevo.');
        }
      } else {
        setError('Error desconocido al guardar los datos del cliente.');
      }
    }
  };
  

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
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