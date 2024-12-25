# Services
k8s_yaml('infra/k8s/services/doctor-depl.yaml')
k8s_yaml('infra/k8s/services/ingress-srv.yaml')


# Databases
k8s_yaml('infra/k8s/databases/doctor-mysql-depl.yaml')

# Project images
docker_build('oopdaddy/doctor', 'doctor', live_update=[sync('doctor/src', '/app/src')])

# Databases port forward 
k8s_resource("doctor-mysql-depl", port_forwards="3306:3306") #port forward

# Services port forward 
k8s_resource("doctor-depl", port_forwards="3001:3000") #port forward