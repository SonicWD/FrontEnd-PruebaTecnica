'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import config from '@/utils/config';
import { Client } from '@/store/clientStore'; // Asegúrate de que Client coincida con el formato de la API

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useClientStore } from '@/store/clientStore';

// Fetch client list from API
async function fetchClients(): Promise<Client[]> {
  const response = await fetch(`${config.API_URL}/list_clients`);
  if (!response.ok) {
    throw new Error('Failed to fetch clients');
  }
  const data = await response.json();
  return data;
}

// Delete client by ID
async function deleteClient(clientId: number): Promise<void> {
  const response = await fetch(`${config.API_URL}/delete_client/${clientId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete client');
  }
}

export default function ClientList() {
  const [searchTerm, setSearchTerm] = useState('');
  const { clients, setClients } = useClientStore();

  // Fetch clients from API on component mount
  useEffect(() => {
    fetchClients()
      .then(data => {
        setClients(data);
      })
      .catch(error => console.error('Error fetching clients:', error));
  }, [setClients]);

  // Filter clients based on search term
  const filteredClients = clients.filter(client =>
    client.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.numero_identificacion.includes(searchTerm) ||
    client.correo.toLowerCase().includes(searchTerm.toLowerCase())
  );


  // Handle client deletion
  const handleDeleteClient = async (clientId: number) => {
    try {
      await deleteClient(clientId);
      setClients(clients.filter(client => client.id !== clientId));
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

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
                <TableCell className="font-medium">{client.nombre}</TableCell>
                <TableCell>{client.numero_identificacion}</TableCell>
                <TableCell>{client.correo}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/clients/${client.id}/edit`} passHref>
                    <Button variant="outline" size="sm" className="bg-black text-white border border-white font-bold py-3 px-6 rounded-md transition-colors duration-300 ease-in-out hover:bg-white hover:text-black hover:border-black focus:outline-none focus:ring-2 focus:ring-white">
                      Editar
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteClient(client.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
