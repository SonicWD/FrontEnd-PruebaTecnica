'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useClientStore } from '@/store/clientStore';

// Datos de ejemplo
const initialClients = [
  { id: '1', name: 'Juan Pérez', identificationNumber: '12345678', email: 'juan@example.com' },
  { id: '2', name: 'María García', identificationNumber: '87654321', email: 'maria@example.com' },
  { id: '3', name: 'Carlos Rodríguez', identificationNumber: '23456789', email: 'carlos@example.com' },
  { id: '4', name: 'Ana Martínez', identificationNumber: '98765432', email: 'ana@example.com' },
  { id: '5', name: 'Luis Sánchez', identificationNumber: '34567890', email: 'luis@example.com' },
];

export default function ClientList() {
  const [searchTerm, setSearchTerm] = useState('');
  const { clients, setClients } = useClientStore();

  useEffect(() => {
    // Inicializa los datos de clientes en el store
    setClients(initialClients);
  }, [setClients]);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.identificationNumber.includes(searchTerm) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-6 py-8"
    >
      <div className="flex justify-between items-center mb-6">
        <motion.h1
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="text-4xl font-bold text-primary"
        >
          Lista de Clientes
        </motion.h1>
        <Link href="/clients/create" passHref>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" /> Agregar Cliente
          </Button>
        </Link>
      </div>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <div className="bg-card rounded-lg shadow-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Identificación</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client, index) => (
              <motion.tr
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.identificationNumber}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/clients/${client.id}/edit`} passHref>
                    <Button variant="outline" size="sm" className="mr-2">
                      Editar
                    </Button>
                  </Link>
                  <Button variant="destructive" size="sm">
                    Eliminar
                  </Button>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  )
}
