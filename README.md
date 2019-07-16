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
/users (register new user)
/users/login (login user)

GET /shops (get shop data for logged in user)
GET /shops/{:id} (get shop data for public)
PUT /shops (edit shop data)
