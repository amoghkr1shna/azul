# Use slim variant — smaller image, fewer vulnerabilities than the full python image
FROM python:3.13-slim

# Set working directory inside the container
# All subsequent commands run from here
WORKDIR /app

# Copy requirements first — before your app code
# Docker caches each layer. If requirements.txt hasn't changed,
# Docker skips the pip install on the next build. Saves time.
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Now copy the app code
# Done after pip install so code changes don't invalidate the pip cache
COPY app/ ./app/

# Tell Docker this container listens on port 8000
# Informational only — doesn't actually publish the port
EXPOSE 8000

# Start the server
# --host 0.0.0.0 makes it listen on all network interfaces inside the container
# Without this it only listens on localhost inside the container
# and Docker can't reach it from outside
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
