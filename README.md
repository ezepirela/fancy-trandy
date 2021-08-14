# Fancy Trandy
Demo de página web para E-commerce ficticia. Incluye landing page, catálogo de productos, registro de compras anteriores con base de datos, carrito de compras, registro y autenticación de usuario y plataforma de pago.
## Cómo iniciar la App
1. Clona el repositorio.
2. Instala las dependencias con NPM 
3. inicia el servidor de frontEnd con npm run start
4. inicia el servidor backEnd con nodemon app.js
5. define el archivo de variables de entorno con los links necesarios para front y backend. En el Front está la variable REACT_APP_BACKEND_URL la cual es el link en el que estará servido el servidor. En el caso del backend están DB_USER, DB_PASSWORD, DB_NAME, que son las credenciales para MongoDb, DB_FRONT_URL que es el link en el que estará servido el front, GOOGLE_CLIENTID y GOOGLE_CLIENTSECRET que son las credenciales necesarias para utilizar la autenticación de google.
6.
## Cómo usar la App
1. Navega entre los productos en la página principal o la página de productos.
2. Inicia sesión ingresando credenciales o con el botón para google.
3. Selecciona productos con el botón ¨Lo Quiero¨
4. Selecciona el ícono del shopping basket para ir a la página de pago preliminar y presiona el botón pay
5. LLena con los datos de pago 4242424242424242...  para los campos solicitados de información para confirmar el pago.
## Características
-Seleccion de productos.
-Inicio de sesión.
-plataforma de pago.
