# *Securing an API with OpenID Connect and OAuth using Keycloak*  

## *Repository link*  
https://github.com/Jskenpo/EJERCICIO-AUTENTICACION-SEGURIDAD

## *Overview*  
A RESTful API built with Node.js and Express.js, secured using Keycloak, OIDC, and OAuth 2.0 for authentication and authorization. Public and protected endpoints are managed via JWT validation.

## *Setup*  

### *1. Keycloak Configuration*  
Run from the project root: docker-compose up --build

- Keycloak: http://localhost:8080 (Admin: admin/admin)
- API: http://localhost:3000


### *2. API Implementation*  
Endpoints:  
- *GET /public* → Public access  
- *GET /private* → Protected (requires authentication)  
- *POST /data* → Protected (requires authentication)  

### *3. Authentication & JWT Validation*  
- Allow access to /public without authentication  
- Require a valid JWT token for /private and /data  

## *Testing*  
Obtain an access token:  
curl -X POST -d "client_id=api-client" -d "client_secret=mysecret" \
  -d "username=testuser" -d "password=password" -d "grant_type=password" \
  "http://localhost:8080/realms/CybersecurityRealm/protocol/openid-connect/token

Use the token to access protected endpoints:  
curl -H "Authorization: Bearer <access_token>" http://localhost:3000/private

## *Public*
<p align="center">
  <br>
  <img src="img/public.png" alt="wb" width="600">
  <br>
</p>

## *Private*
<p align="center">
  <br>
  <img src="img/private.png" alt="wb1" width="600">
  <br>
</p>

## *Data*
<p align="center">
  <br>
  <img src="img/data.png" alt="wb2" width="600">
  <br>
</p>