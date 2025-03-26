# JardinsBarber (Backend)

Este repositorio contiene el backend (Spring Boot) para el proyecto JardinsBarber.

**Tecnologías**: Java, Spring Boot, Maven, Spring Data, Hibernate, MySQL.

## Estructura del repositorio

* `Backend/`: Contiene el código fuente del backend

## Primeros pasos

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/uranium092/JardinsBarber
    ```

2.  **Navegar al directorio del backend:**

    ```bash
    cd SenaSoft2024/Backend
    ```

## Requisitos previos

1.  **Java:** Descarga e instala el JDK (versión >= 17) desde [Oracle](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html).
2.  **MySQL:** Descarga e instala [MySQL](https://www.mysql.com/downloads/)

## Configuración

1.  **MySQL:** Asegúrate de que MySQL esté en ejecución.
2.  **Credenciales MySQL**: Asegúrate de adaptar las credenciales de MySQL en el `application.properties` (ubicado en `src/main/resources`)
       ```properties
    spring.datasource.username=root
    spring.datasource.password=admin
    ```
    * Por defecto root y admin son las credenciales locales, cámbialo si es necesario.
       
3.  **Envío de correos** Por razones de seguridad, no podemos exponer las credenciales Smtp de Gmail. Para habilitarlo, configure sus propias credenciales SMTP de Gmail en el archivo application.properties (ubicado en src/main/resources).
    ```properties
    email.auth.smtp=-
    password.auth.smtp=-
    ```
    * `email.auth.smtp` equivalente al userName y ` password.auth.smtp` equivalente a la contraseña de aplicación

## Ejecución

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

## Nota
* El backend debe de estar corriendo estrictamente en el puerto `:8080`
