#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
docker build -t dealer-pricing:local ./dealer-pricing
kind load docker-image dealer-pricing:local --name microservices-lab
kubectl apply -f k8s/dealer-pricing-deployment.yaml
kubectl rollout status deployment/dealer-pricing --timeout=120s
kubectl get deployment dealer-pricing
kubectl get pods -l app=dealer-pricing
kubectl get service dealer-pricing
