# OptimuxSolutions Website

Sitio web corporativo para OptimuxSolutions, una empresa de servicios IT.

**Dominio:** optimuxsolutions.com
**Slogan:** "Optimize today, perform tomorrow"

## Tecnologías

- **Astro 4** - Framework para sitios estáticos
- **Tailwind CSS 4** - Framework de estilos
- **Lucide Icons** - Iconos SVG
- **Strapi** (opcional) - Headless CMS para gestión de contenido

## Estructura del Proyecto

```
/
├── public/
│   ├── logo.svg
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── ServiceCard.astro
│   │   └── ContactCTA.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── lib/
│   │   └── strapi.ts
│   ├── pages/
│   │   ├── index.astro
│   │   └── servicios.astro
│   └── styles/
│       └── global.css
├── .env.example
└── package.json
```

## Instalación

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env
```

## Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:4321`

## Build de Producción

```bash
# Generar sitio estático
npm run build

# Previsualizar build
npm run preview
```

Los archivos estáticos se generan en la carpeta `./dist/`

## Conexión con Strapi (Opcional)

El sitio funciona sin Strapi usando datos hardcodeados. Para conectar con Strapi:

1. Configura la variable `STRAPI_URL` en tu archivo `.env`:
   ```
   STRAPI_URL=http://localhost:1337
   ```

2. En Strapi, crea una colección llamada `servicios` con los siguientes campos:
   - `titulo` (Text)
   - `descripcion` (Text - Long)
   - `icono` (Text) - nombre del icono de Lucide (Server, Camera, DoorOpen, Wrench)
   - `caracteristicas` (JSON) - array de strings
   - `destacado` (Boolean)
   - `orden` (Number)

3. Publica los servicios y asegúrate de que la API sea pública

## Páginas

- **/** - Página de inicio con hero, servicios destacados y CTA
- **/servicios** - Lista completa de servicios con detalles

## Personalización

### Colores de marca

Los colores se definen en `src/styles/global.css`:

```css
@theme {
  --color-primary: #2563EB;      /* Azul principal */
  --color-primary-light: #3B82F6; /* Azul claro */
  --color-primary-dark: #1D4ED8;  /* Azul hover */
  --color-text-dark: #1F2937;     /* Gris oscuro */
  --color-text-gray: #4B5563;     /* Gris texto */
}
```

### Agregar nuevos servicios

Edita el array `serviciosFallback` en `src/lib/strapi.ts` o agrégalos directamente en Strapi.

## Comandos

| Comando | Acción |
|---------|--------|
| `npm install` | Instala dependencias |
| `npm run dev` | Inicia servidor en localhost:4321 |
| `npm run build` | Genera sitio estático en ./dist/ |
| `npm run preview` | Previsualiza el build |

## Licencia

Todos los derechos reservados - OptimuxSolutions
