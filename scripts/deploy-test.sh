#!/bin/bash
bash scripts/setup-local-env.sh
ng build --configuration test
docker buildx build --platform linux/amd64,linux/arm64 \
  -t ezraorina834/esr-ui:test --push .
