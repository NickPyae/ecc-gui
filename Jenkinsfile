def props = [:]
node {
    checkout scm 
    props = readProperties(file: "${env.WORKSPACE}/Jenkinsfile.properties")  // variables set in properties file
}

pipeline {
    agent { 
        label "agent1" 
    }

    options {
        skipDefaultCheckout()
    }

    environment { 
            GIT_BRANCH = "${env.BRANCH_NAME.startsWith('PR') ? CHANGE_BRANCH : BRANCH_NAME}" //  if build is from a PR, CHANGE_BRANCH will reflect the intended branch name
            BRANCH_TAG = "${GIT_BRANCH.split("/").size() > 1 ? GIT_BRANCH.split("/")[1] : GIT_BRANCH}" // remove branch type
            DOCKER_TAG = "${props["artifactory"]}/${props["project"]}/${props["image.name"]}/${env.BRANCH_TAG.toLowerCase()}"
            BUILD_VERSION = "${props["image.tag"]}.${env.BUILD_NUMBER}"
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'main') {
                        docker.build("${env.DOCKER_TAG}:${env.BUILD_VERSION}", "-t ${env.DOCKER_TAG}:latest .")
                    } else {
                        docker.build("${env.DOCKER_TAG}:latest", ".")
                    }
                }
            }
        }
        stage('Artifactory - Push tag: latest') {
            steps {
                rtDockerPush (
                    serverId: "${props["artifactory.jenkinsId"]}",
                    image: "${env.DOCKER_TAG}:latest",
                    targetRepo: "${props["artifactory.targetRepo"]}"
                )
            }
        }
        stage(' Artifactory - Push tag: buildNo.') {
            when {
                branch 'main'
            }
            steps {
                rtDockerPush (
                    serverId: "${props["artifactory.jenkinsId"]}",
                    image: "${env.DOCKER_TAG}:${env.BUILD_VERSION}",
                    targetRepo: "${props["artifactory.targetRepo"]}"
                )
            }
        }
        stage('Artifactory - Publish Build Info') {
            steps {
                rtPublishBuildInfo (
                    serverId: "${props["artifactory.jenkinsId"]}"
                    )
            }
        }
    }
    post {
        always {
            mail to: 'adelyn.lim@dell.com',
                subject: "Pipeline: ${currentBuild.fullDisplayName}",
                body: "Job ${currentBuild.fullDisplayName} has completed with status ${currentBuild.result}. To view the job: ${env.BUILD_URL}"
        }
        cleanup {
            deleteDir()
        }
    }
}
