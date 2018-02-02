# Node.js Workshop

## Requirement
- [Docker](https://www.docker.com/community-edition#/download)
- If you have some problem with Docker, Please install MongoDB on your machine

## Restore DB

### By docker
- Unzip `./mongo/db.zip` file
- It must be unzipped in this path `./mongo/db/*.*`
- Open this project folder in your terminal, where you can find `docker-compose.yml` file.
- Type `docker-compose up` in your terminal
- Wait till mongo service starts
- Check your connection and database records using Mongo Client apps. Eg. [Robo3T](https://robomongo.org/)
- You need to find `marvel` database, `characters` and `comics` collections

### By Mongo, if you had problem with Docker
- Unzip `./mongo/marvel.zip` file
- It must be unzipped in this path `./mongo/marvel/*.*`
- Open this project folder in your terminal
- Type `mongorestore -d marvel ./mongo/marvel`
- Check your connection and database records using Mongo Client apps. Eg. [Robo3T](https://robomongo.org/)
- You need to find `marvel` database, `characters` and `comics` collections
