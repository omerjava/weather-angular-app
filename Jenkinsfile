pipeline {
  agent any

  environment {
    IMAGE_NAME = 'yourdockerhub/weather-angular-app'
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/omerjava/weather-angular-app.git'
      }
    }

    stage('Build Angular App & Docker Image') {
      steps {
        sh 'npm install'
        sh 'npm run build -- --configuration=production'
        sh 'docker build -t $IMAGE_NAME .'
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
          sh 'docker push $IMAGE_NAME'
        }
      }
    }

    stage('Deploy to Hetzner') {
      steps {
        sshagent(['hetzner-ssh-key']) {
          sh '''
          ssh root@HETZNER_IP "docker pull $IMAGE_NAME && \
          docker-compose -f /opt/weather/docker-compose.prod.yml up -d"
          '''
        }
      }
    }
  }
}
