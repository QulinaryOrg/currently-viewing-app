#specify node version
FROM node:latest

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json /tmp/package.json
RUN cd /tmp && npm install


RUN mkdir /src && cp -a /tmp/node_modules /src/

# Creating base "src" directory where the source repo will reside in our container.
# Code is copied from the host machine to this "src" folder in the container as a last step.
WORKDIR /src

# Copy entire project directory to docker
COPY . /src