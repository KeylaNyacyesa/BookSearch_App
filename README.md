Book Search is a simple and practical web application that allows users to search for books using keywords (title, author, or subject) and view key information like title, author, cover image, publication year, description, and preview links. It uses the Google Books API to fetch real-time book data.


Features:

Search Books: Search for books by title, author, or subject.
Featured Books: Displays books on the Google Books API.
Responsive Design: Friendly layout with a clean, light theme.
Redundant Web Services: Two identical web app containers (Web01 and Web02) improve fault tolerance and scalability under load.


Prerequisites:

Node.js: Not required for running the app, but useful for local development servers (e.g., npx serve).
Docker: Required for containerized deployment.
Google Books API: Obtain a free API key from Google Books API.
Web Servers: Two Ubuntu-based servers with Docker and Nginx installed for deployment.
Load Balancer: A separate Ubuntu server with Docker and HAProxy for load balancing.

Development Challenges:

Challenge: When running docker compose up, it seemed like the containers took a while to start, making it unclear whether the app was actually working.

Solution: I waited a few minutes after the command finished, then used docker ps to confirm the containers were running.


Image Details

Docker Hub Repo URLs:

Web01: https://hub.docker.com/r/keyla119/web-01

Web02: https://hub.docker.com/r/keyla119/web-02

Load Balancer (LB01): https://hub.docker.com/r/keyla119/lb-01

Image Names & Tags:

keyla119/web-01:latest

keyla119/web-02:latest

keyla119/lb-01:latest

Build Instructions (Local)

I built each image locally with the following commands:

docker compose up --build -d

Run Instructions:

docker run -d \
  --name web-01 \
  -p 80:80 \
  keyla119/web-(01 or 02):latest

Load Balancer Configuration (HAProxy on LB01):

  frontend http_front
    bind *:80
    default_backend http_back

  backend http_back
    balance roundrobin
    server web01 <Web01-IP>:80 check
    server web02 <Web02-IP>:80 check

Run HAProxy container on LB01:
   docker run -d \
   --name lb-01 \
   -p 80:80 \
   -v /path/to/haproxy.cfg:/usr/local/etc/haproxy/haproxy.cfg \
  keyla119/lb-01:latest

Reload HAProxy:

sudo systemctl reload haproxy
# or
sudo service haproxy reload

Screenshot for the load balancing test:

<img width="603" height="396" alt="Image" src="https://github.com/user-attachments/assets/e95fe3b2-1584-412d-ae40-f29473457cf1" />








