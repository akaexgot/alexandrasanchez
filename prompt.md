# PROMPT MAESTRO PARA ASTRA
## Proyecto: Alexandra Sánchez — Micropigmentación y estética de la mirada

### 1. Tu rol y objetivo

Actúa como un equipo senior de desarrollo web formado por un arquitecto de software, un desarrollador experto en Astro, un diseñador UI/UX especializado en marcas premium, un especialista en Supabase, un ingeniero DevOps y un especialista en SEO, accesibilidad y seguridad.

Tu misión es **desarrollar una web completa, profesional y lista para producción para Alexandra Sánchez**, incluyendo tanto la web pública como un panel de administración privado, diseñado y programado específicamente para este negocio.

No quiero únicamente diseños, maquetas, pseudocódigo o recomendaciones. Quiero código real, funcional, organizado, probado y documentado.

El resultado debe ser:

1. Una web pública elegante, rápida y responsive.
2. Un panel de administración propio, profesional y extremadamente fácil de usar.
3. Una integración segura con Supabase Cloud.
4. Un proyecto mantenible alojado en GitHub.
5. Una configuración funcional para desplegar en Coolify mediante Nixpacks.
6. Un sistema que permita actualizar contenidos sin volver a desplegar la aplicación.

**Repositorio GitHub:**

https://github.com/akaexgot/alexandrasanchez

Inspecciona el repositorio antes de comenzar. Comprueba su estado, archivos, ramas y dependencias. No sobrescribas trabajo existente sin analizarlo.

Trabaja inicialmente en una rama de desarrollo y utiliza commits descriptivos.

No supongas que tienes acceso a credenciales, cuentas externas o infraestructura. Si necesitas permisos, solicita exclusivamente los necesarios.

---

# 2. Stack tecnológico obligatorio

Utiliza las siguientes tecnologías.

| Capa | Tecnología |
|---|---|
| Framework | Astro |
| Estilos | Tailwind CSS |
| Lenguaje | TypeScript estricto |
| Base de datos | Supabase Cloud PostgreSQL |
| Autenticación | Supabase Auth |
| Almacenamiento | Supabase Storage |
| Backend | Astro Server Endpoints y server actions cuando convenga |
| Repositorio | GitHub |
| Despliegue | Coolify |
| Build | Nixpacks |
| Runtime | Node.js LTS compatible |
| Hosting | Servidor existente con Coolify |

Utiliza versiones estables, compatibles y mantenidas en el momento de implementación.

No utilices Directus, WordPress, Strapi, Payload, Sanity ni ningún otro CMS.

**El panel de administración debe desarrollarse mediante código propio con Astro, TypeScript, Tailwind CSS y Supabase.**

Evita incorporar frameworks adicionales innecesarios. Utiliza componentes Astro y JavaScript ligero siempre que sea posible.

Puedes emplear librerías pequeñas, accesibles y mantenidas para formularios, validaciones, iconos y comparadores de imágenes, cuando aporten una ventaja clara.

---

# 3. Arquitectura técnica

Quiero una sola aplicación Astro que incluya:

- Web pública.
- Panel de administración.
- Endpoints seguros.
- Integración con Supabase.
- Gestión de archivos.
- Autenticación.
- Renderizado dinámico.

Utiliza Astro con el adaptador oficial de Node.js y renderizado bajo demanda para las páginas que consuman contenido editable.

No conviertas innecesariamente toda la aplicación en una SPA.

La arquitectura debe priorizar:

- HTML renderizado en servidor.
- Excelente SEO.
- Bajo consumo de JavaScript.
- Separación clara entre lógica pública y administrativa.
- Código reutilizable.
- Actualización inmediata o casi inmediata del contenido publicado.
- Seguridad por defecto.

### Diagrama lógico

```text
Visitante
   |
   v
Astro + Tailwind
   |
   +-- Web pública
   |      |
   |      +-- Contenido publicado
   |      +-- Tratamientos
   |      +-- Galería
   |      +-- Opiniones
   |      +-- Preguntas frecuentes
   |
   +-- /admin
          |
          +-- Login
          +-- Dashboard
          +-- Tratamientos
          +-- Resultados
          +-- Opiniones
          +-- FAQ
          +-- Inicio
          +-- Datos del negocio
          |
          v
     Supabase Auth
          |
          v
     Supabase PostgreSQL
          |
          v
     Supabase Storage

GitHub
   |
   v
Coolify + Nixpacks
   |
   v
Astro Node Server
```

La base de datos, Auth y Storage estarán alojados en **Supabase Cloud**, no en Coolify.

Coolify únicamente alojará la aplicación Astro y los servicios auxiliares que sean estrictamente necesarios.

No instalar PostgreSQL, Directus ni una segunda base de datos en Coolify.

---

# 4. Información del negocio

**Nombre comercial:** Alexandra Sánchez.

**Actividad:** Micropigmentación y estética de la mirada.

**Objetivo:** Mostrar profesionalidad, dedicación, tratamientos y resultados, facilitando la captación de nuevas clientas.

**Idioma:** Español.

**Teléfono:** 626836018.

**WhatsApp:** https://wa.me/34626836018

**Instagram:** @micro.alexandrasanchez

**Instagram URL:** https://www.instagram.com/micro.alexandrasanchez/

**Facebook:** Micro Alexandra Sanchez.

Verifica la URL exacta de Facebook antes de incorporarla.

La dirección física, los horarios y el dominio definitivo todavía deben confirmarse.

No inventes estos datos.

### Requisitos confirmados

- Web informativa.
- Sin tienda online.
- Sin reservas online.
- Sin blog ni noticias.
- Sin precios visibles.
- Contacto mediante WhatsApp y teléfono.
- Galería de antes y después.
- Fotografías organizadas por tratamientos.
- Opiniones reales.
- Preguntas frecuentes.
- Vídeos opcionales.
- Integración con Instagram.
- Panel para subir fotografías y administrar contenidos básicos.

La propietaria dispone de logotipo y colores corporativos, pero todavía no se han proporcionado los archivos.

Propón una identidad visual provisional fácilmente reemplazable.

---

# 5. Diseño y experiencia visual

Diseña una web de estética premium, elegante, moderna y profesional.

Debe transmitir:

- Confianza.
- Profesionalidad.
- Cuidado por los detalles.
- Belleza natural.
- Atención personalizada.
- Calidad.
- Cercanía.

### Propuesta visual inicial

Utiliza provisionalmente:

- Fondo marfil o blanco cálido.
- Tonos beige y arena.
- Tonos topo.
- Acentos oscuros.
- Tipografía editorial elegante para titulares.
- Tipografía sans-serif legible para párrafos.
- Fotografías grandes.
- Mucho espacio en blanco.
- Bordes y sombras discretos.

Centraliza todos los colores y fuentes mediante tokens.

Cuando se entregue la identidad corporativa real, deberá ser sencillo sustituir la propuesta provisional.

### Diseño responsive

Implementa diseños específicos para:

- Móvil.
- Tablet.
- Portátil.
- Escritorio.

No te limites a reducir el diseño de escritorio.

En móvil prioriza:

- Lectura cómoda.
- Menú intuitivo.
- Botones grandes.
- Fotografías bien adaptadas.
- WhatsApp accesible.
- Excelente velocidad de carga.

### Animaciones

Utiliza animaciones elegantes y discretas:

- Apariciones suaves.
- Transiciones entre estados.
- Hover en tarjetas.
- Microinteracciones.
- Cambios de estado de botones.

Evita animaciones excesivas y efectos que reduzcan el rendimiento.

Respeta `prefers-reduced-motion`.

---

# 6. Estructura de la web pública

Implementa estas rutas:

```text
/
/sobre-mi
/tratamientos
/tratamientos/[slug]
/resultados
/opiniones
/preguntas-frecuentes
/contacto
/aviso-legal
/politica-de-privacidad
/politica-de-cookies
```

También incluye:

- Página 404.
- Sitemap.
- Robots.txt.
- Metadatos SEO.
- Navegación semántica.
- Footer global.

## 6.1 Inicio

La página principal debe ser la más cuidada del proyecto.

Estructura:

1. Hero principal.
2. Presentación de Alexandra.
3. Tratamientos destacados.
4. Filosofía de trabajo.
5. Resultados destacados.
6. Opiniones reales.
7. Preguntas frecuentes destacadas.
8. Instagram.
9. CTA final de WhatsApp.
10. Footer.

El hero debe incluir:

- Titular atractivo.
- Subtítulo.
- Fotografía principal.
- CTA de contacto.
- CTA secundario hacia tratamientos.

Los textos deben ser profesionales y naturales.

No inventes trayectoria, titulaciones ni premios.

## 6.2 Sobre mí

Diseña una página para presentar a Alexandra.

Debe incluir:

- Fotografía profesional.
- Biografía.
- Filosofía.
- Forma de trabajar.
- Atención personalizada.
- Formación y experiencia cuando se proporcionen.

No inventes datos personales o profesionales.

## 6.3 Tratamientos

Organiza los tratamientos por categorías.

### Micropigmentación

- Cejas.
- Labios.
- Ojos / eyeliner.
- Retoques.

### Estética de la mirada

- Extensiones pelo a pelo.
- Extensiones 5D.
- Lifting de pestañas.
- Depilación con hilo.

Cada tratamiento debe tener su propia página dinámica mediante slug.

Campos previstos:

- Nombre.
- Categoría.
- Slug.
- Resumen.
- Descripción completa.
- Imagen principal.
- Imágenes adicionales.
- Duración de sesión.
- Duración estimada de resultados.
- Cuidados previos.
- Cuidados posteriores.
- Información sobre retoques.
- Preguntas frecuentes relacionadas.
- Estado de publicación.
- Orden.
- SEO.

No mostrar precios.

No inventes duraciones, contraindicaciones ni recomendaciones clínicas. Utiliza campos pendientes de revisión cuando falte información.

## 6.4 Galería de resultados

Implementa una galería profesional de antes y después.

Requisitos:

- Filtros por tratamiento.
- Comparador antes/después.
- Control deslizante.
- Soporte táctil.
- Soporte de teclado.
- Fotografías optimizadas.
- Visualización ampliada.
- Lazy loading.
- Diseño responsive.
- Posibilidad de destacar resultados.

Los filtros deben funcionar sin recargar toda la página cuando sea viable.

No inventes resultados ni utilices imágenes de stock simulando trabajos reales.

## 6.5 Opiniones

Mostrar testimonios reales autorizados.

Cada opinión puede contener:

- Nombre público.
- Texto.
- Tratamiento.
- Fecha.
- Estado publicado/borrador.

No generar testimonios ficticios.

## 6.6 Preguntas frecuentes

Crear un sistema de acordeones accesibles.

Permitir preguntas generales y preguntas asociadas a tratamientos.

## 6.7 Contacto

Incluir:

- Teléfono clicable.
- Botón de WhatsApp.
- Instagram.
- Facebook.
- Dirección cuando se confirme.
- Horarios cuando se confirmen.

No implementar reservas online.

No añadir un formulario de contacto sin necesidad.

---

# 7. PANEL DE ADMINISTRACIÓN PERSONALIZADO

## Prioridad máxima

Desarrolla un panel de administración propio, elegante, sencillo y funcional.

No quiero un CMS genérico.

No quiero una interfaz llena de tablas técnicas, configuraciones innecesarias o herramientas que Alexandra no utilizará.

El panel debe parecer una aplicación diseñada exclusivamente para gestionar su negocio.

### URL

```text
/admin
/admin/login
/admin/tratamientos
/admin/resultados
/admin/opiniones
/admin/preguntas-frecuentes
/admin/inicio
/admin/negocio
```

Todas las rutas privadas deben protegerse en el servidor.

No basta con ocultarlas mediante JavaScript.

## 7.1 Diseño del panel

Quiero:

- Sidebar en escritorio.
- Navegación móvil.
- Diseño limpio.
- Tarjetas visuales.
- Iconos claros.
- Formularios cómodos.
- Botones con etiquetas comprensibles.
- Confirmaciones antes de eliminar.
- Mensajes de éxito y error.
- Estados de carga.
- Vistas previas.
- Diseño responsive.

### Dashboard

La pantalla principal debe mostrar:

**Bienvenida, Alexandra**

Y seis accesos:

1. Tratamientos.
2. Galería de resultados.
3. Opiniones.
4. Preguntas frecuentes.
5. Página de inicio.
6. Mi negocio.

Puedes añadir contadores sencillos como número de tratamientos publicados y fotografías publicadas.

No añadir gráficos analíticos innecesarios.

---

# 8. FUNCIONES DEL PANEL

## 8.1 Tratamientos

Permitir:

- Ver tratamientos.
- Crear tratamientos.
- Editar tratamientos.
- Cambiar fotografías.
- Modificar descripciones.
- Asociar categorías.
- Publicar u ocultar.
- Ordenar.
- Archivar o eliminar con confirmación.

El slug debe generarse automáticamente, permitiendo editarlo cuando corresponda.

Validar unicidad.

## 8.2 Galería de resultados

Esta es una de las funcionalidades más importantes.

Quiero un formulario muy sencillo:

**Nuevo resultado**

Campos:

- Tratamiento.
- Fotografía antes.
- Fotografía después.
- Descripción opcional.
- Resultado destacado.
- Confirmación de autorización de publicación.
- Estado.

Botones:

- Guardar borrador.
- Publicar.
- Cancelar.

Mostrar vista previa de ambas fotografías.

Permitir sustituirlas sin recrear el resultado.

Validar:

- Tipo MIME real.
- Extensión.
- Tamaño.
- Dimensiones cuando corresponda.
- Campos obligatorios.

No permitir publicar resultados sin confirmar que existe autorización válida.

El campo de autorización es una medida de control editorial, no un sistema completo de gestión jurídica del consentimiento.

No guardar documentos de consentimiento en buckets públicos.

## 8.3 Opiniones

Permitir:

- Crear.
- Editar.
- Publicar.
- Ocultar.
- Eliminar.

## 8.4 Preguntas frecuentes

Permitir:

- Añadir pregunta.
- Editar respuesta.
- Asociar tratamiento.
- Ordenar.
- Publicar.
- Ocultar.

## 8.5 Página de inicio

Crear un editor sencillo para modificar:

- Título principal.
- Subtítulo.
- Imagen principal.
- Texto de presentación.
- Tratamientos destacados.
- Resultados destacados.
- CTA.

No permitir modificar libremente la estructura visual.

## 8.6 Mi negocio

Permitir editar:

- Teléfono.
- WhatsApp.
- Instagram.
- Facebook.
- Dirección.
- Horarios.
- Fotografía de Alexandra.
- Texto de presentación.

La configuración técnica, claves, despliegues y usuarios deben quedar fuera de este apartado.

---

# 9. AUTENTICACIÓN CON SUPABASE

Utiliza Supabase Auth.

Requisitos:

- Inicio de sesión mediante email y contraseña.
- Sin registro público.
- Usuarios creados o invitados únicamente por el administrador.
- Sesiones seguras.
- Cierre de sesión.
- Recuperación de contraseña segura.
- Protección de rutas.
- Validación de permisos en el servidor.
- Manejo correcto de expiración de sesión.

Utiliza las recomendaciones actuales de Supabase para SSR y gestión de cookies.

No implementes autenticación casera.

No almacenes tokens de sesión en localStorage como mecanismo principal de autenticación SSR.

No confíes únicamente en datos de usuario proporcionados por el navegador.

### Roles

Necesitamos inicialmente:

**Administrador técnico**

Puede gestionar la infraestructura, la base de datos, usuarios y configuración.

**Editor**

Puede administrar exclusivamente los contenidos autorizados de la web.

No debe poder modificar roles, permisos, usuarios o configuración sensible.

Implementa autorización mediante una tabla de roles o un mecanismo equivalente seguro.

No permitas que un usuario se asigne a sí mismo privilegios administrativos.

Utiliza verificaciones server-side y políticas RLS.

---

# 10. BASE DE DATOS SUPABASE

Diseña una estructura PostgreSQL limpia y normalizada.

Tablas mínimas:

```text
profiles
site_settings
home_content
treatment_categories
treatments
gallery_results
testimonials
faqs
```

Puedes añadir tablas relacionales cuando sean necesarias.

### Campos comunes

Cuando corresponda:

- `id`
- `created_at`
- `updated_at`
- `status`
- `sort_order`

Utiliza UUID, claves foráneas, restricciones, índices y tipos apropiados.

Los slugs deben ser únicos.

### Migraciones

Crea migraciones SQL versionadas dentro del repositorio.

No dependas de crear manualmente todas las tablas desde el panel de Supabase.

Incluye:

- Tablas.
- Relaciones.
- Restricciones.
- Índices.
- Políticas RLS.
- Funciones necesarias.
- Triggers necesarios.
- Datos iniciales no sensibles.

No incluyas contraseñas ni claves reales.

Genera los tipos TypeScript a partir del esquema de Supabase cuando sea viable.

### Row Level Security

Activa RLS en todas las tablas expuestas mediante la API.

Políticas:

**Visitantes anónimos**

- Leer exclusivamente contenido publicado.
- No insertar.
- No editar.
- No eliminar.

**Editor autorizado**

- Gestionar contenidos permitidos.
- No modificar permisos ni roles.
- No acceder a datos privados de otros usuarios.

**Administrador**

- Acciones administrativas autorizadas.

Evita políticas demasiado permisivas.

No utilices la clave `service_role` en el navegador.

Si una operación necesita privilegios elevados, ejecútala exclusivamente en un contexto seguro de servidor y con autorización explícita.

---

# 11. SUPABASE STORAGE

Utiliza Supabase Storage para gestionar fotografías.

Define una estrategia clara de buckets.

Por ejemplo:

```text
public-media
private-media
```

`public-media` contendrá únicamente recursos destinados a publicación pública.

`private-media` estará protegido y solo se utilizará si realmente existe necesidad de archivos privados.

No almacenes imágenes sensibles o documentos de consentimiento en buckets públicos.

### Subida de imágenes

Implementa:

- Selección de archivos.
- Vista previa.
- Validación.
- Estados de subida.
- Mensajes de error.
- Nombres únicos.
- Prevención de colisiones.
- Control de acceso.
- Eliminación segura.

Cuando se sustituya una imagen, evita dejar archivos huérfanos innecesarios.

No elimines automáticamente un archivo compartido por varios contenidos.

### Optimización

Utiliza transformaciones compatibles con Supabase y el plan disponible, o un proceso de optimización adecuado.

Comprueba las funcionalidades y límites del plan antes de depender de ellos.

Prepara imágenes responsivas y formatos modernos.

---

# 12. CONTENIDO DINÁMICO

Requisito esencial:

**Cuando Alexandra publique una fotografía o modifique un tratamiento desde el panel, el cambio debe reflejarse en la web pública sin realizar un nuevo despliegue en GitHub.**

Implementa renderizado bajo demanda para las páginas administrables.

Puedes utilizar:

- Astro SSR.
- Consultas server-side a Supabase.
- Caché de duración corta o invalidación adecuada.

No uses generación estática para contenidos que necesiten reflejar modificaciones inmediatamente, salvo que exista un mecanismo de regeneración probado.

No expongas credenciales privadas.

Controla correctamente:

- Errores de Supabase.
- Contenido inexistente.
- Contenido oculto.
- Fallos temporales de conexión.
- Estados vacíos.
- Caché.

---

# 13. INSTAGRAM Y FACEBOOK

Instagram:

https://www.instagram.com/micro.alexandrasanchez/

Implementa:

- Enlace al perfil.
- Iconos sociales.
- Sección de Instagram en la página de inicio.
- Soporte para publicaciones incrustadas.

Prioriza métodos oficiales y compatibles.

Si no es posible crear un feed automático fiable, desarrolla una funcionalidad sencilla en el panel para introducir URLs de publicaciones destacadas.

No utilices scraping no autorizado.

Carga las incrustaciones de terceros de manera diferida y gestiona el consentimiento cuando corresponda.

Facebook:

Nombre: Micro Alexandra Sanchez.

No inventes su URL.

Deja la integración preparada hasta verificarla.

---

# 14. SEO

Implementa SEO técnico completo.

Requisitos:

- Títulos únicos.
- Meta descriptions.
- URLs limpias.
- Canonical.
- Open Graph.
- Twitter/X Cards.
- Sitemap dinámico o actualizado.
- Robots.txt.
- Datos estructurados apropiados.
- Breadcrumbs.
- Encabezados semánticos.
- Alt text.
- Enlazado interno.
- Página 404.

### SEO local

Prepara la estructura para posicionamiento local.

No inventes ciudad, dirección ni zona de servicio.

Cuando se confirme la ubicación, optimiza los contenidos para las búsquedas locales relevantes.

### Contenido

Redacta textos iniciales profesionales, orientados a SEO y conversión.

No inventes:

- Certificaciones.
- Experiencia.
- Premios.
- Opiniones.
- Resultados.
- Duración de tratamientos.
- Afirmaciones sanitarias.
- Promesas de eficacia.

Identifica los textos que necesitan revisión de Alexandra.

---

# 15. RENDIMIENTO

Objetivos orientativos:

- Lighthouse Performance ≥ 90.
- Accessibility ≥ 95.
- Best Practices ≥ 95.
- SEO ≥ 95.

Estos resultados deben medirse, no suponerse.

Optimiza:

- LCP.
- CLS.
- INP.
- Imágenes.
- Fuentes.
- JavaScript.
- CSS.
- Consultas a Supabase.
- Caché.
- Carga de contenido externo.

Evita consultas N+1.

No cargues todas las fotografías de la galería si existen cientos de resultados.

Prepara paginación o carga progresiva.

---

# 16. ACCESIBILIDAD

Cumple WCAG 2.2 AA en los componentes y flujos aplicables.

Implementa:

- Navegación con teclado.
- Estados focus.
- Contraste suficiente.
- Labels.
- Mensajes de error accesibles.
- HTML semántico.
- Menú móvil accesible.
- Comparador de imágenes accesible.
- Modales accesibles.
- Respeto a preferencias de movimiento reducido.

No dependas únicamente del color para transmitir información.

---

# 17. SEGURIDAD

Prioriza seguridad desde el diseño.

Requisitos:

- HTTPS.
- RLS.
- Protección SSR.
- Autenticación segura.
- Autorización en cada operación sensible.
- Validación de datos con esquemas tipados.
- Protección CSRF donde corresponda.
- Prevención de XSS.
- Consultas parametrizadas o APIs seguras.
- Protección de secretos.
- Límites de subida.
- Control de acceso a Storage.
- Cabeceras de seguridad.
- Gestión de errores sin filtrar información interna.

No exponer claves privadas.

No confiar en controles visuales como mecanismo de autorización.

El panel debe estar protegido aunque un usuario intente llamar directamente a los endpoints.

No registrar contraseñas, tokens o datos sensibles en logs.

---

# 18. COOKIES Y ASPECTOS LEGALES

Prepara:

- Aviso legal.
- Política de privacidad.
- Política de cookies.
- Sistema de consentimiento cuando resulte necesario.

Las incrustaciones de Instagram y otros terceros pueden requerir controles adicionales.

No cargues recursos sujetos a consentimiento antes de obtenerlo cuando la normativa aplicable así lo exija.

No inventes datos legales.

Los textos jurídicos deben quedar claramente pendientes de completar y revisar antes de la publicación definitiva.

---

# 19. DESPLIEGUE EN COOLIFY CON NIXPACKS

La infraestructura Coolify ya existe.

Supabase está alojado en Supabase Cloud.

Despliega únicamente la aplicación Astro en Coolify.

### Requisitos

- Conexión con GitHub.
- Build mediante Nixpacks.
- Node.js LTS compatible.
- Adaptador oficial `@astrojs/node`.
- Servidor Node escuchando en `0.0.0.0`.
- Puerto configurable.
- Variables de entorno.
- HTTPS.
- Health check.
- Reinicio automático.
- Logs.
- Despliegue desde rama controlada.

### Configuración

Define scripts claros en `package.json`:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "start": "node ./dist/server/entry.mjs",
    "check": "astro check"
  }
}
```

Ajusta los scripts si la versión elegida de Astro o el adaptador requiere cambios.

Configura el build para producir una aplicación Node ejecutable en producción.

No utilices `astro preview` como servidor de producción.

### Variables de entorno

Prepara `.env.example` con nombres apropiados, como:

```env
PUBLIC_SITE_URL=
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
HOST=0.0.0.0
PORT=4321
```

Adapta los nombres a las versiones y recomendaciones oficiales de Supabase.

No incluyas valores reales.

No hagas pública una clave secreta de Supabase.

Las claves publicables solo deben utilizarse con políticas RLS correctamente configuradas.

### Dominio

El dominio definitivo se proporcionará posteriormente.

No inventes uno.

Prepara la configuración para asociarlo desde Coolify.

### GitHub

Repositorio:

https://github.com/akaexgot/alexandrasanchez

Configura una estrategia de ramas:

- `main`: versión estable.
- `develop` o rama de trabajo: implementación.

No hagas push de secretos.

No realices cambios destructivos en producción sin confirmación.

---

# 20. ESTRUCTURA DEL PROYECTO

Propón una estructura modular y mantenible.

Ejemplo:

```text
alexandrasanchez/
├── src/
│   ├── components/
│   │   ├── public/
│   │   ├── admin/
│   │   └── shared/
│   ├── layouts/
│   │   ├── PublicLayout.astro
│   │   └── AdminLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── sobre-mi.astro
│   │   ├── tratamientos/
│   │   ├── resultados.astro
│   │   ├── opiniones.astro
│   │   ├── preguntas-frecuentes.astro
│   │   ├── contacto.astro
│   │   ├── admin/
│   │   └── api/
│   ├── lib/
│   │   ├── supabase/
│   │   ├── auth/
│   │   ├── validations/
│   │   └── utils/
│   ├── styles/
│   ├── types/
│   └── middleware.ts
├── supabase/
│   ├── migrations/
│   └── seed.sql
├── public/
├── tests/
├── docs/
├── .env.example
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

Adapta la estructura cuando sea necesario.

Prioriza separación de responsabilidades y reutilización.

---

# 21. COMPONENTES

Desarrolla componentes reutilizables.

### Web pública

- Header.
- MobileMenu.
- Footer.
- Hero.
- TreatmentCard.
- TreatmentGrid.
- BeforeAfterSlider.
- GalleryGrid.
- GalleryFilters.
- TestimonialCard.
- FAQAccordion.
- WhatsAppButton.
- InstagramEmbed.
- CTASection.
- SEOHead.
- Breadcrumbs.

### Panel

- AdminSidebar.
- AdminHeader.
- DashboardCard.
- DataTable.
- TreatmentForm.
- GalleryUploadForm.
- ImagePreview.
- ConfirmDialog.
- StatusBadge.
- Toast.
- LoadingState.
- EmptyState.
- FormField.
- SaveButton.

No desarrolles un sistema de diseño excesivamente complejo.

---

# 22. PRUEBAS

Implementa pruebas automatizadas apropiadas.

Comprueba:

### Web pública

- Navegación.
- Rutas.
- Responsive.
- Menú móvil.
- WhatsApp.
- Filtros.
- Comparador.
- FAQ.
- SEO.
- Estados vacíos.
- Errores.

### Panel

- Login.
- Logout.
- Sesiones.
- Protección de rutas.
- Acceso no autorizado.
- Creación de tratamientos.
- Edición.
- Publicación.
- Ocultación.
- Subida de fotografías.
- Sustitución de imágenes.
- Eliminación.
- Validaciones.
- Permisos RLS.

### Integración

- Consultas a Supabase.
- Storage.
- Renderizado dinámico.
- Actualización de contenido sin despliegue.
- Build de producción.

Utiliza Playwright para pruebas end-to-end si resulta adecuado.

No afirmes que una prueba se ha superado sin ejecutarla.

---

# 23. DOCUMENTACIÓN

Genera:

### README técnico

Incluye:

- Arquitectura.
- Stack.
- Instalación.
- Desarrollo.
- Variables de entorno.
- Configuración de Supabase.
- Migraciones.
- Autenticación.
- Storage.
- Pruebas.
- Build.
- Despliegue Coolify.
- Mantenimiento.

### Guía de Alexandra

Escribe una guía breve, clara y sin tecnicismos.

Debe explicar:

1. Cómo entrar al panel.
2. Cómo añadir un tratamiento.
3. Cómo modificar un tratamiento.
4. Cómo subir un antes y después.
5. Cómo publicar u ocultar resultados.
6. Cómo editar opiniones.
7. Cómo modificar preguntas frecuentes.
8. Cómo cambiar información del negocio.
9. Cómo cerrar sesión.

Incluye capturas de pantalla reales cuando la interfaz esté implementada y puedan obtenerse.

### Guía de mantenimiento

Documenta:

- Actualización de dependencias.
- Gestión de usuarios.
- Copias de seguridad de Supabase.
- Copias de archivos de Storage.
- Restauración.
- Monitorización.
- Resolución de errores.
- Despliegues.

No supongas que el plan de Supabase incluye recuperación puntual o backups automáticos suficientes. Comprueba las características disponibles y documenta una estrategia realista.

---

# 24. ORDEN DE DESARROLLO

Trabaja por fases.

### Fase 1 — Análisis

- Inspeccionar repositorio.
- Revisar compatibilidad de tecnologías.
- Definir arquitectura.
- Identificar dependencias.
- Identificar información pendiente.

### Fase 2 — Base del proyecto

- Configurar Astro.
- Configurar Tailwind.
- Configurar TypeScript.
- Configurar Node adapter.
- Crear estructura.
- Configurar Supabase.
- Crear tokens de diseño.

### Fase 3 — Web pública

- Crear layout.
- Crear navegación.
- Desarrollar páginas.
- Desarrollar componentes.
- Implementar responsive.
- Añadir contenido provisional.

### Fase 4 — Base de datos

- Crear migraciones.
- Crear tablas.
- Crear relaciones.
- Configurar RLS.
- Configurar Storage.
- Generar tipos.

### Fase 5 — Autenticación

- Configurar Supabase Auth.
- Crear login.
- Proteger rutas.
- Implementar roles.
- Verificar permisos.

### Fase 6 — Panel de administración

- Crear dashboard.
- CRUD de tratamientos.
- CRUD de galería.
- Gestión de opiniones.
- Gestión de FAQ.
- Editor de inicio.
- Configuración del negocio.

### Fase 7 — Integración

- Conectar contenidos públicos.
- Implementar SSR.
- Resolver caché.
- Probar publicación sin despliegue.
- Gestionar imágenes.
- Gestionar errores.

### Fase 8 — Calidad

- SEO.
- Accesibilidad.
- Rendimiento.
- Seguridad.
- Pruebas.

### Fase 9 — Producción

- Configurar Nixpacks.
- Configurar Coolify.
- Conectar GitHub.
- Configurar variables.
- Configurar dominio.
- Verificar HTTPS.
- Probar aplicación.

### Fase 10 — Entrega

- Documentación.
- Guía del panel.
- Comprobaciones finales.
- Lista de pendientes.
- Resumen de funcionalidades.

---

# 25. CRITERIOS DE ACEPTACIÓN

No consideres terminado el proyecto hasta verificar:

- La web pública funciona.
- Todas las páginas están implementadas.
- El diseño es responsive.
- El panel es accesible únicamente para usuarios autorizados.
- Alexandra puede editar tratamientos.
- Alexandra puede subir fotografías.
- La galería permite filtrar.
- El comparador antes/después funciona.
- Las fotografías se almacenan en Supabase Storage.
- Las políticas RLS están configuradas y probadas.
- Los cambios publicados se reflejan sin nuevo despliegue.
- El contenido no publicado no es accesible públicamente.
- El SEO técnico está implementado.
- El proyecto compila.
- Las pruebas críticas se han ejecutado.
- Coolify puede desplegar la aplicación.
- La documentación está completa.

Distingue siempre entre:

- Implementado.
- Probado localmente.
- Desplegado.
- Verificado en producción.
- Pendiente.

No afirmes que algo está funcionando en producción sin haberlo comprobado.

---

# 26. REGLAS DE TRABAJO

- No utilices Directus ni otros CMS.
- No desarrolles una tienda online.
- No desarrolles reservas online.
- No desarrolles un blog.
- No añadas funcionalidades innecesarias.
- No inventes datos del negocio.
- No inventes testimonios.
- No inventes resultados.
- No inventes información clínica.
- No publiques secretos.
- No debilites RLS para solucionar errores.
- No utilices la clave secreta de Supabase en el navegador.
- No sobreingenierices el proyecto.
- No realices acciones destructivas sin confirmación.
- No modifiques producción sin autorización.

Toma decisiones técnicas razonables y explica brevemente las más importantes.

No solicites confirmación para cada componente o archivo. Avanza de forma autónoma cuando el requisito esté definido.

Si una decisión afecta a la seguridad, al coste recurrente o a la infraestructura existente, consulta antes de ejecutarla.

---

# 27. RESULTADO FINAL

Debes entregar:

1. Web Astro profesional.
2. Diseño premium y responsive.
3. Todas las páginas públicas.
4. Panel de administración personalizado.
5. Autenticación con Supabase.
6. Base de datos con RLS.
7. Supabase Storage.
8. Galería de antes y después.
9. CRUD de tratamientos.
10. Gestión de opiniones.
11. Gestión de preguntas frecuentes.
12. Editor de contenido básico.
13. Integración con WhatsApp e Instagram.
14. SEO técnico.
15. Pruebas.
16. Configuración Coolify + Nixpacks.
17. Documentación técnica.
18. Guía de administración para Alexandra.

**La prioridad es conseguir una web visualmente excelente y un panel que Alexandra pueda utilizar fácilmente desde el móvil, sin conocimientos técnicos.**

Comienza inspeccionando el repositorio y preparando la arquitectura. Después implementa el proyecto por fases, ejecutando comprobaciones y corrigiendo errores.

No te detengas tras crear una maqueta: continúa hasta completar las funcionalidades solicitadas o hasta encontrar un bloqueo real que requiera información o permisos externos.