VETRA — SITIO WEB DE CAMPAÑA
================================

CONTENIDO
- index.html       Portada
- conocenos.html   Integrantes y presentación
- propuestas.html  Plan de trabajo con filtros y paneles desplegables
- comunidad.html   Actividades y vida universitaria
- participa.html   Formulario de ideas
- styles.css       Estilos responsive para todas las páginas
- script.js        Menú móvil, filtros, acordeones y formulario

VISTA PREVIA
Abre index.html en tu navegador. Para publicar, puedes subir todos los archivos
manteniendo esta estructura a un repositorio GitHub y activar GitHub Pages.

PERSONALIZACIONES PENDIENTES
1. LOGO:
   Crea la carpeta assets (ya incluida) y guarda el logo como:
   assets/logo-vetra.png
   En esta primera versión se usa el nombre VETRA como marca tipográfica.
   Cuando tengas el logo, reemplazaremos ese texto por una imagen en el encabezado
   y pie de página.

2. FOTOGRAFÍAS:
   Sustituye los bloques "FOTO" / "Una foto de VETRA" por imágenes reales del equipo.
   Recomendación: imágenes horizontales o cuadradas, JPG o WebP, optimizadas para web.

3. INTEGRANTES:
   En conocenos.html reemplaza "Nombre Apellido", "CARGO / REPRESENTACIÓN" y los
   textos de ejemplo por la nómina real. Duplica o elimina tarjetas según el equipo.

4. INSTAGRAM:
   En script.js busca:
   const instagramUrl = "";
   y pega el enlace oficial entre las comillas.

5. FORMULARIO:
   En script.js busca:
   const contactEmail = "";
   y agrega el correo que recibirá las ideas. El formulario usa mailto y abre la
   aplicación de correo del visitante; no guarda respuestas en una base de datos.
   Si quieren almacenar respuestas en línea, se debe conectar un servicio externo.

6. CONTENIDO:
   Revisa las propuestas y la terminología institucional antes de publicar.
   La web indica que las iniciativas dependen de factibilidad y coordinación.

DISEÑO
Paleta: turquesa #087F83, marfil #F3EEDF, verde oscuro #263B3B y blanco.
Diseño adaptable a celular, tablet y computador.
