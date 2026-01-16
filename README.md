# Poke Battle Simulator

Aplicación web para la gestión y combate de equipos Pokémon.

## Tecnologías Utilizadas

- React 18
- Material-UI 5
- TanStack Query (React Query)
- Zustand
- React Router DOM
- @hello-pangea/dnd (fork mantenido de React Beautiful DnD)

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

### Simulador de Batalla
- Selección de dos equipos para combate
- Sistema de combate automático por turnos
- Combates 1 vs 1 por posición en el equipo
- Lógica de combate basada en estadísticas:
  - El Pokémon con mayor velocidad ataca primero
  - Si el ataque supera la defensa del oponente, este queda debilitado
  - Si no supera la defensa, el oponente contraataca
  - Si ninguno supera la defensa del otro, gana el más rápido
- El ganador de cada combate continúa contra el siguiente Pokémon rival
- Resultados detallados:
  - Ganador de cada ronda con explicación
  - Estadísticas globales de cada equipo
  - Pokémon con vida y debilitados
- Historial completo de combates con estadísticas

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
- `/battle`: Simulador de Batalla

## Testing

El proyecto incluye una cobertura completa de tests unitarios para el simulador de batalla, asegurando la calidad y funcionamiento correcto de toda la funcionalidad.

### Tests Implementados

#### Tests de Lógica Funcional (12 tests)
**Archivo**: `src/features/battle-simulator/utils/battleLogic.test.js`

Tests para la lógica de combate:
- ✅ Verificación de que el Pokémon más rápido ataca primero
- ✅ Validación de victoria por superación de ataque vs defensa
- ✅ Caso especial: victoria por velocidad cuando ninguno supera la defensa
- ✅ Correcto retorno de estadísticas de ambos Pokémon
- ✅ Manejo de velocidades iguales

Tests para batallas completas:
- ✅ Simulación de batalla completa entre equipos
- ✅ Estructura correcta de rondas con toda la información
- ✅ Determinación correcta del equipo ganador
- ✅ Cálculo preciso de estadísticas (vivos/debilitados)
- ✅ El ganador continúa contra el siguiente Pokémon
- ✅ Finalización correcta cuando un equipo se queda sin Pokémon
- ✅ Manejo de equipos con un solo Pokémon

#### Tests de Interfaz de Usuario (17 tests)

**TeamSelector** (`src/features/battle-simulator/components/TeamSelector.test.js`):
- ✅ Renderizado correcto del componente
- ✅ Visualización del título y descripción
- ✅ Botón de batalla presente y funcional
- ✅ Estado inicial correcto (botón deshabilitado)

**BattleResults** (`src/features/battle-simulator/components/BattleResults.test.js`):
- ✅ Visualización del resultado global con equipo ganador
- ✅ Alternancia correcta del ganador (equipo 1 o 2)
- ✅ Estadísticas de ambos equipos mostradas correctamente
- ✅ Historial de combates con número correcto de rondas
- ✅ Detalles de cada ronda con nombres de Pokémon
- ✅ Estadísticas de Pokémon en cada ronda
- ✅ Razones del resultado de cada combate
- ✅ Botón "Nueva Batalla" presente y funcional
- ✅ Callback onReset ejecutado correctamente
- ✅ Indicadores visuales del ganador (trofeos)
- ✅ Visualización correcta del VS entre Pokémon
- ✅ Manejo de batalla con una sola ronda
- ✅ Renderizado de imágenes de Pokémon

### Ejecución de Tests

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests del simulador de batalla
npm test -- --testPathPattern=battle-simulator

# Ejecutar tests con cobertura
npm test -- --coverage

# Ejecutar tests en modo watch
npm test -- --watch
```

### Resultado de Tests

```
Test Suites: 3 passed, 3 total
Tests:       29 passed, 29 total
Snapshots:   0 total
```

## Desarrollo

### Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo
- `npm test`: Ejecuta los tests
- `npm run build`: Genera la versión de producción

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
