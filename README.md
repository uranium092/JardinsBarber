# JardinsBarber

Este proyecto es un sistema integral de gestión de citas para barberías, diseñado para optimizar la administración del negocio y mejorar la experiencia tanto de los barberos como de los usuarios.

## Funcionalidades principales

* **Gestión de roles:**
    * El sistema distingue tres roles principales: administrador (que también actúa como barbero), barbero común y usuario.
    * El administrador tiene control total sobre el negocio, incluyendo la gestión de personal (creación, actualización y eliminación de barberos) y la configuración de su propia agenda.
* **Gestión de perfiles:**
    * Todos los barberos, incluido el administrador, pueden gestionar su perfil, incluyendo la foto de perfil.
    * El sistema asigna una foto de perfil por defecto a los barberos que no suben una propia.
* **Notificaciones por correo electrónico:**
    * El sistema envía notificaciones por correo electrónico a todos los roles sobre acciones importantes relacionadas con sus cuentas, como solicitudes y confirmaciones de cambio de contraseña.
    * Los usuarios también reciben notificaciones sobre sus citas agendadas, incluyendo detalles relevantes.
* **Agendamiento en tiempo real:**
    * La reserva de citas se refleja en tiempo real en las agendas de los barberos, permitiendo a otros usuarios ver la disponibilidad actualizada.
    * El barbero tambien ve dicha actualizacion.
* **Seguridad y manejo de sesiones:**
    * El sistema implementa medidas de seguridad para proteger la navegación y restringir el acceso a rutas no autorizadas.
    * Las sesiones de usuario se mantienen activas durante un período limitado para mayor comodidad.
* **Gestión de agendas:**
    * Tanto administradores como barberos pueden crear sus propias agendas, definiendo rangos de fechas y horas de atención.
    * El sistema permite configurar la duración de las citas y ofrece recomendaciones para optimizar la visualización de la agenda.
    * La agenda tiene una duracion maxima de 15 dias.
* **Visualización y reserva de citas:**
    * Los usuarios registrados pueden ver la disponibilidad de los barberos y reservar citas en línea.
    * El sistema muestra información detallada sobre las citas reservadas y permite a los usuarios cancelarlas si es necesario.
* **Actualización de datos:**
    * Todos los roles pueden actualizar sus datos personales y contraseñas.
    * El sistema ofrece un mecanismo de recuperación de contraseñas para usuarios que olvidan sus credenciales.

Este sistema ofrece una solución completa para la gestión de barberías, facilitando la administración del negocio y mejorando la experiencia de los usuarios.

**Tecnologías:** 
* **Backend:** Java, Spring Boot, Maven, Spring Data, Hibernate, MySQL.
* **SSR:** JavaScript, Node.js, Express.js, EJS.
* **Tecnologias SSR (Frontend):** JQuery, moment.js

### Nota
* Por razones de seguridad y de condición de entorno (DEVELOPMENT), la plataforma no se puede integrar a Meta-Instagram.

## Estructura del repositorio

* `Backend/`: Contiene el código fuente del backend (Spring Boot).
* `SSR/`: Contiene el código fuente del SSR (Frontend).

## Primeros pasos

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/uranium092/JardinsBarber
    ```

## Requisitos previos

### Backend (Backend)

1.  **Java:** Descarga e instala el JDK (versión >= 17) desde [Oracle](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html).
2.  **MySQL:** Descarga e instala [MySQL](https://www.mysql.com/downloads/).

### SSR (Frontend)

1.  **Node.js:** Descarga e instala Node.js (versión >= 20.12.2) desde [NodeOrg](https://nodejs.org/en/download).
2.  **Backend:** Asegúrate de que el backend esté en ejecución (ver instrucciones abajo).

## Configuración

### Backend (Backend)

1.  **Navegar al directorio del backend:**

    ```bash
    cd JardinsBarber/Backend
    ```

2.  **MySQL:** Asegúrate de que MySQL esté en ejecución.
3.  **Base de datos:** Crea una base de datos llamada `jardinsbarber` en tu instancia de MySQL.

### SSR (Frontend)

1.  **Navegar al directorio del SSR (Frontend):**

    ```bash
    cd JardinsBarber/SSR
    ```

## Ejecución

### Backend (Backend)

1.  **Ejecutar la aplicación:**

    * **Usando el Wrapper de Maven (mvnw):**

        ```bash
        mvnw spring-boot:run
        ```

    * **Usando Maven instalado localmente:**

        ```bash
        mvn spring-boot:run
        ```

    * **Ejecutando el JAR compilado:**

        * Compilar el proyecto:

            ```bash
            mvn clean package
            ```

        * Ejecutar el JAR:

            ```bash
            java -jar target/app.jar
            ```

            * Reemplaza `app.jar` por el nombre del archivo .jar generado en `/target`

### SSR (Frontend)

1.  **Instalar dependencias:**

    ```bash
    npm install
    ```

2.  **Ejecutar el frontend:**

    ```bash
    npm start
    ```

    * El frontend estará disponible en `http://localhost:16000`.

## Recomendaciones

* Asegúrate de que el backend se esté ejecutando estrictamente en el puerto `:8080`.

