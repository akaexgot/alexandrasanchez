-- Editorial proposals must be reviewed by Alexandra before launch.
insert into public.site_settings(title, status, biography) values ('Alexandra Sánchez','published','Un espacio dedicado a la micropigmentación y la estética de la mirada. Una forma de entender la belleza desde los pequeños detalles y la atención personalizada.');
insert into public.home_content(title,subtitle,introduction,status) values (E'Tu esencia.\nUna mirada única.','Micropigmentación y estética de la mirada, con la atención que mereces.','Cada rostro tiene su propia expresión. Descubre un espacio donde hablar de lo que buscas y explorar los tratamientos que encajan contigo.','published');
insert into public.treatments(title,slug,category,summary,description,status,sort_order,featured) values
('Cejas','cejas','Micropigmentación','El marco de tu expresión.','Cuéntanos qué buscas y resolveremos tus dudas de forma personalizada.','published',0,true),
('Labios','labios','Micropigmentación','Atención a la forma, al detalle y a tu estilo.','Cuéntanos qué buscas y resolveremos tus dudas de forma personalizada.','published',1,true),
('Ojos / eyeliner','eyeliner','Micropigmentación','Una mirada con personalidad.','Cuéntanos qué buscas y resolveremos tus dudas de forma personalizada.','published',2,true),
('Retoques','retoques','Micropigmentación','Revisamos contigo el siguiente paso.','Consulta las opciones de retoque de tu tratamiento.','published',3,false),
('Extensiones pelo a pelo','extensiones-pelo-a-pelo','Estética de la mirada','Detalles que acompañan tu mirada.','Cuéntanos qué buscas y resolveremos tus dudas de forma personalizada.','published',4,false),
('Extensiones 5D','extensiones-5d','Estética de la mirada','Explora una expresión con más protagonismo.','Cuéntanos qué buscas y resolveremos tus dudas de forma personalizada.','published',5,false),
('Lifting de pestañas','lifting-de-pestanas','Estética de la mirada','Tu mirada, en primer plano.','Cuéntanos qué buscas y resolveremos tus dudas de forma personalizada.','published',6,false),
('Depilación con hilo','depilacion-con-hilo','Estética de la mirada','El cuidado de los pequeños detalles.','Cuéntanos qué buscas y resolveremos tus dudas de forma personalizada.','published',7,false);
insert into public.faqs(title,answer,status,sort_order) values
('¿Cómo puedo contactar con Alexandra?','Puedes escribir por WhatsApp al 626836018 o llamar al mismo número.','published',0),
('¿Dónde puedo consultar los precios?','Contacta directamente con Alexandra para consultar información sobre el tratamiento que te interesa.','published',1),
('¿Puedo reservar desde esta web?','La web es informativa. Para hablar de disponibilidad, contacta por WhatsApp o teléfono.','published',2);
