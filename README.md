# SSR React via AWS Lambda
### Deployment steps
#### Step 1: Build frontend and lambda
```js
cd frontend && npm run build
```
#### Step 2: Change AWS account
Change AWS account in cdk/bin/sandbox.ts
#### Step 3: Deploy cdk
```js
cd cdk && cdk deploy
```
### Local development
```js
cd frontend && npm start
```