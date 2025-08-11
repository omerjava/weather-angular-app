pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/omerjava/weather-angular-app.git',
                    credentialsId: 'github-creds'
            }
        }

        stage('Build Angular App & Docker Image') {
            agent {
                docker {
                    image 'node:24.0.2'
                    // To connect Docker client inside container to Docker Desktop on Windows:
                    args '-e DOCKER_HOST=tcp://host.docker.internal:2375'
                }
            }
            steps {
                // Install Angular CLI
                sh 'npm install -g @angular/cli'

                // Install dependencies
                sh 'npm install'

                // Build Angular app
                sh 'ng build --configuration production'

                // Build Docker image (Docker CLI must be installed in node:24.0.2 container or you provide it)
                sh 'docker build -t omerjava/weather-angular-app .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh 'docker push omerjava/weather-angular-app'
                }
            }
        }

        stage('Deploy to Hetzner') {
            steps {
                sshagent(['hetzner-ssh-key']) {
                    sh 'ssh -o StrictHostKeyChecking=no root@91.99.230.244 "docker pull omerjava/weather-angular-app && docker-compose -f /path/to/docker-compose.yml up -d"'
                }
            }
        }
    }
}