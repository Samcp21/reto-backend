# Reto Backend

Este proyecto es un backend construido con **NestJS** y desplegado en **AWS Lambda** mediante **Serverless Framework**. Incluye integración con una base de datos **DynamoDB** y consume la API de **SWAPI** para obtener datos sobre personajes de Star Wars, adaptándolos al español.


## Características

- **NestJS** como framework de backend
- **AWS Lambda** y **Serverless Framework** para despliegues serverless
- **Amazon EventBridge** para manejar eventos de la aplicación
- **DynamoDB** como base de datos NoSQL
- **Integración con API SWAPI** para obtener y traducir datos de personajes de Star Wars
- **Validación y Transformación de Datos** con `class-validator` y `class-transformer`
- **Documentación de la API** mediante Swagger

## Requisitos

- **Node.js** >= 14.x
- **npm** >= 6.x
- **AWS CLI** configurado
- **Serverless Framework** instalado globalmente

  ```bash
  npm install -g serverless

  
## Installation

Clonar el repositorio en tu entorno de trabajo.

Cambiar al directorio del proyecto: cd reto-backend

Instalar las dependencias del proyecto:
```bash
  npm install
```
    
## Uso

Construir el proyecto:

```bash
  npm run build
```

Iniciar el servidor en desarrollo:

```bash
  npm run start
```
Ejecutar pruebas:

```bash
  npm run test
```


## API Reference

#### Poblar la DynamoDB

```http
  GET /seed
```

#### Crea un nuevo personaje en la base de datos

```http
  POST /people
```

###  Obtiene todos los personajes por paginacion

```http
  GET /people?page=2
```


#### Obtiene la información de un personaje por ID

```http
  GET /people/:id
```

#### Actualiza la información de un personaje por ID

```http
  PUT /people/:id
```


#### Elimina un personaje por ID

```http
  DELETE /people/:id
```
### Ejemplo de Solicitud

```bash
  curl -X POST https://t8r27zxz09.execute-api.us-east-2.amazonaws.com/dev/api-softtek/people \
  -H "Content-Type: application/json" \
  -d '{
        "nombre": "Juan Pérez",
        "altura": "175",
        "masa": "80",
        "genero": "masculino",
        "especies": ["humano"]
      }'
```

## Swagger

```http
  http://localhost:3000/api/docs
```

## Despliegue

Para desplegar en AWS Lambda usando Serverless Framework:

Asegúrate de estar autenticado en AWS CLI y ejecuta el siguiente comando para desplegar el servicio:

```http
  serverless deploy
```

Primero Desplegar para que se pueda crear Base de Datos

```http
  serverless offline
```