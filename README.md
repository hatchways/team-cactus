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
/users (register new user)<br/>
/users/login (login user)<br/>
<br/>
GET /shops (get shop data for logged in user)<br/>
GET /shops/{:id} (get shop data for public)<br/>
PUT /shops (edit shop data)<br/>
<br/>
POST /products (create new product)<br/>
