# Estado de ejecución de prompt.md

## Implementado localmente

- Astro SSR, TypeScript estricto, Tailwind, adaptador Node standalone y Nixpacks.
- Todas las rutas públicas solicitadas y 404, SEO, robots y sitemap.
- Diseño provisional responsive, ilustración propia y tokens centralizados.
- Panel privado: seis apartados, creación/edición, publicación/borradores, orden y eliminación confirmada.
- Supabase SSR, validación remota del usuario y rol, login/logout y recuperación PKCE.
- Migración PostgreSQL, restricciones, RLS, bucket privado y semillas sin testimonios ni fotos ficticias.
- Subidas verificadas/optimizadas, comparador, filtros, ampliación y paginación de resultados.
- WhatsApp, teléfono e Instagram con carga de incrustaciones bajo permiso explícito.
- Documentación técnica y de uso.

## Verificación

Comprobaciones ejecutadas en esta fase:

| Comprobación | Resultado |
| --- | --- |
| `npm run check` | 0 errores, 0 advertencias |
| `npm test` | 5 pruebas superadas |
| `npm run build` | Build Node SSR correcto |
| `npm run test:e2e` | 8 pruebas superadas, escritorio y móvil, contra el build de producción local |
| Lighthouse móvil local | Rendimiento 100, accesibilidad 100, buenas prácticas 100, SEO 63 |

El SEO local está limitado por el `noindex` intencional mientras no existe dominio configurado. El informe está en `docs/audits/lighthouse-local.html`, con resumen JSON. Las mediciones son de la portada provisional sin Supabase ni fotografías; deben repetirse con los contenidos y entorno finales. Una puntuación automática de accesibilidad no acredita por sí sola cumplimiento WCAG completo.

Las pruebas RLS utilizan PostgreSQL embebido (PGlite) con los esquemas administrados de Auth/Storage simulados. Esto verifica el SQL y las políticas de la aplicación, pero no sustituye probar los servicios reales de Supabase.

## Bloqueo externo confirmado

El proyecto Supabase Cloud todavía no está creado. No se pueden comprobar login real, correo de recuperación, cookies renovadas, CRUD remoto, subida/descarga real ni actualización SSR contra Cloud. Tampoco se ha proporcionado acceso a Coolify ni dominio definitivo. No hay despliegue ni verificación de producción.

## Pendientes de completar y revisar

- Crear Supabase con la región/plan elegidos por el responsable, aplicar migración y seed, configurar Auth/SMTP y probar con una cuenta editor.
- Generar tipos TypeScript desde esa base de datos y ejecutar pruebas de integración autenticadas.
- Fotografías reales, logotipo, identidad final, biografía verificada, testimonios autorizados, dirección, horarios y URL de Facebook.
- Completar/revisar textos jurídicos y contenido clínico de los tratamientos.
- La carga opcional de vídeos no está implementada. Los tratamientos admiten fotografía principal y dos imágenes adicionales; existe también galería de resultados por tratamiento.
- Repetir Lighthouse con fotos/contenido definitivo, revisión WCAG completa y capturas del panel con usuario real.
- Conectar Coolify, revisar límites de peticiones, desplegar con HTTPS y ejecutar verificaciones de producción.
- Revisar y publicar rama estable cuando se cumplan los criterios de aceptación.

El proyecto no se considera terminado ni listo para producción hasta cerrar estos puntos.
