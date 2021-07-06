const express = require('express')
const path = require('path')
const cors = require('cors')

const routes = require('./routes')

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.use(express.static(path.join(__dirname, "..", "public")));
server.set("views", path.join(__dirname, "..", "public"));
server.engine("html", require("ejs").renderFile);
server.set("view engine", "html")

server.use(cors())
server.use(routes)

server.listen(3000, () => console.log('server is running at port 3000'))