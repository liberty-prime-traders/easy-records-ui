#!/bin/bash
set -euo pipefail

: "${APP_VERSION:?APP_VERSION must be set, e.g. APP_VERSION=1.0.0 ./deploy.sh}"

ng build --configuration production
docker buildx build --platform linux/amd64,linux/arm64 \
  -t ezraorina834/esr-ui:"$APP_VERSION" --push .
