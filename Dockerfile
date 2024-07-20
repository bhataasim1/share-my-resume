FROM node:20-alpine
WORKDIR /share-my-resume
COPY . ./
RUN npm install
# RUN npm run generate
# RUN npm run migrate
RUN npm run build
EXPOSE 3000
CMD ["npm","run", "start"]