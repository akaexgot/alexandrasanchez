# Alexandra Sánchez

Aplicación Astro SSR para micropigmentación y estética de la mirada. Web pública y panel propio, con Supabase Cloud para PostgreSQL, Auth y Storage. Sin CMS, tienda, reservas ni blog.

**Estado:** implementación local inicial. No desplegada. El proyecto Supabase aún no existe, según lo confirmado por el propietario del repositorio. Ver [estado y pendientes](docs/estado.md).

## Desarrollo

Recomendado: Node 24 LTS y npm. En este equipo Node global es 22.19.0; se ha instalado Node 24 como dependencia local para los scripts npm, sin cambiar la instalación global.

```sh
npm ci
npm run dev
```

En PowerShell con scripts bloqueados, usar `npm.cmd`. Abrir `http://localhost:4321`. Sin variables de Supabase, la web muestra contenido editorial provisional; el panel queda bloqueado. Con Supabase configurado, se consulta la base de datos en cada petición y los errores producen una respuesta 503, sin sustituir silenciosamente la información por datos de demostración.

```sh
npm run check
npm test
npx playwright install chromium
npm run build
npm run test:e2e
npm start
```

No utilizar `astro preview` como servidor de producción. `npm start` arranca el servidor standalone del adaptador oficial.

## Arquitectura

- `src/pages`: rutas públicas, administración y endpoints.
- `src/layouts`, `src/components`: UI Astro y JavaScript ligero.
- `src/lib/content.ts`: lectura SSR pública mediante cliente anónimo.
- `src/lib/supabase/server.ts`: cliente SSR por petición, cookies HttpOnly y renovación de sesión.
- `src/middleware.ts`: validación de usuario con Auth, rol en servidor, control de origen y cabeceras.
- `src/lib/validation.ts`: esquemas Zod y listas explícitas de campos editables.
- `supabase/migrations`: esquema relacional, restricciones, RLS, Storage y funciones.
- `tests`: validación, imágenes, PostgreSQL embebido y Playwright.

Los colores y fuentes están centralizados en `src/styles/global.css`. La ilustración de portada es provisional, no una fotografía de Alexandra ni un resultado de tratamiento. No se han inventado opiniones, formación, dirección, horarios ni datos clínicos.

## Configuración de Supabase

1. Crear un proyecto Supabase Cloud en la región elegida por su responsable. No se ha creado infraestructura desde este trabajo.
2. Copiar `.env.example` a `.env` y completar `PUBLIC_SUPABASE_URL` y `PUBLIC_SUPABASE_PUBLISHABLE_KEY`. La aplicación no necesita una clave secreta ni `service_role`.
3. Aplicar todos los archivos de `supabase/migrations/` en orden de nombre y, después, `supabase/seed.sql` mediante SQL Editor o CLI de Supabase. El seed se ejecuta una vez en un proyecto nuevo; no está pensado para repetirse sobre contenido editado.
4. Desactivar el registro público en Auth. Configurar correo SMTP, límites de Auth y URL de sitio. Autorizar exactamente `https://DOMINIO/api/auth/callback` y la URL local de desarrollo mientras sea necesaria.
5. Crear un usuario de email/contraseña desde el panel técnico. Asignar su UUID mediante SQL ejecutado por el administrador:

```sql
insert into public.user_roles(user_id, role)
values ('UUID_DEL_USUARIO', 'editor');
```

El editor no tiene permisos para modificar esta tabla. Un usuario autenticado sin rol tampoco puede editar. No hay formulario de registro. La recuperación usa PKCE: solicitar y abrir el enlace en el mismo navegador.

6. Probar login, logout, expiración, recuperación y CRUD con el proyecto real. Confirmar las políticas de Storage tanto con usuario editor como con cliente anónimo.
7. Generar tipos desde el proyecto real con la CLI oficial y sustituir el contrato editorial manual cuando exista el proyecto. Actualmente `Content` es un contrato escrito a mano, no tipos generados de una instancia real.

## Imágenes y privacidad

Bucket privado `media`. Los archivos se decodifican con Sharp, se verifica extensión/MIME/formato real, tamaño y dimensiones, se eliminan metadatos y se convierten a WebP de hasta 2000 px. Nombres UUID; no se permite sobrescribir un objeto existente.

Las rutas `/media/[id]` comprueban RLS y sirven variantes acotadas. Un visitante solo puede leer imágenes referenciadas por contenido publicado. Los borradores no tienen URLs públicas ni URLs firmadas reutilizables. Se envía `private, no-store` para evitar conservar copias servidas al panel o después de ocultar contenido.

Al reemplazar o eliminar contenido, se intenta retirar la imagen anterior; las claves foráneas impiden borrar imágenes compartidas. Una subida cancelada o un fallo de borrado en Storage pueden dejar archivos huérfanos: revisar periódicamente según la guía de mantenimiento. No subir documentos jurídicos de autorización.

## Variables

| Variable | Uso |
| --- | --- |
| `PUBLIC_SITE_URL` | Origen HTTPS definitivo, canonical, sitemap y validación de origen. Sin dominio se envía noindex. |
| `PUBLIC_SUPABASE_URL` | URL del proyecto Cloud. |
| `PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Clave publicable; seguridad basada en RLS. |
| `HOST` | `0.0.0.0` en Coolify. |
| `PORT` | `4321` por defecto; debe coincidir con Coolify. |

## Coolify y Nixpacks

Crear un recurso conectado al repositorio `akaexgot/alexandrasanchez`, seleccionando la rama revisada. `develop` contiene el desarrollo; `main` se reserva para una versión estable verificada. Elegir Nixpacks y el archivo incluido. Build: `npm ci`, `npm run check`, `npm run build`. Inicio: `npm start`. Puerto interno 4321, health check `GET /api/health`, reinicio automático y logs activados. El health check comprueba el proceso; no garantiza disponibilidad de Supabase.

Configurar las variables, dominio y HTTPS en Coolify antes de publicar. `PUBLIC_SITE_URL` debe existir durante el build y en ejecución: Astro lo utiliza para declarar el dominio permitido. Si cambia el dominio, reconstruir la aplicación. El proxy debe preservar el origen correcto. Limitar los cuerpos de petición a 11 MB en el proxy y configurar límites de peticiones en login/subidas. Verificar que no se cachean respuestas privadas. Solo se despliega Astro; no instalar PostgreSQL ni otro CMS en Coolify.

No se ha conectado Coolify, creado un dominio, aplicado migraciones en Cloud ni verificado producción. Los textos legales requieren completar datos y revisión antes de publicación.

## Guías y referencias

- [Guía de Alexandra](docs/guia-alexandra.md)
- [Mantenimiento](docs/mantenimiento.md)
- [Estado y verificaciones pendientes](docs/estado.md)
- [Astro: adaptador Node](https://docs.astro.build/en/guides/integrations-guide/node/)
- [Supabase: cliente SSR](https://supabase.com/docs/guides/auth/server-side/creating-a-client)
- [Supabase: backups](https://supabase.com/docs/guides/platform/backups)

Las versiones efectivas se conservan en `package-lock.json`; instalar con `npm ci` para reproducir el entorno.

Para repetir la auditoría local, construir y arrancar el servidor con `HOST=127.0.0.1` y ejecutar `node scripts/audit.mjs` usando Node 24. En este equipo puede utilizarse `.\node_modules\node\bin\node.exe scripts/audit.mjs`. El informe se guarda en `docs/audits/`. La auditoría no configura Supabase ni publica la web.
