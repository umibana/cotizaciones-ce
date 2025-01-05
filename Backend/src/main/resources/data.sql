INSERT INTO cotizacion (validez_oferta, cond_pago_adelantado, cond_pago_contra, plazo_de_entrega, precio_tentativo, notas, porcentaje, estado, id_proyecto, id_cliente, timestamp)
VALUES (14, '60','40', 7, NULL, 'no se que puede ir aqui', 20, 'Revisar', 6, 1, '2024-03-23 12:00:00');
-- Sin asignar
INSERT INTO proyecto (nombre, direccion, descripcion, estado, id_cliente, fecha_visita)
VALUES
    ('Reparar filtración de agua', 'Avenida Los Robles 56', 'Problema de filtración en el techo', 'Sin asignar', 2,'04-01-2025'),
    ('Renovar sistema eléctrico', 'Calle Las Flores 789', 'Sistema eléctrico obsoleto', 'Sin asignar', 3,'2025-01-04'),
    ('Instalar paneles solares', 'Calle Sol Naciente 101', 'Instalación de energía solar en el edificio', 'Sin asignar', 4,'04-01-2025'),
    ('Diseñar jardín paisajístico', 'Pasaje Las Lomas 303', 'Proyecto de paisajismo para áreas verdes', 'Sin asignar', 5,'04-01-2025'),
    ('Construir bodega', 'Camino Viejo 23', 'Necesidad de espacio adicional de almacenamiento', 'Sin asignar', 6,'04-01-2025');

-- Preparación cotización
INSERT INTO proyecto (nombre, direccion, descripcion, estado, id_cliente, fecha_visita)
VALUES
    ('Instalar aire acondicionado', 'Calle Test 123', 'Descripción del proyecto, no cuentan con el aire acondicionado', 'Preparacion cotizacion', 1,'04-01-2025'),
    ('Remodelar oficina', 'Avenida Principal 505', 'Actualización de mobiliario y pintura', 'Preparacion cotizacion', 7,'04-01-2025'),
    ('Construir piscina', 'Calle El Oasis 88', 'Proyecto de piscina familiar', 'Preparacion cotizacion', 8,'04-01-2025'),
    ('Instalar sistema de cámaras', 'Camino El Bosque 102', 'Sistema de vigilancia y seguridad', 'Preparacion cotizacion', 9,'04-01-2025'),
    ('Construir terraza techada', 'Pasaje Los Almendros 66', 'Espacio exterior para reuniones familiares', 'Preparacion cotizacion', 10,'04-01-2025'),
    ('Renovar fachada', 'Calle Antiguo 9', 'Renovación completa de la fachada de la casa', 'Preparacion cotizacion', 11,'04-01-2025');

-- Cotizado
INSERT INTO proyecto (nombre, direccion, descripcion, estado, id_cliente, fecha_visita)
VALUES
    ('Ampliar cocina', 'Avenida La Estrella 47', 'Ampliación del espacio de cocina y nueva isla central', 'Cotizado', 12,'04-01-2025'),
    ('Construcción de quincho', 'Pasaje Los Parques 59', 'Área de barbacoa con horno de barro', 'Cotizado', 13,'04-01-2025'),
    ('Implementar iluminación LED', 'Calle Los Lirios 75', 'Cambio de sistema de iluminación a tecnología LED', 'Cotizado', 14,'04-01-2025'),
    ('Automatizar portón', 'Camino Nuevo 22', 'Instalación de motor para portón automático', 'Cotizado', 15,'04-01-2025'),
    ('Refuerzos estructurales', 'Avenida Colina 112', 'Reparaciones en cimientos y paredes', 'Cotizado', 16,'04-01-2025');

-- Cotizaciones para proyectos en estado 'Cotizado'
INSERT INTO cotizacion (validez_oferta, cond_pago_adelantado, cond_pago_contra, plazo_de_entrega, precio_tentativo, notas, porcentaje, estado, id_proyecto, id_cliente, timestamp)
VALUES
    (30, '50', '50', 5, NULL, 'Cotización sujeta a aprobación final', 30, 'Cotizado', 12, 12, '2024-03-29 12:00:00'),
    (60, '40', '60', 15, NULL, 'Pendiente revisión de material', 40, 'Cotizado', 13, 13, '2024-03-30 12:00:00'),
    (30, '50', '50', 7, NULL, 'Se incluyen descuentos por volumen', 25, 'Cotizado', 14, 14, '2024-03-31 12:00:00'),
    (45, '60', '40', 10, NULL, 'Condiciones de pago revisadas', 30, 'Cotizado', 15, 15, '2024-04-01 12:00:00'),
    (20, '70', '30', 6, NULL, 'Cotización en revisión, ajuste de costos', 35, 'Cotizado', 16, 16, '2024-04-02 12:00:00');
-- Aprobado
INSERT INTO proyecto (nombre, direccion, descripcion, estado, id_cliente, fecha_visita)
VALUES
    ('Reparar filtraciones en baño', 'Calle Central 200', 'Fugas en tuberías y renovación de grifería', 'Aprobado', 17,'04-01-2025'),
    ('Diseñar sistema de riego', 'Pasaje Verde 301', 'Sistema automático para jardín amplio', 'Aprobado', 18,'04-01-2025'),
    ('Renovar pisos y cerámicas', 'Avenida Moderno 14', 'Cambio de pisos en sala y cocina', 'Aprobado', 19,'04-01-2025'),
    ('Construir muro perimetral', 'Calle Periferia 45', 'Mayor seguridad para la propiedad', 'Aprobado', 20,'04-01-2025'),
    ('Renovar ventanas', 'Camino Vista Hermosa 5', 'Ventanas con aislamiento térmico y acústico', 'Aprobado', 21,'04-01-2025');

-- Cotizaciones para proyectos en estado 'Aprobado'
INSERT INTO cotizacion (validez_oferta, cond_pago_adelantado, cond_pago_contra, plazo_de_entrega, precio_tentativo, notas, porcentaje, estado, id_proyecto, id_cliente, timestamp)
VALUES
    (45, '50', '50', 10, NULL, 'Contrato aprobado, pendiente firma', 30, 'Aprobado', 17, 17, '2024-04-03 12:00:00'),
    (60, '30', '70', 12, NULL, 'Aprobación de proyecto pendiente', 40, 'Aprobado', 18, 18, '2024-04-04 12:00:00'),
    (35, '40', '60', 14, NULL, 'Revisión final, presupuesto ajustado', 25, 'Aprobado', 19, 19, '2024-04-05 12:00:00'),
    (50, '60', '40', 10, NULL, 'Solicitud de firma pendiente', 30, 'Aprobado', 20, 20, '2024-04-06 12:00:00'),
    (30, '40', '60', 8, NULL, 'Pendiente aprobación final', 28, 'Aprobado', 21, 21, '2024-04-07 12:00:00');

-- Terminado
INSERT INTO proyecto (nombre, direccion, descripcion, estado, id_cliente, fecha_visita)
VALUES
    ('Reparar techo', 'Avenida Norte 67', 'Colocación de tejas nuevas y aislación', 'Terminado', 22,'04-01-2025'),
    ('Construir pérgola', 'Pasaje Tranquilo 99', 'Espacio techado para terraza', 'Terminado', 23,'04-01-2025'),
    ('Instalar aire acondicionado', 'Calle Refrescante 150', 'Aire acondicionado en habitaciones y sala', 'Terminado', 24,'04-01-2025'),
    ('Pintar interior', 'Avenida Clara 88', 'Pintura de paredes y techos en blanco', 'Terminado', 25,'04-01-2025'),
    ('Instalar calefacción', 'Camino Sur 2', 'Sistema de calefacción para toda la casa', 'Terminado', 26,'04-01-2025');

-- Cotizaciones para proyectos en estado 'Terminado'
INSERT INTO cotizacion (validez_oferta, cond_pago_adelantado, cond_pago_contra, plazo_de_entrega, precio_tentativo, notas, porcentaje, estado, id_proyecto, id_cliente, timestamp)
VALUES
    (45, '50', '50', 5, NULL, 'Cotización cerrada, proyecto completado', 30, 'Terminado', 22, 22, '2024-04-08 12:00:00'),
    (40, '60', '40', 7, NULL, 'Proyecto finalizado, solo detalles pendientes', 25, 'Terminado', 23, 23, '2024-04-09 12:00:00'),
    (35, '70', '30', 3, NULL, 'Finalización de proyecto, pendiente revisión', 22, 'Terminado', 24, 24, '2024-04-10 12:00:00'),
    (50, '60', '40', 6, NULL, 'Contrato concluido, esperando pago', 30, 'Terminado', 25, 25, '2024-04-11 12:00:00'),
    (25, '40', '60', 8, NULL, 'En proceso de cierre, ajustes finales', 20, 'Terminado', 26, 26, '2024-04-12 12:00:00');

-- Inserción de datos para la tabla cliente
INSERT INTO cliente (nombre, rut, telefono, direccion, email)
VALUES
    ('Juan Pérez', '12345678-9', '987654321', 'Calle Ficticia 123', 'juan.perez@email.com'),
    ('María Gómez', '98765432-1', '987654322', 'Avenida Siempre Viva 456', 'maria.gomez@email.com'),
    ('Carlos Martínez', '11223344-5', '987654323', 'Calle Los Pinos 789', 'carlos.martinez@email.com'),
    ('Ana Torres', '22334455-6', '987654324', 'Calle Central 1010', 'ana.torres@email.com'),
    ('Luis García', '33445566-7', '987654325', 'Pasaje Los Álamos 2020', 'luis.garcia@email.com'),
    ('Laura Rodríguez', '44556677-8', '987654326', 'Avenida Libertador 3030', 'laura.rodriguez@email.com'),
    ('José Pérez', '55667788-9', '987654327', 'Calle San Martín 4040', 'jose.perez@email.com'),
    ('Patricia Fernández', '66778899-0', '987654328', 'Avenida de la Paz 5050', 'patricia.fernandez@email.com'),
    ('Miguel Soto', '77889900-1', '987654329', 'Calle del Sol 6060', 'miguel.soto@email.com'),
    ('Sofía Martínez', '88990011-2', '987654330', 'Camino Real 7070', 'sofia.martinez@email.com'),
    ('Ricardo López', '99001122-3', '987654331', 'Calle Los Naranjos 8080', 'ricardo.lopez@email.com'),
    ('Verónica Díaz', '10111223-4', '987654332', 'Avenida de la Luna 9090', 'veronica.diaz@email.com'),
    ('Felipe Sánchez', '12131424-5', '987654333', 'Pasaje San Andrés 10101', 'felipe.sanchez@email.com'),
    ('Mónica Hernández', '13141525-6', '987654334', 'Calle de la Rosa 11111', 'monica.hernandez@email.com'),
    ('Oscar Pérez', '14161726-7', '987654335', 'Camino de la Esperanza 12121', 'oscar.perez@email.com'),
    ('Gabriela Ruiz', '15171827-8', '987654336', 'Calle de los Cedros 13131', 'gabriela.ruiz@email.com'),
    ('Raúl Vargas', '16181928-9', '987654337', 'Avenida Santa María 14141', 'raul.vargas@email.com'),
    ('Elena García', '17192029-0', '987654338', 'Avenida del Sol 15151', 'elena.garcia@email.com'),
    ('Javier Sánchez', '18202130-1', '987654339', 'Calle Nueva 16161', 'javier.sanchez@email.com'),
    ('Paola González', '19212231-2', '987654340', 'Calle de los Álamos 17171', 'paola.gonzalez@email.com'),
    ('Daniel López', '20222332-3', '987654341', 'Camino del Río 18181', 'daniel.lopez@email.com'),
    ('Susana Jiménez', '21232433-4', '987654342', 'Callejón del Sol 19191', 'susana.jimenez@email.com'),
    ('Andrés Castillo', '22242534-5', '987654343', 'Avenida del Mar 20202', 'andres.castillo@email.com'),
    ('Joaquín Martínez', '23252635-6', '987654344', 'Pasaje La Flor 21212', 'joaquin.martinez@email.com'),
    ('Carmen Rodríguez', '24262736-7', '987654345', 'Calle Mayor 22222', 'carmen.rodriguez@email.com'),
    ('Esteban Ruiz', '25272837-8', '987654346', 'Calle del Campo 23232', 'esteban.ruiz@email.com'),
    ('Lorena Pérez', '26282938-9', '987654347', 'Avenida del Centro 24242', 'lorena.perez@email.com');

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
VALUES('Jefe de operaciones','hans@usach.cl','Hans','11111111-1','jefe de operaciones'),
      ('Maestro','maestro@usach.cl','Juan','11111111-1','maestro'),
      ('Supervisor','supervisor@usach.cl','Pablo','11111111-1','supervisor');