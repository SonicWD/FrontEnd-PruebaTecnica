'use client'

import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Edit, Trash2, ArrowLeft, User, Mail, Phone, Calendar, IdCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import config from "@/utils/config"

interface IClient {
  id: string
  nombre: string
  tipo_identificacion: string
  numero_identificacion: string
  correo: string
  edad: number
  telefono: string
}

export default function ClientDetail({ params }: { params: { id: string } }) {
  const [client, setClient] = useState<IClient | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/get_client/${params.id}`)
        console.log('Respuesta de la API (GET):', response.data)
        setClient(response.data)
      } catch (err) {
        toast({
          title: "Error",
          description: "No se pudo cargar la información del cliente.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchClientDetails()
  }, [params.id])

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este cliente?")) {
      try {
        await axios.delete(`${config.API_URL}/delete_client/${params.id}`)
        toast({
          title: "Éxito",
          description: "Cliente eliminado correctamente.",
        })
        router.push('/clients')
      } catch (err) {
        toast({
          title: "Error",
          description: "No se pudo eliminar el cliente.",
          variant: "destructive",
        })
      }
    }
  }

  const ClientInfoItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) => (
    <div className="flex items-center space-x-2 p-2 rounded-lg bg-gray-800 bg-opacity-50">
      <div className="text-primary">{icon}</div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8"
    >
      <div className="container mx-auto max-w-3xl">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mb-6 text-white border-white hover:bg-white hover:text-black transition-colors duration-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver
        </Button>
        
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl font-bold mb-6 text-white text-center"
        >
          Detalle del Cliente
        </motion.h1>

        {loading ? (
          <Card className="bg-gray-800 border border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle><Skeleton className="h-8 w-3/4" /></CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>
        ) : client ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gray-800 border border-gray-700 shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary to-primary-dark">
                <CardTitle className="text-3xl font-bold text-white flex items-center justify-between">
                  <span>{client.nombre}</span>
                  <Badge variant="secondary" className="text-sm">
                    ID: {client.id}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 p-6">
                <ClientInfoItem 
                  icon={<IdCard className="h-5 w-5" />}
                  label="Identificación"
                  value={`${client.tipo_identificacion}: ${client.numero_identificacion}`}
                />
                <ClientInfoItem 
                  icon={<Mail className="h-5 w-5" />}
                  label="Correo Electrónico"
                  value={client.correo}
                />
                <ClientInfoItem 
                  icon={<Phone className="h-5 w-5" />}
                  label="Teléfono"
                  value={client.telefono}
                />
                <ClientInfoItem 
                  icon={<Calendar className="h-5 w-5" />}
                  label="Edad"
                  value={client.edad}
                />
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <p className="text-center text-xl">No se encontró el cliente.</p>
        )}

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex justify-center space-x-4"
        >
          <Link href={`/clients/${params.id}/edit`} passHref>
            <Button
              variant="outline"
              className="bg-yellow-500 hover:bg-yellow-600 text-black border-white hover:border-yellow-300 transition-colors duration-300"
            >
              <Edit className="mr-2 h-4 w-4" /> Editar
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white border-white hover:border-red-300 transition-colors duration-300"
          >
            <Trash2 className="mr-2 h-4 w-4" /> Eliminar
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}