'use client';
// sE PUEDE BORRAR 
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import config from "@/utils/config";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";
import ClientInfo from "@/components/ClientInfo"; // Importa el nuevo componente

interface IClient {
  id: string;
  name: string;
  identificationType: string;
  identificationNumber: string;
  email: string;
  age: number;
  phoneNumber: string;
}

export default function ClientDetail({ params }: { params: { id: string } }) {
  const [client, setClient] = useState<IClient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/get_client/${params.id}`);
        setClient(response.data);
      } catch (err) {
        setError('No se pudo cargar la información del cliente.');
      } finally {
        setLoading(false);
      }
    };

    fetchClientDetails();
  }, [params.id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${config.API_URL}/delete_client/${params.id}`);
      router.push('/clients');
    } catch (err) {
      setError('No se pudo eliminar el cliente.');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!client) {
    return <div>No se encontró el cliente.</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Detalle del Cliente</h1>
      <ClientInfo client={client} /> {/* Muestra los detalles del cliente */}
      <div className="mt-6 flex justify-end space-x-4">
        <Link
          href={`/clients/${params.id}/edit`}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Editar
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
