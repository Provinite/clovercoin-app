#/bin/bash
docker run --rm -it \
  -v $PWD:/data \
  --env-file "terraform.env" \
  -w /data/$(realpath "$INIT_CWD" --relative-to "$PWD") \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /var/lib/docker:/var/lib/docker \
  -v /usr/bin/docker:/usr/bin/docker \
  hashicorp/terraform:1.5 \
  "$@"