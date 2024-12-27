FROM node:23-alpine AS build

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el package.json y el package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación al directorio de trabajo
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Utiliza una imagen base de Nginx para servir la aplicación
FROM nginx:1.15.2-alpine

# Copia los archivos construidos desde la etapa de construcción al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Elimina la copia de los certificados
# COPY ./docker/nginx/certs/nginx-selfsigned.crt /etc/ssl/certs/nginx-selfsigned.crt
# COPY ./docker/nginx/certs/nginx-selfsigned.key /etc/ssl/private/nginx-selfsigned.key

# Copia el archivo de configuración de Nginx
COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf

# Expone solo el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]