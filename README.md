### Installing
You need to start your MongoDB:
```
sudo service mongod start
```
Perfom production build of client:
```
cd client
sudo npm install
sudo npm run build
```
Start server with nodemon,pm2 or forever
```
cd backend
pm2 start server.js# your-sneakers-db
```
