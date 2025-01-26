run-local:
	docker build -t robgforpps:latest --progress=plain .
	docker run --rm \
      -p 22031:22031 \
      -v ${PWD}:/app \
      robgforpps:latest
