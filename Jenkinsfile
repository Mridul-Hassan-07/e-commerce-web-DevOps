pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build and Start') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKERHUB_USERNAME',
                        passwordVariable: 'DOCKERHUB_PASSWORD'
                    ),
                    string(
                        credentialsId: 'NODE_ENV',
                        variable:'NODE_ENV'
                    ),
                    string(
                        credentialsId: 'VITE_APP_NAME',
                        variable: 'VITE_APP_NAME'
                    ),
                    string(
                        credentialsId: 'POSTGRES_DB',
                        variable: 'POSTGRES_DB'
                    ),
                    string(
                        credentialsId: 'POSTGRES_USER',
                        variable: 'POSTGRES_USER'
                    ),
                    string(
                        credentialsId: 'POSTGRES_PASSWORD',
                        variable: 'POSTGRES_PASSWORD'
                    ),
                    string(
                        credentialsId: 'PGDATA',
                        variable: 'PGDATA'
                    )

                    
                ]) {
                    sh '''
                        docker compose up -d --build
                    '''
                }
            }
        }
        
        stage('DOCKERHUB LOGIN') {
            
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKERHUB_USERNAME',
                        passwordVariable: 'DOCKERHUB_PASSWORD'
                    )
                ]) {
                    sh '''
                        echo "$DOCKERHUB_PASSWORD" | docker login \
                            --username "$DOCKERHUB_USERNAME" \
                            --password-stdin
                        '''
                    }
            }
        }
        
        stage('Push Images') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKERHUB_USRNAME',
                        passwordVariable: 'DOCKERUHB_PASSWORD'
                    )
                ]) {
                   sh '''
                        docker compose push
                    '''
                }

                }
        }

        stage('Deploy on aws-ec2 server in kubernetes') {
            steps {
                withCredentials([
                    sshUserPrivateKey(
                        credentialsId: 'aws-server-cerdentials',
                        keyFileVariable: 'SSH_KEY',
                        usernameVariable: 'SSH_USER'
                    ),
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKERHUB_USERNAME',
                        passwordVariable: 'DOCKERHUB_PASSWORD'
                    )

                ]) {
                    sh '''
                        set -e
                        echo "Copying Kubernetes manifests to EC2"
                        scp -i "$SSH_KEY" \
                            -o StrictHostKeyChecking=no \
                            -r k8s/* \
                            "$SSH_USER@13.127.214.122:/home/ubuntu/k8s/"

                        echo "Deploying application to Kubernetes"
                        ssh -i "$SSH_KEY" \
                            -o StrictHostKeyChecking=no \
                            "$SSH_USER@13.127.214.122" \
                            "DOCKERHUB_USERNAME='$DOCKHUB_USERNAME' bash -s" < 'EOF' 
                            set -e

                            NAMESPACE="mehnaj-mart"
                            APP_IMAGE="$DOCKERHUB_USERNAME/mehnaj-mart:latest"
                            cd /home/ubuntu

                            echo "Checking Kubernetes connection..."
                            kubectl get nodes

                            echo "Applying namespace..."
                            kubectl apply -f k8s/namespace.yaml
                            echo "Applying kubernetes manifests"
                            kubectl apply -f k8s/ -R

                            echo "Confirming django deployment exists in $NAMESPACE..."
                            echo "Updating mehnaj-mart image..."
                            kubectl set image deploy/mehnaj-mart-deployment \
                            mehnaj-mart="$APP_IMAGE" \
                            --namespace="$NAMESPACE"

                            echo "Waiting for mehnaj-mart rollout..."
                            kubectl rollout status deployment/mehnaj-mart-deployment \
                            --namespace="$NAMESPACE" \
                            --timeout=180s


                            echo "Kubernetes deployment completed successfully"
                            echo "Pods:"
                            kubectl get pods --namespace="$NAMESPACE"
                            echo "Services:"
                            kubectl get services --namespace="$NAMESPACE"
EOF

                    '''
                }
        }
    }
}
    post {
        always {
            sh '''
                docker compose down -w || true
            '''
            }
        }

}   
