# Guia breve para editar `translations.ts`

El archivo `src/app/translations.ts` contiene los textos, enlaces y archivos que cambian segun el idioma (`es`, `en` y `pt`).

## Cambiar un link

Busca el bloque del idioma y la experiencia que quieres modificar. Los campos mas comunes son:

```ts
youtubeLink: "https://youtu.be/...",
downloadLink: "/nombre-del-archivo.mp4",
pageLink: "https://..."
```

- `youtubeLink`: video que se abre en la experiencia 360.
- `downloadLink`: archivo que descarga el usuario.
- `pageLink`: pagina externa del filtro.

Repite el cambio en `es`, `en` y `pt` si el enlace debe ser igual para todos los idiomas.

## Cambiar un archivo descargable

1. Coloca el nuevo archivo dentro de la carpeta `public`.
2. En `downloadLink`, escribe `/` seguido del nombre exacto del archivo.

Ejemplo: para `public/video-ximena.mp4`, usa:

```ts
downloadLink: "/video-ximena.mp4"
```

Respeta mayusculas, minusculas y la extension del archivo.

## Cambiar textos o idioma

Edita solamente el bloque correspondiente:

```ts
es: { ... } // Espanol
en: { ... } // Ingles
pt: { ... } // Portugues
```

Mantener las mismas propiedades en los tres bloques evita errores. Por ejemplo, si cambias `contentSelector.ximena.title` en espanol, revisa tambien su traduccion en ingles y portugues.

## Cambiar imagen QR o bandera

Las imagenes se importan al comienzo de `translations.ts` desde `src/imports`. Reemplaza el archivo conservando el nombre o actualiza la ruta del `import`.

Antes de entregar el cambio, abre la pagina y prueba el idioma, el link y la descarga modificados.
