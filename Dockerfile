#Stage 0
#ACÁ SE COMPILA EL PROYECTO DE PRODUCCIÓN.

ARG name=node:15.13.0-alpine3.13
FROM ${name} as build
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm","start"]

#Stage 1:
#Acá, se lleva el proyecto a un nginx

#FROM nginx:1.19.9-alpine
#EXPOSE 80
#COPY --from=build /app/build/ /usr/share/nginx/html

