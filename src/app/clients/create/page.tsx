'use client'
// Crear Cliente
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function CreateClient() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    identificationType: '',
    identificationNumber: '',
    email: '',
    age: '',
    phoneNumber: ''
  })

  const handleChange = (name: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar los datos al servidor
    console.log(formData)
    toast({
      title: "Cliente creado",
      description: "El cliente ha sido creado exitosamente.",
    })
    // Redirigir a la lista de clientes después de crear
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
      <form onSubmit={handleSubmit} className="space-y-6 bg-card shadow-lg rounded-lg p-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="identificationType">Tipo de Identificación</Label>
          <Select
            value={formData.identificationType}
            onValueChange={(value) => handleChange('identificationType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccione..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DNI">DNI</SelectItem>
              <SelectItem value="Pasaporte">Pasaporte</SelectItem>
              <SelectItem value="Cédula">Cédula</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="identificationNumber">Número de Identificación</Label>
          <Input
            id="identificationNumber"
            name="identificationNumber"
            value={formData.identificationNumber}
            onChange={(e) => handleChange('identificationNumber', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="age">Edad</Label>
          <Input
            id="age"
            name="age"
            type="number"
            value={formData.age}
            onChange={(e) => handleChange('age', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Número de Teléfono</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            required
          />
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button type="submit" className="w-full">
            Crear Cliente
          </Button>
        </motion.div>
      </form>
    </motion.div>
  )
}