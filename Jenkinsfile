pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/omerjava/weather-angular-app.git'
                    // remove credentialsId if repo is public or fix credentials
            }
        }

        stage('Build Angular App') {
            agent {
                docker {
                    image 'node:24.0.2'
                    args '-u root'
                }
            }
            steps {
                sh 'npm install -g @angular/cli'
                sh 'npm install'
                sh 'ng build --configuration production'
            }
        }

        stage('Build Docker Image') {
            steps {
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
                    sh 'ssh -o StrictHostKeyChecking=no root@91.99.230.244 "docker pull omerjava/weather-angular-app && docker compose -f /path/to/docker-compose.prod.yml up -d"'
                }
            }
        }
    }
}
