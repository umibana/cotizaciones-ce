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

4. Iniciar la aplicación

   ### Opción 1: Usar imagen pre-construida (recomendado)
   ```bash
   docker compose --profile prod up
   ```

   ### Opción 2: Construir localmente
   ```bash
   docker compose --profile dev up --build
   ```

La aplicación estará disponible en:
- Backend: http://localhost:8080
- Base de datos: localhost:5432


## Para desarollar

1. Clonar y después construir
```bash
docker buildx build --platform linux/amd64,linux/arm64 \
  -t SU-USERNAME/NOMBRE-DE-IMAGEN:latest \
  -f Backend/Dockerfile \
  --push \
  ./Backend
  ```
