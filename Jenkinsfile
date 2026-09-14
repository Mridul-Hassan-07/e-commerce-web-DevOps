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
							usernameVariable: 'DOCKERHUBU_USERNAME',
							passwordVariable: 'DOCKERHUB_PASSWORD',
						),

						file(
						credentialsId: 'e-commerce-web-env',
						variable: 'ENV_FILE'
						)
				]) {
						sh '''
							cp "$ENV_FILE" .env
							docker compose up -d
						'''
				}





	}
}
