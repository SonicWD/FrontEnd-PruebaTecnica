'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"
import ClientForm from '@/components/ClientForm'
import {Button} from '@/components/ui/button'; // Ajusta el path según tu estructura de carpetas

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

  const handleFormSubmit = (data: IClientForm) => {
    console.log('Datos del nuevo cliente:', data)
    // Aquí iría la lógica para enviar los datos al servidor
    toast({
      title: "Cliente creado",
      description: "El cliente ha sido creado exitosamente.",
    })
    router.push('/clients')
  }

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
          age: 0,
          phoneNumber: ''
        }}
        onSubmit={handleFormSubmit}
      />
    </motion.div>
  )
}

export default CreateClient
