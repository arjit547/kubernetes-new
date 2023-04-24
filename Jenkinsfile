pipeline {
    agent any
    environment {
        AWS_DEFAULT_REGION = 'us-east-1'
        ECR_REPO = 'seasiam'
        KUBECONFIG_ID = 'my-kubeconfig'
    }
    stages {
        stage('Build Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'ecr-creds', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                    sh '''
                     aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 435770184212.dkr.ecr.us-east-1.amazonaws.com
                     docker build -t seasiam .
                     docker tag seasiam 435770184212.dkr.ecr.us-east-1.amazonaws.com/seasiam
                     docker push 435770184212.dkr.ecr.us-east-1.amazonaws.com/seasiam
                    '''
                }
            }
        }
        stage('Deploy to EKS') {
            steps {
                withAWS(credentials: 'my-aws-secret') {
                    withCredentials([file(credentialsId: "${KUBECONFIG_ID}", variable: 'KUBECONFIG')]) {
                        sh "kubectl apply -f GameApp.yaml"
                        sh "kubectl apply -f service-account.yaml"
                        sh "kubectl apply -f Ingress.yaml"
                    }
                }
            }
        }
    }
}
