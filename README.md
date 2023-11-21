# Bus Reservation

## Description 

In order to implement the Secure Session Management tactic we designed a simple bus reservation system in which we created three user roles with different level of access for the content of the website.

## Diagram
<img src="./Front-End/assets/WhatsApp%20Image%202023-11-20%20at%207.34.45%20PM.jpeg">

## Roles: 
1. **Guest** : 
   A guest has only access to the reservation page where he can see the availability of buses but cannot book a reservation.
2. **Regular user** : 
   A Regular can view the avaibilty of buses and book a reservation.
3. **Admin** : A admin can see the list of user  created

## Technologies:

1. React  
   <img src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" width="50" height="50">

2. Sprint Boot
   
    <img src="https://user-images.githubusercontent.com/25181517/183891303-41f257f8-6b3d-487c-aa56-c497b880d0fb.png" width="50" height="50">

## Features
- Secure session management.
- JWT-based authentication.
- Custom user details service.
- Cross-Origin Resource Sharing (CORS) configuration.
- Extensible security configurations.
- yum
## Prerequisites
- Java 17
- Maven
- Postgresql

## How to use the system

### Front End:
1. clone repo:
```
git clone https://github.com/Gs5570/secure-session-management-tactics.git
```

2. install dependencies:

Go to Front End folder run: ```npm install```

3. To run the project with React: ```npm run dev```

### Back End:
1. Access the Back end Folder
2. Build the project by running : ```mvn clean install```
3. set up your postgresql DB
4. Locate the "application.proprieties" file in the resources folder
5. Edit the file to include your DB configurations:
   1. use the DB session of IntelliJ to configure your DB. it makes it easier.

```
spring.datasource.url = "< jdbc of choice >"
spring.datasource.username = "< your own your >"
spring.datasource.password = "< your own >"
spring.jpa.database = postgresql
spring.datasource.driver-class-name = org.postgresql.Driver
spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto = create
spring.jpa.hibernate.show-sql = true
spring.jpa.hibernate.properties.hibernate.format_sql = true
logging.level.org.hibernate.SQL = DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder = TRACE
logging.level.org.springframework.security = DEBUG
logging.level.root = DEBUG
```
6. 
7. Locate the "SecureSessionApplication.java" and run it 

## Please pay  attention:
  Due to some unforeseen circumstances we run into some issues with the first repo:

  ```https://github.com/Gs5570/secure-session-management.git```

  This repo was created last minute. 

  All the contributions will available in the  first repo. This repo was used for submission and the fact we could not update our remote branch.





