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
  data/            contenido (profile.data.ts), tipos y logos de tecnologías
  core/            tema claro/oscuro, apariciones al hacer scroll y utilidades
  components/
    backdrop/        fondo de curvas de nivel, foco de luz y barra de progreso
    sidebar/         columna fija de la izquierda (identidad, navegación, acciones)
    section-block/   cabecera numerada de cada sección
    about/           sobre mí y cifras
    experience/      experiencia
    projects/        proyectos y su detalle
    stack/           tecnologías por áreas
    education/       formación y certificaciones
    contact/         contacto y pie
```

## Foto y CV

- Foto: guarda la imagen en `public/` (por ejemplo `public/foto.jpg`) y pon `photo: 'foto.jpg'` en `profile.data.ts`.
- CV: guarda el PDF en `public/` (por ejemplo `public/cv.pdf`) y pon `cv: 'cv.pdf'`. Aparecerá el botón "Descargar CV".

## Compilar para publicar

```bash
npm run build
```

El resultado queda en `dist/portfolio/browser`.
