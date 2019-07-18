# EXPRESS-STARTER

### Team Members
Dina Qureshi<br/>
Merrily Tan

### Database

Monitor Mongo database at https://cloud.mongodb.com/freemonitoring/cluster/5QZXH3MCAJMMYV245H336LV7LF3VDUEF

### Running server
To install node-argon2, we will need node-gyp installed globally, which means that we need Python 2.7 and a C/C++ compiler.<br/>
To start: `node bin/www`<br/>

### API Endpoints
POST /users (register new user)<br/>
POST /users/login (login user)<br/>
<br/>
GET /shops (get shop data for logged in user)<br/>
GET /shops/:id (get shop data for public)<br/>
PUT /shops (edit shop data)<br/>
GET /shops/:id/products (get list of products for shop)<br/>
<br/>
POST /products (create new product)<br/>
GET /products/:id (get product data)<br/>
PUT /products/:id (edit product data)<br/>
<br/>
POST /images/single (upload single image to AWS S3)<br/> 
POST /images/multiple (upload multiple images to AWS S3)<br/> 