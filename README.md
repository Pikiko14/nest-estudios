
<p align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="NestJS Logo" />
  </a>
</p>

<h1 align="center">Project Setup & Execution Guide</h1>

---

## 🚀 Development Environment Setup

Follow these steps to set up and run the project in a development environment:

1. **Clone the Repository**

2. **Install Nest CLI**  
   Make sure you have Nest CLI installed globally:
   ```bash
   npm i -g @nestjs/cli
   ```

3. **Start the Database**  
   Run the following command to set up and start the database with Docker:
   ```bash
   docker-compose up -d
   ```

4. **Configure Environment Variables**  
   - Copy the `.env.template` file to a new `.env` file:
   - Populate any required environment variables in `.env`.

5. **Run the Application**  
   Start the application in development mode with:
   ```bash
   npm run start:dev
   ```

6. **Seed the Database**  
   Seed the database with initial data by accessing:
   ```
   {URL_API}/api/seed
   ```

---

## 🛠️ Tech Stack

- **Backend Framework**: NestJS
- **Database**: MongoDB

---

## 🏗️ Production Build

Steps to build and deploy in a production environment:

1. **Create Environment Variables File**  
   Create a `.env.prod` file for production configuration.

2. **Set Environment Variables**  
   Fill out the required variables in the `.env.prod` file.

3. **Build and Deploy the Docker Image**  
   If creating a new Docker image, run:
   ```bash
   docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
   ```

4. **Start the Existing Docker Image**  
   If the image is already built, run:
   ```bash
   docker-compose -f docker-compose.prod.yaml --env-file .env.prod up
   ```

---
