
FROM node:20.9.0
 # Stel de map in waar de code in de container komt
  WORKDIR /code 
  # Kopieer de package.json en package-lock.json naar de container
   COPY package.json package.json 
   COPY package-lock.json package-lock.json 
   # Installeer de benodigde bestanden voor de applicatie 
   RUN npm install
    # Kopieer de rest van de bestanden naar de container 
    COPY . /code 
    # Start de server met node server.js 
     CMD ["node", "server.js"]