FROM node:latest

# Defines the pwd
WORKDIR /usr/src/app

# Defines dependencies
COPY package*.json ./

# Installs dependencies
RUN npm install --production

# Copy from SOURCE into DESTINATION (both ., I know! confusing)
COPY . .

# Shows localhost where 1337 is
EXPOSE 1337
CMD [ "npm", "run", "start" ]


