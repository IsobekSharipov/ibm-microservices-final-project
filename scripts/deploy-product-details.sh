#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
docker build -t product-details:local ./product-details
kind load docker-image product-details:local --name microservices-lab
kubectl apply -f k8s/product-details-deployment.yaml
kubectl rollout status deployment/product-details --timeout=120s
kubectl get deployments,pods,services -l app=product-details
