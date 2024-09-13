import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo o Nombre del sitio */}
          <Link href="/" className="text-3xl font-extrabold text-gray-800 hover:text-gray-600 transition duration-300">
            ClientManager
          </Link>

          {/* Navegación del menú */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-800 transition duration-300">
              Inicio
            </Link>
            <Link href="/clients" className="text-gray-600 hover:text-gray-800 transition duration-300">
              Clientes
            </Link>
            <Link href="/clients/create" className="text-gray-600 hover:text-gray-800 transition duration-300">
              Crear Cliente
            </Link>
          </div>

          {/* Menú desplegable para móvil */}
          <div className="md:hidden">
            <button aria-label="Open Menu" className="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile navigation (hidden by default) */}
        <div className="md:hidden mt-4">
          <Link href="/" className="block py-2 text-gray-600 hover:text-gray-800">
            Inicio
          </Link>
          <Link href="/clients" className="block py-2 text-gray-600 hover:text-gray-800">
            Clientes
          </Link>
          <Link href="/clients/create" className="block py-2 text-gray-600 hover:text-gray-800">
            Crear Cliente
          </Link>
        </div>
      </nav>
    </header>
  )
}
