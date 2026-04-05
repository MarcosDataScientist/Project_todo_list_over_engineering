# Use a light Python image
FROM python:3.11-slim

# Environment variables for Python buffer and Flask
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV FLASK_APP=wsgi:app
ENV FLASK_ENV=development

# Workspace directory
WORKDIR /app

# System dependencies (standard for build-essential)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy and install Python requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Flask default port
EXPOSE 5000

# Start Flask with host binding for Docker access
CMD ["flask", "run", "--host", "0.0.0.0", "--port", "5000"]
