# mypostgres
kubectl apply -f ./mypostgres/mypostgres-clusterip.yml
kubectl apply -f ./mypostgres/mypostgres-configmap.yml
kubectl apply -f ./mypostgres/mypostgres-deploy.yml
kubectl apply -f ./mypostgres/mypostgres-pvc.yml
kubectl apply -f ./mypostgres/mypostgres-secret.yml
kubectl apply -f ./mypostgres/pv-local.yml

# myredis
kubectl apply -f ./myredis/myredis-clusterip.yml
kubectl apply -f ./myredis/myredis-configmap.yml
kubectl apply -f ./myredis/myredis-deploy.yml

# mybackend
kubectl apply -f ./mybackend/mybackend-clusterip.yml
kubectl apply -f ./mybackend/mybackend-deploy.yml
kubectl apply -f ./mybackend/mybackend-nodeport.yml

# myfrontend
kubectl apply -f ./myfrontend/myfrontend-clusterip.yml
kubectl apply -f ./myfrontend/myfrontend-deploy.yml
kubectl apply -f ./myfrontend/myfrontend-nodeport.yml

# ingress
minikube addons enable ingress
sleep 10
kubectl apply -f myapp-ingress.yml
