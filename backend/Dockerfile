FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Create a .env.example file that will be used if no .env is provided
RUN echo "MONGODB_URI=mongodb://mongodb:27017/chatapp\nPORT=5000\nJWT_SECRET=your_jwt_secret\nNODE_ENV=production\nCLOUDINARY_CLOUD_NAME=your_cloud_name\nCLOUDINARY_API_KEY=your_api_key\nCLOUDINARY_API_SECRET=your_api_secret" > .env.example

# Use .env if it exists, otherwise use .env.example
RUN if [ ! -f .env ]; then cp .env.example .env; fi

EXPOSE 5000

CMD ["npm", "start"] 