# Inicializar el proyecto

## Crear una nueva red de Docker
docker create network notification-network

## Inicializar contenedor
docker compose up --buld -d

# Pasos para pruebas (Contiene algunos errores)
- Registrar dos usuarios
- Loguearse
- Crear un canal al menos
- Ambos usuarios deben subscribirse al mismo canal para poder
comunicarse
- Una vez subscriptos, podrán enviarse mensajes entre ellos (Comunicación por websocket)
