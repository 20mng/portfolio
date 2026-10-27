# Portfolio de Francisco Jesús Mengíbar

Web personal hecha con Angular 20 (componentes standalone, signals y sin zone.js).

## Arrancar en local

Necesitas Node.js 20.19 o superior (recomendado 22 LTS).

```bash
npm install
npm start
```

Abre http://localhost:4200. Los cambios se recargan solos.

## Cambiar el contenido

Todos los textos están en `src/app/data/profile.data.ts`: presentación, experiencia, tecnologías, formación y contacto. Para añadir un trabajo, copia un bloque del array `EXPERIENCE` y cámbialo. No hace falta tocar los componentes.

- Para quitar el aviso "Disponible para nuevas oportunidades", pon `availability: null`.
- Los colores están como variables al principio de `src/styles.scss`.

## Estructura

```
src/app/
  data/            contenido (profile.data.ts) y tipos (profile.model.ts)
  core/            servicio de tema claro/oscuro
  components/
    site-header/   cabecera con navegación y cambio de tema
    hero/          portada con la pila de tecnologías
    page-section/  contenedor reutilizable de cada sección
    experience/    línea temporal de trabajos
    tech-stack/    tecnologías agrupadas
    education/     formación y certificaciones
    contact/       contacto
```

## Compilar para publicar

```bash
npm run build
```

El resultado queda en `dist/portfolio/browser`.
