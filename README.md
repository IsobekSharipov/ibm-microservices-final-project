# IBM Microservices Final Project

Python-track microservices final project.

## Product Details Microservice
Flask API in `product-details/`: `GET /health`, `GET /products`, and `GET /products/<id>`.

## Deploy locally with Kubernetes (kind)
Requires Docker, kind and kubectl.

```bash
kind create cluster --name microservices-lab
bash scripts/deploy-product-details.sh
kubectl get deployment product-details
kubectl get pods -l app=product-details
```

Capture the real terminal output from successful deployment as `product_details_deploy.png` for Question 1. This local deployment does not require IBM Cloud.
