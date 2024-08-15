FROM node:16

# Defines the pwd
WORKDIR /usr/src/app

# Defines dependencies
COPY package*.json ./

# Installs dependencies
RUN npm install

# Copy from SOURCE into DESTINATION (both ., I know! confusing)
COPY . .

# Shows localhost where 8800 is
EXPOSE 8800
CMD [ "npm", "run", "start" ]


