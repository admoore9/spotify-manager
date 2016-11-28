FROM node:6.9.1
EXPOSE 8080

# Create app directory
RUN mkdir -p /user/src/app
WORKDIR /user/src/app

# Install app dependencies
COPY package.json /user/src/app
RUN npm install nodemon -g

# Bundle app source
COPY . /user/src/app
