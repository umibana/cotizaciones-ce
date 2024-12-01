INSERT INTO cotizacion (validez_oferta, cond_pago_adelantado, cond_pago_contra, plazo_de_entrega, precio_tentativo, notas, porcentaje, estado, id_proyecto, id_cliente, timestamp)
VALUES (14, '60','40', 7, NULL, 'no se que puede ir aqui', 20, 'Revisar', 1, 1, '2024-03-23 12:00:00');
INSERT INTO proyecto (nombre, direccion, descripcion, estado, id_cliente)
VALUES ('Instalar aire acondicionado', 'Calle Test 123', 'Descripción del proyecto, no cuentan con el aire acondicionado', 'Sin asignar', 1);
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