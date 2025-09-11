# Sử dụng NodeJS LTS
FROM node:20

# Set thư mục làm việc
WORKDIR /usr/src/app

# Copy package trước để cache npm install
COPY package*.json ./

# Cài dependencies
RUN npm install

# Copy toàn bộ code
COPY . .

# Mở cổng 3000
EXPOSE 3000

# Lệnh mặc định
CMD ["npm", "run", "start:dev"]
