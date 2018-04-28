# Echo Server

Echos client connection information.

Use Docker build and run to run a stand alone echo server:

```shell
# build the Docker image
docker build -t echo-server .

# run the Docker image
docker run --rm -d -p 5000:5000 echo-server

# get logs from container
docker logs $(docker ps -l --format "{{.ID}}")
```
