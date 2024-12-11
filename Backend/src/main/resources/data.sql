INSERT INTO cotizacion (validez_oferta, cond_pago_adelantado, cond_pago_contra, plazo_de_entrega, precio_tentativo, notas, porcentaje, estado, id_proyecto, id_cliente, timestamp)
VALUES (14, '60','40', 7, NULL, 'no se que puede ir aqui', 20, 'Revisar', 1, 1, '2024-03-23 12:00:00');
INSERT INTO proyecto (nombre, direccion, descripcion, estado, id_cliente)
VALUES ('Instalar aire acondicionado', 'Calle Test 123', 'Descripción del proyecto, no cuentan con el aire acondicionado', 'Sin asignar', 1);
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

-- Aprobado
INSERT INTO proyecto (nombre, direccion, descripcion, estado, id_cliente)
VALUES
    ('Reparar filtraciones en baño', 'Calle Central 200', 'Fugas en tuberías y renovación de grifería', 'Aprobado', 17),
    ('Diseñar sistema de riego', 'Pasaje Verde 301', 'Sistema automático para jardín amplio', 'Aprobado', 18),
    ('Renovar pisos y cerámicas', 'Avenida Moderno 14', 'Cambio de pisos en sala y cocina', 'Aprobado', 19),
    ('Construir muro perimetral', 'Calle Periferia 45', 'Mayor seguridad para la propiedad', 'Aprobado', 20),
    ('Renovar ventanas', 'Camino Vista Hermosa 5', 'Ventanas con aislamiento térmico y acústico', 'Aprobado', 21);

-- Terminado
INSERT INTO proyecto (nombre, direccion, descripcion, estado, id_cliente)
VALUES
    ('Reparar techo', 'Avenida Norte 67', 'Colocación de tejas nuevas y aislación', 'Terminado', 22),
    ('Construir pérgola', 'Pasaje Tranquilo 99', 'Espacio techado para terraza', 'Terminado', 23),
    ('Instalar aire acondicionado', 'Calle Refrescante 150', 'Aire acondicionado en habitaciones y sala', 'Terminado', 24),
    ('Pintar interior', 'Avenida Clara 88', 'Pintura de paredes y techos en blanco', 'Terminado', 25),
    ('Instalar calefacción', 'Camino Sur 2', 'Sistema de calefacción para toda la casa', 'Terminado', 26);

INSERT INTO proyecto_user(id_proyecto,id_user)
VALUES(1,1);
INSERT INTO material (nombre, descripcion, precio)
VALUES('Aire acondicionado', 'Aire acondicionado de 12000 BTU', 500);
INSERT INTO users (username,email,name,rut,role)
VALUES('adminCasaExperto','casaexperto@usach.cl','Casa Experto Administraction','11111111-1','ADMIN'),
      ('JuanP1','juan@casaexperto.cl','Juan Pablo','11111111-1','Supervisor'),
      ('JuanP2','juan2@casaexperto.cl','Juan Pablo 2','11111111-1','Jefe de operaciones'),
      ('JuanP3','juan3@casaexperto.cl','Juan Pablo 3','11111111-1','Maestro'),
      ('PedroP1','pedro@casaexperto.cl','Pedro Pablo','11111111-1','Maestro');