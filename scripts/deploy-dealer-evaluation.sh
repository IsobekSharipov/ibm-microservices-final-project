#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
docker build -t dealer-evaluation:local ./dealer-evaluation
kind load docker-image dealer-evaluation:local --name microservices-lab
kubectl apply -f k8s/dealer-evaluation-deployment.yaml
kubectl rollout status deployment/dealer-evaluation --timeout=120s
kubectl get deployment dealer-evaluation
kubectl get pods -l app=dealer-evaluation
kubectl get service dealer-evaluation
