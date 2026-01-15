# Pokémon Battle Simulator

Aplicación web de gestión y combate de equipos Pokémon, consumiendo datos desde la API pública [PokeAPI](https://pokeapi.co/).

## Tecnologías Utilizadas

- React 18
- TanStack Query (React Query) para gestión de datos externos
- Zustand para estado global
- Material-UI para componentes de interfaz
- React Testing Library / Jest para pruebas unitarias

## Requisitos Previos

- Node.js (v18 o superior recomendado)
- npm (v10 o superior)

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/JoseFerSerradilla/poke-battle-sim.git
cd poke-battle-sim
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm start
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## Estructura del Proyecto

```
src/
├── features/           # Características principales de la aplicación
│   ├── pokemon-list/   # Listado de Pokémon
│   ├── pokemon-detail/ # Detalles de Pokémon individual
│   ├── team-builder/   # Constructor de equipos
│   └── battle-simulator/ # Simulador de batallas
│
├── shared/            # Recursos compartidos
│   ├── components/    # Componentes reutilizables
│   ├── hooks/        # Custom hooks
│   ├── services/     # Servicios (API, etc.)
│   └── store/        # Estado global (Zustand)
│
└── config/           # Configuraciones globales
```

## Arquitectura

El proyecto sigue una arquitectura feature-based (basada en características), donde cada funcionalidad principal está encapsulada en su propio directorio dentro de la carpeta `features`. Esto permite:

- Mejor organización del código
- Mayor modularidad
- Facilidad de mantenimiento
- Separación clara de responsabilidades

Los recursos compartidos entre features se encuentran en el directorio `shared`, promoviendo la reutilización de código y manteniendo un estándar consistente en toda la aplicación.

## Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo
- `npm test`: Ejecuta las pruebas unitarias
- `npm run build`: Genera la versión de producción
