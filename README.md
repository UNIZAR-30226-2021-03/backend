# BACKEND

## STATUS CODES:

**PARA ERRORES:**

- Status code 400: No se cumplen los requirements.
- Status code 401: No es válido el "accessToken" (expirado/ incorrecto).
- Status code 403: No existe el header "accessToken".
- Status code 404: No se ha encontrado el objeto (se especifica el tipo de objeto en cada ruta si es necesario).
- Status code 409: Ya existe un usuario verificado con el mismo email (SignUp).
- Status code 452: No se ha podido crear la categoría.
- Status code 453: No se ha podido borrar la categoría.
- Status code 454: No se ha podido actualizar la categoría.
- Status code 462: No se ha podido crear la info.
- Status code 463: No se ha podido borrar la info.
- Status code 464: No se ha podido actualizar la info.
- Status code 471: Error en la descarga del archivo.
- Status code 472: Error en la subida del archivo
- Status code 473: No se ha podido borrar el archivo.
- Status code 480: No se ha podido enviar el email (se especifica el tipo de email en cada ruta).
- Status code 500: Server error inesperado.

**PARA ÉXITO:**

- Status code 200: Petición procesada correctamente.


## 1: REGISTRARSE - POST to https://keypax-api.sytes.net/public/signup 

**headers**: 

none

**body**: 
```
{ 
    "email":"user_email",
    "nickname":"user_nickname", 
    "password":"master_password" 
}
```

**query**: 

none

**status codes**:
- Status code 480: No puede enviar el email de __verificación__.

**resultado**: 

Se crea un usuario nuevo y se envía el email de verificación.

(Si el usuario existe y no está verificado, vuelve a enviar email de verificación)
(El correo de verificación tiene un tiempo de expiración de quince minutos)

**requirements**: 
- Campo email debe ser email válido. 
- Campo nickname debe ser string simple.
- Campo password debe ser string simple.

**example**:

https://keypax-api.sytes.net/public/signup 
```
body: 
{ 
    "email":"barbara@gmail.com", 
    "nickname":"barbara", 
    "password":"barbara124" 
}
```
return: 
- status code 200

## 2: INICIAR SESIÓN - POST to https://keypax-api.sytes.net/public/login

**headers**: 

none

**body**:
```
{ 
    "email":"user_email",
    "password":"master_password" 
}
```

**query**: none

**status codes**:
- Status code 401: Contraseña o usuario incorrectos.
- Status code 404: El usuario no existe o no está verificado.
- Status code 480: No puede enviar el email de 2fa.

**resultado**:

Se envía un email de 2fa con un código de 6 dígitos que se debe enviar desde el frontend y un token (_2faToken) de tiempo de expiración 5 minutos.

(Necesario para hacer login conservar el token _2faToken y el código enviado por email)

**requirements**: 
- Campo email debe ser email válido y de usuario registrado.
- Campo password debe ser string simple.

**example**:
https://keypax-api.sytes.net/public/login 

```
body: 
{ 
    "email":"barbara@gmail.com", 
    "password":"barbara124" 
}
```
return: 
- status code 200
```
 { 
     _2faToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDY4MmFkZDc3ZjNhYjkxZTgyYzY0YzciLCJpYXQiOjE2MTc0Mzk0NTMsImV4cCI6MTYxNzQ0MDM1M30.67xl3NatXWMiqIf6LSLi-m0l8MBVzr_aQJ-XSanxgo0"
}
```

## 3: COMPLETAR 2FA - POST to https://keypax-api.sytes.net/public/2fa

**headers**: 
none

**body**: 
```
{ 
    "_2faToken": "token expedido por backend desde login" , 
    "code": "codigo que llega al correo"
}
```

**status codes**:
- Status code 401: _2faToken incorrecto o expirado o código incorrecto.

**resultado**

Devuelve un token de acceso ("accessToken") tiempo de expiración de 1h.

**example**:

url: https://keypax-api.sytes.net/public/2fa

body: 
```
{                                  "_2faToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDY4MmFkZDc3ZjNhYjkxZTgyYzY0YzciLCJpYXQiOjE2MTc0NDIzMjIsImV4cCI6MTYxNzQ0MzIyMn0.50LBHkmr6laRUAeC5Yp-Ab3kHL9N765Eo8Gy1oV-gus", 
    "code":"585649" 
}
```

return:
- status code 200
```
 { 
     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDY4MmFkZDc3ZjNhYjkxZTgyYzY0YzciLCJpYXQiOjE2MTc0Mzk0NTMsImV4cCI6MTYxNzQ0MDM1M30.67xl3NatXWMiqIf6LSLi-m0l8MBVzr_aQJ-XSanxgo0"
}
```

## 4: VERIFICAR EMAIL - GET to https://keypax-api.sytes.net/public/verify/:token

**headers**: 

none

**query**: 

none

**params**: 

token

**status codes**:
- Status code 401: Token incorrecto o expirado.

**resultado**:
- Verifica el email del nuevo usuario. Renderiza una página de error o de éxito de la verificación

**example**: 

url: https://keypax-api.sytes.net/public/verify/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDY4MmFkZDc3ZjNhYjkxZTgyYzY0YzciLCJpYXQiOjE2MTc0NDIzMjIsImV4cCI6MTYxNzQ0MzIyMn0.50LBHkmr6laRUAeC5Yp-Ab3kHL9N765Eo8Gy1oV-gus


## 5: CREAR CATEGORÍA - POST to https://keypax-api.sytes.net/private/category

**headers**: 
```
{
    "accessToken": "token de acceso expedido por login + 2fa "
}
```

**body**: 
```
{ 
    "name": "nombre de la categoria"
}
```

**query**: 

none

**requirements**: 
- nombre de categoría string simple

**resultado**:
- Crea una categoría "vacía" de nombre "name" para el usuario.

**example**:

headers: 
```
{
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDY4MmFkZDc3ZjNhYjkxZTgyYzY0YzciLCJpYXQiOjE2MTc0Mzk0NTMsImV4cCI6MTYxNzQ0MDM1M30.67xl3NatXWMiqIf6LSLi-m0l8MBVzr_aQJ-XSanxgo0"
}
```

url: https://keypax-api.sytes.net/private/category

body :
```
{ 
    "name": "Universidad"
}
```
return: 
- status code 200


## 6: CREAR INFO - POST to https://keypax-api.sytes.net/private/info

**headers**: 
```
{
    accessToken: "token de acceso expedido por login + 2fa "
}
```

**body**: 
```
{   
    "name": "nombre del registro de contraseña", 
    "username": "usuario asociado a la contraseña",
    "password": "contraseña a cifrar", 
    "url": "link del sitio asociado", 
    "description": "descripción de la contraseña", 
    "category_id": "id de la categoría a la que pertenece"
}
```

**query**: 

none

**requirements**:
- name string 
- username string
- password string
- url es una uri válida (http(s)://*.*
- category_id es id de categoría válido, string simple

**resultado**

Crea una nueva "info" para la categoria de id "category_id".

**example**:

headers:
```
 {
     accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDY4MmFkZDc3ZjNhYjkxZTgyYzY0YzciLCJpYXQiOjE2MTc0Mzk0NTMsImV4cCI6MTYxNzQ0MDM1M30.67xl3NatXWMiqIf6LSLi-m0l8MBVzr_aQJ-XSanxgo0"
}
```
url: https://keypax-api.sytes.net/private/info

body : 
```
{ 
    "name" : "Contraseña info"
    "username": "andoni", 
    "password": "1234", 
    "url":"http://facebook.com", 
    "description": "contraseña de facebook", 
    "category_id": "341d13gab"
}
```
**return**: 
- status code 200


## 7: BORRAR CATEGORÍA - DELETE to https://keypax-api.sytes.net/private/category

**headers**: 
```
{
    accessToken: "token de acceso expedido por login + 2fa "
}
```

**query**: category_id

**resultado**:
Elimina la categoría con id "category_id".

**example**: 

headers:
```
 {
     accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDY4MmFkZDc3ZjNhYjkxZTgyYzY0YzciLCJpYXQiOjE2MTc0Mzk0NTMsImV4cCI6MTYxNzQ0MDM1M30.67xl3NatXWMiqIf6LSLi-m0l8MBVzr_aQJ-XSanxgo0"
}
```

url:  https://keypax-api.sytes.net/private/category/?category_id=1ef1134fdacb1

return: 
- status code 200



## 8: BORRAR INFO - DELETE to https://keypax-api.sytes.net/private/info

**headers**: 
```
{
    accessToken: "token de acceso expedido por login + 2fa "
}
```
**query**: category_id, info_id

**resultado**
Elimina la info de id "info_id" perteneciente a la cateroría con id "category_id".

**example**: 

headers:
```
 {
     accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDY4MmFkZDc3ZjNhYjkxZTgyYzY0YzciLCJpYXQiOjE2MTc0Mzk0NTMsImV4cCI6MTYxNzQ0MDM1M30.67xl3NatXWMiqIf6LSLi-m0l8MBVzr_aQJ-XSanxgo0"
}
```

url:  https://keypax-api.sytes.net/private/category/?info_id=1fb25ywef&category_id=1ef1134fdacb1

**return**: 
- status code 200

## 9: LISTAR CATEGORÍAS - GET to https://keypax-api.sytes.net/private/categories

**headers**:
```
{
    accessToken: "token de acceso expedido por login + 2fa "
}
```

**resutaldo**
Devuelve todas las categorias junto a sus id

**example**: 

headers:
```
 {
     accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDY4MmFkZDc3ZjNhYjkxZTgyYzY0YzciLCJpYXQiOjE2MTc0Mzk0NTMsImV4cCI6MTYxNzQ0MDM1M30.67xl3NatXWMiqIf6LSLi-m0l8MBVzr_aQJ-XSanxgo0"
}
```

url:  https://keypax-api.sytes.net/private/categories

**return**: 
- status code 200
```
[
    {
        "_id": "6062450ccb63284dfa78089b",
        "name": "Trabajo"
    },
    {
        "_id": "6638380ccb63284dfa78089b",
        "name": "casa"
    },
     {
        "_id": "6638380ccb63284dfa28349b",
        "name": "Universidad"
    }
]
```
## 10: LISTAR INFOS - GET to https://keypax-api.sytes.net/private/infos

**headers**:
```
{
     accessToken: "token de acceso expedido por login + 2fa "
}
 ```

**query**: 

category_id

**resultado**

Devuelve todas las contraseñas junto a sus campos de la categoria category_id.

**example**: 

headers:
```
 {
     accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDY4MmFkZDc3ZjNhYjkxZTgyYzY0YzciLCJpYXQiOjE2MTc0Mzk0NTMsImV4cCI6MTYxNzQ0MDM1M30.67xl3NatXWMiqIf6LSLi-m0l8MBVzr_aQJ-XSanxgo0"
}
```
url: https://keypax-api.sytes.net/private/infos/?category_id=6638380ccb63284dfa78089b

 
return: 

- status code 200
```
[
    {
        "creation_date": "2021-03-30T14:19:08.113Z",
        "_id": "6063335ed261271f1c5a590a",
        "name": "uno",
        "username": "barabara1",
        "password": "contraseña12245",
        "url": "http://hotmail.com"
    },
    {
        "creation_date": "2021-03-30T14:22:11.618Z",
        "_id": "60633416fce6f11fdc313221",
        "name": "uno",
        "username": "usuario",
        "password": "1234",
        "url": "http://facebook.com"
    },
    {
        "creation_date": "2021-03-30T18:51:56.150Z",
        "_id": "6063737972ec7e12b30361ea",
        "name": "uno",
        "username": "miusuario",
        "password": "password",
        "url": "https://gmail.com",
        "description": "Cambiar la contraseña"
    }
]

```

## 11:  ACTUALIZAR CATEGORÍA - PUT to https://keypax-api.sytes.net/private/category

**headers**: 
```
{
    accessToken: "token de acceso expedido por login + 2fa "
}
```

**body**: 
```
{ 
    "name": "nombre nuevo de la categoria", 
    "category_id": "id de categoría a actualizar"
}
```

**query**: none

**requirements**: 
- nombre de categoría string simple
- category_id es id de categoría válido, string simple

**resultado**
Renombra la categoría con id "category_id"

**example**:
headers:
```
 {
     accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDY4MmFkZDc3ZjNhYjkxZTgyYzY0YzciLCJpYXQiOjE2MTc0Mzk0NTMsImV4cCI6MTYxNzQ0MDM1M30.67xl3NatXWMiqIf6LSLi-m0l8MBVzr_aQJ-XSanxgo0"
}
```

url: https://keypax-api.sytes.net/private/category

```
body : { "name": "Universidad", "category": "sdf1q42143kn"}
```
return: 
- status code 200

## 12: ACTUALIZAR INFO - PUT to https://keypax-api.sytes.net/private/info

**headers**: {accessToken: "token de acceso expedido por login + 2fa "}

**body**: 
```
{ 
    "name": "nombre del registro de contraseña",
    "usuario asociado a la contraseña",
    "password": "contraseña a cifrar",
    "url": "link del sitio asociado",
    "description": "descripción de la contraseña",
    "category_id": "id de la categoría a la que pertenece la info a actualizar", 
    "info_id":"id de la info a actualizar"
}

```

(Si no se indica uno de los campos, no se actualiza)

**query**: 

none

**requirements**: 

- category_id es id de categoría válido, string simple
- info_id es id de info válido, string simple

**resultado**
Actualiza la info de id "info_id" perteneciente a la categoría de id "category_id"

**example**:

headers:
```
 {
     accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDY4MmFkZDc3ZjNhYjkxZTgyYzY0YzciLCJpYXQiOjE2MTc0Mzk0NTMsImV4cCI6MTYxNzQ0MDM1M30.67xl3NatXWMiqIf6LSLi-m0l8MBVzr_aQJ-XSanxgo0"
}
```

url: https://keypax-api.sytes.net/private/info
```
body : { 
    "username": "andoni", 
    "password": "1234", 
    "url":"https://facebook.com", 
    "description": "contraseña de facebook", 
    "category_id": "341d13gab",
    "category_id": "341d13g3232",
    }
```
return: 
- status code 200

## 13: UPLOAD ARCHIVO - POST to https://keypax-api.sytes.net/private/file

**headers**: 
```
{
    accessToken: "token de acceso expedido por login + 2fa ",
    Content-Type: 'multipart/form-data'
}
```

**body**: Objeto FormData: ("file", archivo)

**query**: category_id, info_id

https://stackoverflow.com/questions/43013858/how-to-post-a-file-from-a-form-with-axios

**requirements**: 

- category_id es id de categoría válido, string simple
- info_id es id de info válido, string simple

**resultado**
petición procesada correctamente, sube el archivo y actualiza la info

**example**:

**Queda sujeto a revisión el formato de envío del fichero (hacer pruebas con equipo de backend)**

## 14: DOWNLOAD ARCHIVO - GET to https://keypax-api.sytes.net/private/file

**headers**: 
```
{
    accessToken: "token de acceso expedido por login + 2fa ",
}
```

**body**: none

**query**: file_id

**requirements**: 

- file_id es id de archivo válido, string simple.

**resultado**
Descarga el archivo en el cliente

**example**:

headers:
```
 {
     accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDY4MmFkZDc3ZjNhYjkxZTgyYzY0YzciLCJpYXQiOjE2MTc0Mzk0NTMsImV4cCI6MTYxNzQ0MDM1M30.67xl3NatXWMiqIf6LSLi-m0l8MBVzr_aQJ-XSanxgo0"
}
```

url: https://keypax-api.sytes.net/private/infos/?file_id=6638380ccb63284dfa78089b

return: 
- status code 200

## 15: BORRAR ARCHIVO - DELETE to https://keypax-api.sytes.net/private/file

**headers**: 
```
{
    accessToken: "token de acceso expedido por login + 2fa ",
}
```

**body**: none

**query**: category_id, info_id,  file_id

**requirements**: 

- category_id es id de categoría válido, string simple.
- info_id es id de info válido, perteneciente a la categoría con id category_id, string simple.
- file_id es id de archivo válido, perteneciente a la info con id info_id, string simple.

**resultado**
Elimina el archivo y lo quita de la info

**example**:

headers:
```
 {
     accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDY4MmFkZDc3ZjNhYjkxZTgyYzY0YzciLCJpYXQiOjE2MTc0Mzk0NTMsImV4cCI6MTYxNzQ0MDM1M30.67xl3NatXWMiqIf6LSLi-m0l8MBVzr_aQJ-XSanxgo0"
}
```

url: https://keypax-api.sytes.net/private/file?file_id=608547bbe293073edf852f06&category_id=60853ce0de97751e76f7bc85&info_id=6085459ae29307be00852f01

return: 
- status code 200

