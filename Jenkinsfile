pipeline {
    agent any

    environment {
        IMAGE_NAME = 'task2-jenkins-app'
        CONTAINER_NAME = 'task2-jenkins-app'
        APP_PORT = '3000'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code from GitHub...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                echo 'Running automated Jest tests...'
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} -t ${IMAGE_NAME}:latest .'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application container...'

                sh '''
                    docker rm -f ${CONTAINER_NAME} || true

                    docker run -d \
                      --name ${CONTAINER_NAME} \
                      -p ${APP_PORT}:3000 \
                      --restart unless-stopped \
                      ${IMAGE_NAME}:${BUILD_NUMBER}
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Waiting for application startup...'

                sh '''
                    sleep 5

                    docker ps --filter "name=${CONTAINER_NAME}"

                    docker exec ${CONTAINER_NAME} \
                      node -e "fetch('http://localhost:3000/api/health').then(async r => { const d = await r.json(); console.log(d); if (!r.ok || d.status !== 'UP') process.exit(1); }).catch(e => { console.error(e); process.exit(1); })"
                '''
            }
        }
    }

    post {
        success {
            echo 'CI/CD pipeline completed successfully.'
            echo 'Application deployed successfully on port 3000.'
        }

        failure {
            echo 'CI/CD pipeline failed. Review the Jenkins console output.'
        }

        always {
            echo "Jenkins Build #${BUILD_NUMBER} completed."
        }
    }
}