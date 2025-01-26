# Services
k8s_yaml('infra/k8s/services/doctor-depl.yaml')
k8s_yaml('infra/k8s/services/dashbackend-depl.yaml')
k8s_yaml('infra/k8s/services/ingress-srv.yaml')


# Databases
k8s_yaml('infra/k8s/databases/doctor-mysql-depl.yaml')
k8s_yaml('infra/k8s/databases/dashbackend-mysql-depl.yaml')


# Project images for syncing 
docker_build('oopdaddy/doctor', 'doctor', live_update=[sync('doctor/src', '/app/src')])
docker_build('oopdaddy/dashbackend', 'dashbackend', live_update=[sync('dashbackend/src', '/app/src')])

# Databases port forward 
k8s_resource("doctor-mysql-depl", port_forwards="3306:3306") #port forward
k8s_resource("dashbackend-mysql-depl", port_forwards="3307:3306") #port forward


# Services port forward 
k8s_resource("doctor-depl", port_forwards="3001:3000") #port forward
k8s_resource("dashbackend-depl", port_forwards="3002:3000") #port forward