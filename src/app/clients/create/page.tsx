'use client'
//CreateClient.tsx
//importaciones
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"
import ClientForm from '@/components/ClientForm'
import { Button } from '@/components/ui/button'; 
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

const CreateClient = () => {
  const router = useRouter()

  // Función para enviar los datos a la API
  const handleFormSubmit = async (data: IClientForm) => {
    try {
      console.log('Datos del nuevo cliente:', data)

      // Realizar la petición POST a la API para crear el cliente
      const response = await fetch(`${config.API_URL}/create_client`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: data.name,
          tipo_identificacion: data.identificationType,
          numero_identificacion: data.identificationNumber,
          correo: data.email,
          edad: data.age,
          telefono: data.phoneNumber,
        }),
      });

      // Manejar la respuesta
      if (response.ok) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const responseData = await response.json();
        toast({
          title: "Cliente creado",
          description: "El cliente ha sido creado exitosamente.",
        });
        router.push('/clients');
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: `No se pudo crear el cliente: ${errorData.detail}`,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error al crear el cliente:', error);
      toast({
        title: "Error",
        description: "Ocurrió un error al intentar crear el cliente.",
        variant: 'destructive',
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-6 py-8"
    >
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver
      </Button>
      <motion.h1
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        className="text-4xl font-bold mb-6 text-primary"
      >
        Crear Nuevo Cliente
      </motion.h1>
      <ClientForm
        defaultValues={{
          name: '',
          identificationType: '',
          identificationNumber: '',
          email: '',
          age: 18,
          phoneNumber: ''
        }}
        onSubmit={handleFormSubmit}
      />
    </motion.div>
  );
};

export default CreateClient;
