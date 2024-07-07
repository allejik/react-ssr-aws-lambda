#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SandboxStack } from '../lib/sandbox-stack';

const app = new cdk.App();
new SandboxStack(app, 'SandboxStack', {
    env: { account: '781761675292', region: 'eu-central-1' }
});