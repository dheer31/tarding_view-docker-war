pipeline {
    agent any

    parameters {
        string(
            name: 'DOCKERHUB_USERNAME',
            defaultValue: 'dhee31',
            description: 'Docker Hub Username'
        )

        string(
            name: 'DOCKERHUB_REPO',
            defaultValue: 'webapp',
            description: 'Docker Hub Repository'
        )
    }

    environment {
        CONTAINER_NAME = "webapp-container"
        HOST_PORT = "8085"
        CONTAINER_PORT = "8080"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                    docker build -t ${params.DOCKERHUB_USERNAME}/${params.DOCKERHUB_REPO}:latest .
                """
            }
        }

        stage('Run Docker Container') {
            steps {
                sh """
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true

                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        -p ${HOST_PORT}:${CONTAINER_PORT} \
                        ${params.DOCKERHUB_USERNAME}/${params.DOCKERHUB_REPO}:latest
                """
            }
        }

        stage('Tag Docker Image') {
            steps {
                sh """
                    docker tag \
                    ${params.DOCKERHUB_USERNAME}/${params.DOCKERHUB_REPO}:latest \
                    ${params.DOCKERHUB_USERNAME}/${params.DOCKERHUB_REPO}:${BUILD_NUMBER}
                """
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                sh """
                    docker push ${params.DOCKERHUB_USERNAME}/${params.DOCKERHUB_REPO}:latest
                    docker push ${params.DOCKERHUB_USERNAME}/${params.DOCKERHUB_REPO}:${BUILD_NUMBER}
                """
            }
        }

        stage('Cleanup') {
            steps {
                sh """
                    docker rmi ${params.DOCKERHUB_USERNAME}/${params.DOCKERHUB_REPO}:latest || true
                    docker rmi ${params.DOCKERHUB_USERNAME}/${params.DOCKERHUB_REPO}:${BUILD_NUMBER} || true
                    docker image prune -f
                    docker logout
                """
            }
        }
    }

    post {
        success {
            echo "Docker image built, container started, and pushed successfully!"
        }

        failure {
            echo "Pipeline failed!"
        }

        always {
            cleanWs()
        }
    }
}
