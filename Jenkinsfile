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
    }
}
