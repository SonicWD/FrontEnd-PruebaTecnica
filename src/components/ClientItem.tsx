import Link from 'next/link'

interface ClientItemProps {
  id: string
  name: string
  identificationNumber: string
  email: string
}

export default function ClientItem({ id, name, identificationNumber, email }: ClientItemProps) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">{name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{identificationNumber}</td>
      <td className="px-6 py-4 whitespace-nowrap">{email}</td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Link href={`/clients/${id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
          Ver
        </Link>
        <Link href={`/clients/edit/${id}`} className="text-yellow-600 hover:text-yellow-900 mr-4">
          Editar
        </Link>
        <button className="text-red-600 hover:text-red-900">Eliminar</button>
      </td>
    </tr>
  )
}