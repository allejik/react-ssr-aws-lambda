import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deployment from 'aws-cdk-lib/aws-s3-deployment';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as fs from 'fs';

export class SandboxStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        let frontendMainScriptName = 'NOT_FOUND.js';

        fs.readdirSync('../frontend/build/static/js').forEach(file => {
            if (file.startsWith('main.') && file.endsWith('.js')) {
                frontendMainScriptName = file;
            }
        });

        const reactSSRBucket = new s3.Bucket(this, 'ReactSSRBucket', {
            versioned: false,
            bucketName: 'react-ssr-97073615796',
            publicReadAccess: true,
            blockPublicAccess: {
                blockPublicPolicy: false,
                blockPublicAcls: false,
                ignorePublicAcls: false,
                restrictPublicBuckets: false,
            },
            removalPolicy: cdk.RemovalPolicy.DESTROY
        });

        new s3deployment.BucketDeployment(this, 'ReactSSRBucketDeployment', {
            sources: [s3deployment.Source.asset('../frontend/build/static')],
            destinationBucket: reactSSRBucket,
        });

        const reactSSRLambda = new lambda.Function(this, 'ReactSSRLambda', {
            functionName: 'ReactSSR',
            architecture: lambda.Architecture.ARM_64,
            runtime: lambda.Runtime.NODEJS_18_X,
            code: lambda.Code.fromAsset('../frontend/lambda-build'),
            handler: 'index.handler',
            environment: {
                FRONTEND_MAIN_SCRIPT_PATH: `https://${reactSSRBucket.bucketName}.s3.eu-central-1.amazonaws.com/js/${frontendMainScriptName}`
            }
        });

        const reactSSRApi = new apigateway.LambdaRestApi(this, 'ReactSSRApi', {
            handler: reactSSRLambda,
            proxy: false,
        });

        reactSSRApi.root.addMethod('GET');
    }
}
