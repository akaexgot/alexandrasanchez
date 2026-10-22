# Mantenimiento técnico

## Dependencias y despliegues

Trabajar en `develop` o una rama aislada. Revisar cambios de Astro y adaptador juntos, mantener Node LTS compatible, actualizar lockfile y ejecutar `check`, pruebas unitarias/RLS, Playwright y build antes de promover a `main`. Revisar `npm audit`; no aplicar actualizaciones mayores automáticas en producción.

Coolify debe desplegar un commit conocido. Conservar una versión anterior verificable para rollback. Las migraciones de base de datos se revisan aparte: retroceder el código no deshace una migración. No ejecutar cambios destructivos sin copia verificada y aprobación del responsable.

## Usuarios

Crear e invitar usuarios únicamente desde Supabase. Mantener registro público desactivado. Asignar `editor` mediante SQL técnico. Revocar un rol quitando su fila de `user_roles` y cerrar/revocar las sesiones según corresponda. El rol se consulta por petición. Nunca permitir al editor modificar roles ni entregar una clave secreta al navegador.

Verificar SMTP, recuperación, límites de Auth y redirecciones permitidas con el dominio definitivo. El callback PKCE debe abrirse en el navegador que inició la recuperación. Probar también errores y enlaces caducados.

## Copias y restauración

El plan de Supabase todavía no se ha elegido. No se presupone disponibilidad de backups diarios, retención o PITR. Revisar la sección de backups del proyecto y la [documentación oficial](https://supabase.com/docs/guides/platform/backups) antes de fijar el procedimiento.

La copia de PostgreSQL no contiene los bytes de los archivos de Storage. Mantener dos copias cifradas y con acceso restringido: dump de la base de datos y exportación de objetos del bucket `media`, con inventario de rutas y comprobaciones de integridad. La exportación debe usar herramientas de administración desde un equipo seguro, nunca credenciales en el repositorio. Definir frecuencia y retención con el responsable según volumen y pérdida de datos tolerable.

Ensayar restauración en un proyecto aislado: restaurar esquema/datos, importar objetos con sus rutas originales, revisar usuarios Auth y roles, comprobar RLS, abrir imágenes y efectuar login/CRUD. Registrar fecha y resultado. No considerar una copia válida hasta probar una restauración.

## Archivos huérfanos

Las sustituciones eliminan la referencia anterior y solo borran metadatos si ninguna clave foránea los utiliza. Un error al borrar el objeto puede dejar un archivo sin fila de metadatos; una subida cancelada puede dejar una fila sin referencias.

Revisar inventario periódicamente. Comparar `storage.objects` del bucket `media` con `media_assets`; para metadatos sin uso comprobar **todas** las referencias (`treatments.image_id/detail_image_id/second_detail_image_id`, `gallery_results.before_id/after_id`, `home_content.image_id`, `site_settings.image_id`). Dar un margen mínimo de 24 horas para formularios abiertos. Preparar la lista y comprobarla antes de eliminar por la API oficial de Storage. No eliminar archivos mediante SQL directo de `storage.objects`, porque no equivale a borrar sus bytes.

## Monitorización

- Comprobar health check del proceso y una ruta que consulte Supabase.
- Revisar errores 5xx y fallos de Auth/Storage sin registrar credenciales ni contenido sensible.
- Vigilar espacio, transferencia, errores de correo y límites del plan.
- Mantener HTTPS, límites de cuerpo de petición y frecuencia en el proxy.
- Volver a medir Lighthouse y revisar accesibilidad tras introducir fotos y textos finales.

Si la web devuelve 503, comprobar conectividad, variables y migraciones. Si el acceso redirige al login, comprobar sesión y rol. Si una imagen no aparece, comprobar su referencia, estado de publicación y políticas; no convertir el bucket en público para solucionar el problema.
