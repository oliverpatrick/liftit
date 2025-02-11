FROM postgres:latest

# Set environment variables for PostgreSQL
ENV POSTGRES_DB=workout_db
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin

# Copy initialization script to container
COPY init.sql /docker-entrypoint-initdb.d/
