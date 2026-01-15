# Poke Battle Simulator

Aplicación web para la gestión y combate de equipos Pokémon.

## Tecnologías Utilizadas

- React 18
- Material-UI 7
- TanStack Query (React Query)
- Zustand
- React Router DOM
- React Beautiful DnD
- ESLint

## Estructura del Proyecto

```
src/
├── config/              # Configuraciones globales
│   ├── queryClient.js   # Configuración de TanStack Query
│   └── theme.js        # Tema de Material-UI
├── features/           # Módulos de funcionalidad
│   ├── battle-simulator/
│   ├── pokemon-list/
│   └── team-builder/
├── shared/            # Componentes y utilidades compartidas
│   ├── layout/       # Componentes de layout
│   ├── services/     # Servicios (API, etc.)
│   └── store/        # Estado global con Zustand
```

## Características

### Lista de Pokémon
- Visualización de Pokémon de la primera generación
- Búsqueda por nombre
- Filtrado por tipos
- Visualización de estadísticas básicas
- Integración con el constructor de equipos

### Constructor de Equipos
- Gestión de múltiples equipos
- Límite de 6 Pokémon por equipo
- Reordenamiento mediante drag & drop
- Ordenamiento aleatorio y por ataque
- Sistema de borradores automáticos
- Guardado y restauración de borradores

### Simulador de Batalla (Próximamente)
- Combates entre equipos
- Sistema de turnos
- Cálculo de daño
- Historial de combates

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

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Arquitectura

El proyecto sigue una arquitectura feature-based, donde cada funcionalidad principal está encapsulada en su propio módulo dentro del directorio `features/`. Esto facilita:

- Separación clara de responsabilidades
- Código más mantenible y escalable
- Reutilización de componentes
- Testing más sencillo

### Gestión de Estado

- **Zustand**: Estado global para la gestión de equipos y temas
- **TanStack Query**: Gestión de datos de la API y caché
- **Estado Local**: Para UI y lógica específica de componentes

### Navegación

La aplicación utiliza React Router DOM para la navegación entre las diferentes secciones:

- `/`: Lista de Pokémon
- `/teams`: Constructor de Equipos
- `/battle`: Simulador de Batalla (Próximamente)

## Desarrollo

### Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo
- `npm test`: Ejecuta los tests
- `npm run build`: Genera la versión de producción
- `npm run lint`: Ejecuta ESLint para verificar el código

### Convenciones de Código

El proyecto utiliza ESLint con una configuración personalizada que incluye:

- Reglas para React y hooks
- Ordenamiento de importaciones
- Formateo consistente
- Buenas prácticas de JavaScript/React

## API

La aplicación consume datos de [PokeAPI](https://pokeapi.co/), utilizando los siguientes endpoints:

- `/pokemon`: Lista de Pokémon
- `/pokemon/{id}`: Detalles de un Pokémon específico
- `/type`: Tipos de Pokémon

## Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'feat: add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request
