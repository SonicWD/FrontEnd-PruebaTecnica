# Gestión de Clientes - Frontend - Prueba Tecnica

## Descripción

Este es el frontend para la aplicación de Gestión de Clientes. Proporciona una interfaz de usuario intuitiva para interactuar con la API de gestión de clientes.

Proyecto desplegado en https://front-end-prueba-tecnica.vercel.app
Si no funciona los botones es porque el servidor del Back estaba sin uso y se demora en volverse acticar luego de la primera petición

## Tecnologías Utilizadas

- Next.js
- React
- Tailwind CSS
- Zustand para gestión de estado global
- React Hook Form y Yup para validación de formularios
- Animaciones con Tailwind CSS

## Estructura del Proyecto

## Estructura del Proyecto

La estructura de carpetas de tu proyecto se vería así:

```plaintext
├── src/              # Carpeta principal de la aplicación
├── components/       # Componentes reutilizables
├── lib/              # Librerías y utilidades compartidas
├── store/            # Gestión de estado global
├── utils/            # Funciones de utilidad
├── package.json      # Archivo de configuración de npm
└── README.md         # Archivo de documentación
```


## Configuración y Ejecución

### Requisitos Previos

- Node.js 

### Pasos para Ejecutar

1. Clonar el repositorio:
    ```plaintext
    git clone https://github.com/SonicWD/FrontEnd-PruebaTecnica
    cd FrontEnd-PruebaTecnica

    # recuerde estar en la rama dev
    git checkout dev
    ```


2. Instalar dependencias:
    ```plaintext
    npm install
    # o si usa yarn
    yarn install
    ```


4. Iniciar el servidor de desarrollo:
    ```plaintext
    npm run dev
    # o si usa yarn
    yarn dev
    ```

El frontend estará ejecutándose en `http://localhost:3000`.

## Características

- Interfaz de usuario responsiva y moderna
- Formularios con validaciónes con Ract Hook
- Gestión de estado global para una experiencia de usuario fluida
- Animaciones suaves para mejorar la interactividad



## Despliegue

El frontend está configurado para ser desplegado en Vercel. La rama de producción se despliega automáticamente.

## Desarrollo

Durante el desarrollo, asegúrese de que el backend esté en ejecución para que el frontend pueda comunicarse con la API.