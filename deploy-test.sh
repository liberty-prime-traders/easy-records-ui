#!/bin/bash
bash scripts/setup-local-env.sh
ng build --configuration test
docker build --platform linux/arm64 -t easy-records-ui .
docker tag easy-records-ui ezraorina834/easy-records-ui:test
docker push ezraorina834/easy-records-ui:test
