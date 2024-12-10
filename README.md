## Instalación con Docker

1. Clonar el repositorio
   ```bash
   git clone <repositorio-url>
   ```

2. Crear archivo de configuración de env
   ```bash
   cp .env.example .env
   ```

3. Editar el archivo `.env` con sus llaves de API

4. Start the application
   ```bash
   docker compose up
   ```

La aplicación estará disponible en:
- Backend: http://localhost:8080
- Base de datos: localhost:5432