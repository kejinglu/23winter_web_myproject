## this repo include code submitted only.
## docs and reports in repo `../*_docs`

## demo video link (also in submit comment)
https://drive.google.com/file/d/183PkuH5kDnjg1_9O71ZfrW_X5hcTQpSF/view?usp=sharing

## Please note the file directory structure is put in design report last page!

## I also included a zip version of everything(not including node_modules ) in my project to a zip backup-myproject.zip;
 i included an upload.zip which can be put in upload/ folder in react app, since I inserted some posts in sql script, they are using pictures inside of it. but you can get rid of inserts in script and not put it in the react app

I have included package.json and package-lock.json files for backend and frontend,
And  I have renamed 2 files,so backend has `package-lock-backend.json package-backend.json`
please name it back to `package.json ,and package-lock.json` to be able to run npm install.(other file renames are detailed in design report last part)

from root, there should be /web and /server directories, and aside is node_project.sql script 

## set up sql database
This project needs local sql server started having username: root, password:admin. You can start a server with musql community server or use docker compose from my assignment3
import script in node_project.sql to (use mysql workbench to execute it) initialize databse and create tables.

## run node server
First run `npm i` in server directory
node app.js

## front end - react web app
You can create `npm create-react-app web`
cd web
<move my files into directory like in design report >
I reused the icons inside /public so i attached them as well: logo192.png , favicon.ico , index.html
npm run start
open [http://localhost:3000]

## packages
frontend:
styled-components cors body-parser dayjs react-router-dom axios react-router 
server:
mysql express crypto cors body-parser multer uuid fs path
