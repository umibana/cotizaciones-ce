INSERT INTO cotizacion (validez_oferta, cond_de_pago, plazo_de_entrega, precio_tentativo, notas, porcentaje, estado, id_proyecto, id_cliente, timestamp)
VALUES (14, 'Primer pago 60% y segundo 40%', 7, NULL, 'no se que puede ir aqui', 20, 'Sin asignar', NULL, NULL, '2024-03-23 12:00:00');
INSERT INTO proyecto (nombre, direccion, descripcion, estado, id_cliente)
VALUES ('Instalar aire acondicionado', 'Calle Test 123', 'Descripción del proyecto, no cuentan con el aire acondicionado', 'Sin asignar', 1);
INSERT INTO material (nombre, descripcion, precio)
VALUES('Aire acondicionado', 'Aire acondicionado de 12000 BTU', 500);
INSERT INTO users (username,email,name,rut,role)
VALUES('adminCasaExperto','casaexperto@usach.cl','Casa Experto Administraction','11111111-1','ADMIN');
