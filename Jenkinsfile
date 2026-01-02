pipeline {
    agent any

    tools {
        nodejs 'NODE16'   
    }

    environment {
        CI = 'true'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh '''
                    node -v
                    npm -v
                    npm ci
                '''
            }
        }

        stage('Build') {
            steps {
                echo "Branch name: ${env.BRANCH_NAME}"

                sh 'npx ng build'

                sh '''
                    zip -r angular-dist-frontend-$BRANCH_NAME.zip dist/
                '''
                archiveArtifacts artifacts: "angular-dist-frontend-${env.BRANCH_NAME}.zip"
            }
        }

        stage('Upload onto Nexus') {
            steps {
                nexusArtifactUploader(
                nexusVersion: 'nexus3',
                protocol: 'http',
                nexusUrl: 'poc4k-central.ovng.dev.myovcloud.com:8081',
                version: "${env.BUILD_ID}-${env.BUILD_TIMESTAMP}-${env.BRANCH_NAME}",
                groupId: '',
                repository: 'frontend-angular-app',
                credentialsId: 'nexuslogin',
                artifacts: [
                    [artifactId: 'angularfrontend',
                     classifier: '',
                     file: "angular-dist-frontend-${env.BRANCH_NAME}.zip",
                     type: 'zip']
                    ]
                )
            }
        }
        // stage('Test') {
        //     steps {
        //         sh 'npx ng test'
        //     }
        // }
    }

    // testing push
}
