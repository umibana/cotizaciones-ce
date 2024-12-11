INSERT INTO cotizacion (validez_oferta, cond_pago_adelantado, cond_pago_contra, plazo_de_entrega, precio_tentativo, notas, porcentaje, estado, id_proyecto, id_cliente, timestamp)
VALUES (14, '60','40', 7, NULL, 'no se que puede ir aqui', 20, 'Revisar', 6, 1, '2024-03-23 12:00:00');
-- Sin asignar
INSERT INTO proyecto (nombre, direccion, descripcion, estado, id_cliente)
VALUES
    ('Reparar filtración de agua', 'Avenida Los Robles 56', 'Problema de filtración en el techo', 'Sin asignar', 2),
    ('Renovar sistema eléctrico', 'Calle Las Flores 789', 'Sistema eléctrico obsoleto', 'Sin asignar', 3),
    ('Instalar paneles solares', 'Calle Sol Naciente 101', 'Instalación de energía solar en el edificio', 'Sin asignar', 4),
    ('Diseñar jardín paisajístico', 'Pasaje Las Lomas 303', 'Proyecto de paisajismo para áreas verdes', 'Sin asignar', 5),
    ('Construir bodega', 'Camino Viejo 23', 'Necesidad de espacio adicional de almacenamiento', 'Sin asignar', 6);

-- Preparación cotización
INSERT INTO proyecto (nombre, direccion, descripcion, estado, id_cliente)
VALUES
    ('Instalar aire acondicionado', 'Calle Test 123', 'Descripción del proyecto, no cuentan con el aire acondicionado', 'Preparacion cotizacion', 1),
    ('Remodelar oficina', 'Avenida Principal 505', 'Actualización de mobiliario y pintura', 'Preparacion cotizacion', 7),
    ('Construir piscina', 'Calle El Oasis 88', 'Proyecto de piscina familiar', 'Preparacion cotizacion', 8),
    ('Instalar sistema de cámaras', 'Camino El Bosque 102', 'Sistema de vigilancia y seguridad', 'Preparacion cotizacion', 9),
    ('Construir terraza techada', 'Pasaje Los Almendros 66', 'Espacio exterior para reuniones familiares', 'Preparacion cotizacion', 10),
    ('Renovar fachada', 'Calle Antiguo 9', 'Renovación completa de la fachada de la casa', 'Preparacion cotizacion', 11);

-- Cotizado
INSERT INTO proyecto (nombre, direccion, descripcion, estado, id_cliente)
VALUES
    ('Ampliar cocina', 'Avenida La Estrella 47', 'Ampliación del espacio de cocina y nueva isla central', 'Cotizado', 12),
    ('Construcción de quincho', 'Pasaje Los Parques 59', 'Área de barbacoa con horno de barro', 'Cotizado', 13),
    ('Implementar iluminación LED', 'Calle Los Lirios 75', 'Cambio de sistema de iluminación a tecnología LED', 'Cotizado', 14),
    ('Automatizar portón', 'Camino Nuevo 22', 'Instalación de motor para portón automático', 'Cotizado', 15),
    ('Refuerzos estructurales', 'Avenida Colina 112', 'Reparaciones en cimientos y paredes', 'Cotizado', 16);

-- Cotizaciones para proyectos en estado 'Cotizado'
INSERT INTO cotizacion (validez_oferta, cond_pago_adelantado, cond_pago_contra, plazo_de_entrega, precio_tentativo, notas, porcentaje, estado, id_proyecto, id_cliente, timestamp)
VALUES
    (30, '50', '50', 5, NULL, 'Cotización sujeta a aprobación final', 30, 'Cotizado', 12, 12, '2024-03-29 12:00:00'),
    (60, '40', '60', 15, NULL, 'Pendiente revisión de material', 40, 'Cotizado', 13, 13, '2024-03-30 12:00:00'),
    (30, '50', '50', 7, NULL, 'Se incluyen descuentos por volumen', 25, 'Cotizado', 14, 14, '2024-03-31 12:00:00'),
    (45, '60', '40', 10, NULL, 'Condiciones de pago revisadas', 30, 'Cotizado', 15, 15, '2024-04-01 12:00:00'),
    (20, '70', '30', 6, NULL, 'Cotización en revisión, ajuste de costos', 35, 'Cotizado', 16, 16, '2024-04-02 12:00:00');
-- Aprobado
INSERT INTO proyecto (nombre, direccion, descripcion, estado, id_cliente)
VALUES
    ('Reparar filtraciones en baño', 'Calle Central 200', 'Fugas en tuberías y renovación de grifería', 'Aprobado', 17),
    ('Diseñar sistema de riego', 'Pasaje Verde 301', 'Sistema automático para jardín amplio', 'Aprobado', 18),
    ('Renovar pisos y cerámicas', 'Avenida Moderno 14', 'Cambio de pisos en sala y cocina', 'Aprobado', 19),
    ('Construir muro perimetral', 'Calle Periferia 45', 'Mayor seguridad para la propiedad', 'Aprobado', 20),
    ('Renovar ventanas', 'Camino Vista Hermosa 5', 'Ventanas con aislamiento térmico y acústico', 'Aprobado', 21);

-- Cotizaciones para proyectos en estado 'Aprobado'
INSERT INTO cotizacion (validez_oferta, cond_pago_adelantado, cond_pago_contra, plazo_de_entrega, precio_tentativo, notas, porcentaje, estado, id_proyecto, id_cliente, timestamp)
VALUES
    (45, '50', '50', 10, NULL, 'Contrato aprobado, pendiente firma', 30, 'Aprobado', 17, 17, '2024-04-03 12:00:00'),
    (60, '30', '70', 12, NULL, 'Aprobación de proyecto pendiente', 40, 'Aprobado', 18, 18, '2024-04-04 12:00:00'),
    (35, '40', '60', 14, NULL, 'Revisión final, presupuesto ajustado', 25, 'Aprobado', 19, 19, '2024-04-05 12:00:00'),
    (50, '60', '40', 10, NULL, 'Solicitud de firma pendiente', 30, 'Aprobado', 20, 20, '2024-04-06 12:00:00'),
    (30, '40', '60', 8, NULL, 'Pendiente aprobación final', 28, 'Aprobado', 21, 21, '2024-04-07 12:00:00');

-- Terminado
INSERT INTO proyecto (nombre, direccion, descripcion, estado, id_cliente)
VALUES
    ('Reparar techo', 'Avenida Norte 67', 'Colocación de tejas nuevas y aislación', 'Terminado', 22),
    ('Construir pérgola', 'Pasaje Tranquilo 99', 'Espacio techado para terraza', 'Terminado', 23),
    ('Instalar aire acondicionado', 'Calle Refrescante 150', 'Aire acondicionado en habitaciones y sala', 'Terminado', 24),
    ('Pintar interior', 'Avenida Clara 88', 'Pintura de paredes y techos en blanco', 'Terminado', 25),
    ('Instalar calefacción', 'Camino Sur 2', 'Sistema de calefacción para toda la casa', 'Terminado', 26);

-- Cotizaciones para proyectos en estado 'Terminado'
INSERT INTO cotizacion (validez_oferta, cond_pago_adelantado, cond_pago_contra, plazo_de_entrega, precio_tentativo, notas, porcentaje, estado, id_proyecto, id_cliente, timestamp)
VALUES
    (45, '50', '50', 5, NULL, 'Cotización cerrada, proyecto completado', 30, 'Terminado', 22, 22, '2024-04-08 12:00:00'),
    (40, '60', '40', 7, NULL, 'Proyecto finalizado, solo detalles pendientes', 25, 'Terminado', 23, 23, '2024-04-09 12:00:00'),
    (35, '70', '30', 3, NULL, 'Finalización de proyecto, pendiente revisión', 22, 'Terminado', 24, 24, '2024-04-10 12:00:00'),
    (50, '60', '40', 6, NULL, 'Contrato concluido, esperando pago', 30, 'Terminado', 25, 25, '2024-04-11 12:00:00'),
    (25, '40', '60', 8, NULL, 'En proceso de cierre, ajustes finales', 20, 'Terminado', 26, 26, '2024-04-12 12:00:00');

INSERT INTO proyecto_user(id_proyecto,id_user)
VALUES(1,1),
      (12,3),
      (13,3),
      (14,3),
      (15,3),
      (16,3);
INSERT INTO material (nombre, descripcion, precio)
VALUES('Aire acondicionado', 'Aire acondicionado de 12000 BTU', 500);
INSERT INTO users (username,email,name,rut,role)
VALUES('adminCasaExperto','casaexperto@usach.cl','Casa Experto Administraction','11111111-1','ADMIN'),
      ('Jefe de operaciones','hans@usach.cl','Hans','11111111-1','jefe de operaciones'),
      ('Maestro','maestro@usach.cl','Juan','11111111-1','maestro'),
      ('Supervisor','supervisor@usach.cl','Pablo','11111111-1','supervisor'),
      ('JuanP3','juan3@casaexperto.cl','Juan Pablo 3','11111111-1','maestro'),
      ('PedroP1','pedro@casaexperto.cl','Pedro Pablo','11111111-1','maestro');