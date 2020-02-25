### Installing
You need to start your MongoDB:
```
sudo service mongod start
```
Perfom production build of client:
```
cd client
npm install
npm run build
```
Install modules for backend:
```
cd backend
npm install
```
Start server with nodemon,pm2 or forever:
```
cd backend
pm2 start server.js# your-sneakers-db
```
