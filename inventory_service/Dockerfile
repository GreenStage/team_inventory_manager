FROM node:10

ADD . /app

COPY package.json /app
WORKDIR /app

EXPOSE 8000

RUN npm set progress=false \
    && npm install -g nodemon \
    && npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/node -q \
    && npm install

CMD nodemon --legacy-watch -w src --exec npm run start