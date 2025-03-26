# JardinsBarber

Este repositorio contiene el backend (Spring Boot) y el SSR (Frontend) para el proyecto JardinsBarber.

**Tecnologías:** 
* **Backend:** Java, Spring Boot, Maven, Spring Data, Hibernate, MySQL.
* **SSR:** JavaScript, Node.js, Express.js, EJS.

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
