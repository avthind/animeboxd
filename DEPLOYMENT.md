# AWS Deployment Guide for AnimeBoxd 🚀

This guide covers multiple deployment options for your AnimeBoxd application on AWS.

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Option 1: EC2 Deployment (Recommended)](#option-1-ec2-deployment-recommended)
3. [Option 2: Elastic Beanstalk](#option-2-elastic-beanstalk)
4. [Option 3: S3 + CloudFront (Frontend) + EC2 (Backend)](#option-3-s3--cloudfront-frontend--ec2-backend)
5. [Database Setup](#database-setup)
6. [Environment Variables](#environment-variables)
7. [Post-Deployment](#post-deployment)

---

## Prerequisites

- AWS Account with appropriate permissions
- AWS CLI installed and configured
- Git installed
- Node.js and npm installed locally
- MongoDB Atlas account (recommended) or AWS DocumentDB

### Install AWS CLI
```bash
# macOS
brew install awscli

# Configure AWS CLI
aws configure
```

---

## Option 1: EC2 Deployment (Recommended)

This option deploys both frontend and backend on an EC2 instance with Nginx as a reverse proxy.

### Step 1: Launch EC2 Instance

1. Go to AWS EC2 Console
2. Click "Launch Instance"
3. Configure:
   - **Name**: `animeboxd-server`
   - **AMI**: Ubuntu Server 22.04 LTS
   - **Instance Type**: t2.micro (free tier) or t2.small
   - **Key Pair**: Create new or select existing
   - **Security Group**: Configure:
     - SSH (22) - Your IP
     - HTTP (80) - Anywhere
     - HTTPS (443) - Anywhere
     - Custom TCP (9000) - Anywhere (for API)

### Step 2: Connect to EC2 Instance

```bash
chmod 400 your-key.pem
ssh -i "your-key.pem" ubuntu@your-ec2-public-dns
```

### Step 3: Install Dependencies on EC2

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install Nginx
sudo apt install -y nginx

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install Git
sudo apt install -y git
```

### Step 4: Deploy Backend

```bash
# Clone repository
cd /home/ubuntu
git clone https://github.com/YOUR_USERNAME/animeboxd.git
cd animeboxd/server

# Install dependencies
npm install

# Create .env file
nano .env
```

Add the following to `.env`:
```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_strong_jwt_secret
PORT=9000
NODE_ENV=production
```

```bash
# Start backend with PM2
pm2 start src/server.js --name animeboxd-api
pm2 save
pm2 startup
```

### Step 5: Build and Deploy Frontend

```bash
cd /home/ubuntu/animeboxd/client

# Create .env file
nano .env
```

Add the following to `.env`:
```env
VITE_API_URL=http://your-ec2-public-dns:9000/api
```

```bash
# Install dependencies and build
npm install
npm run build

# Move build to Nginx directory
sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html/
```

### Step 6: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/default
```

Replace content with:
```nginx
server {
    listen 80;
    server_name your-domain.com;  # or your EC2 public DNS

    # Frontend
    location / {
        root /var/www/html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:9000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Test and restart Nginx
sudo nginx -t
sudo systemctl restart nginx
```

### Step 7: Set Up SSL (Optional but Recommended)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate (requires domain name)
sudo certbot --nginx -d your-domain.com
```

---

## Option 2: Elastic Beanstalk

### Step 1: Install EB CLI

```bash
pip install awsebcli --upgrade --user
```

### Step 2: Initialize Elastic Beanstalk (Backend)

```bash
cd server
eb init -p node.js animeboxd-api --region us-east-1
```

### Step 3: Create Environment and Deploy

```bash
# Create environment
eb create animeboxd-api-env

# Set environment variables
eb setenv MONGO_URI=your_mongodb_uri JWT_SECRET=your_secret NODE_ENV=production

# Deploy
eb deploy
```

### Step 4: Deploy Frontend to S3

```bash
cd ../client

# Update .env with EB backend URL
echo "VITE_API_URL=http://your-eb-url.elasticbeanstalk.com/api" > .env

# Build
npm run build

# Deploy to S3 (see Option 3 for S3 setup)
```

---

## Option 3: S3 + CloudFront (Frontend) + EC2 (Backend)

### Backend on EC2
Follow Steps 1-4 from Option 1 for backend deployment.

### Frontend on S3 + CloudFront

#### Step 1: Build Frontend

```bash
cd client

# Update .env with backend URL
echo "VITE_API_URL=http://your-backend-url/api" > .env

# Build
npm run build
```

#### Step 2: Create S3 Bucket

```bash
# Create bucket
aws s3 mb s3://animeboxd-frontend

# Enable static website hosting
aws s3 website s3://animeboxd-frontend --index-document index.html --error-document index.html

# Upload build files
aws s3 sync dist/ s3://animeboxd-frontend --delete

# Set bucket policy (make it public)
aws s3api put-bucket-policy --bucket animeboxd-frontend --policy '{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::animeboxd-frontend/*"
  }]
}'
```

#### Step 3: Set Up CloudFront (Optional but Recommended)

1. Go to CloudFront Console
2. Create Distribution:
   - **Origin Domain**: Select your S3 bucket
   - **Viewer Protocol Policy**: Redirect HTTP to HTTPS
   - **Default Root Object**: index.html
3. Create Custom Error Response:
   - **HTTP Error Code**: 403, 404
   - **Response Page Path**: /index.html
   - **HTTP Response Code**: 200

---

## Database Setup

### Option A: MongoDB Atlas (Recommended - Free Tier Available)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for testing)
5. Get connection string
6. Use in `MONGO_URI` environment variable

### Option B: AWS DocumentDB

1. Go to AWS DocumentDB Console
2. Create cluster
3. Configure security groups
4. Get connection string
5. Use in `MONGO_URI` environment variable

---

## Environment Variables

### Backend (.env)
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/animeboxd
JWT_SECRET=your_very_secure_random_string_here
PORT=9000
NODE_ENV=production
```

### Frontend (.env)
```env
# For EC2/Nginx setup
VITE_API_URL=http://your-ec2-public-dns/api

# For S3 + separate backend
VITE_API_URL=http://your-backend-url:9000/api

# With domain and SSL
VITE_API_URL=https://api.yourdomain.com/api
```

---

## Post-Deployment

### Monitor Backend with PM2

```bash
# View logs
pm2 logs animeboxd-api

# Monitor
pm2 monit

# Restart
pm2 restart animeboxd-api
```

### Update Application

```bash
# On EC2
cd /home/ubuntu/animeboxd
git pull

# Update backend
cd server
npm install
pm2 restart animeboxd-api

# Update frontend
cd ../client
npm install
npm run build
sudo cp -r dist/* /var/www/html/
```

### Set Up Continuous Deployment (Optional)

Use GitHub Actions to automate deployments:

```yaml
# .github/workflows/deploy.yml
name: Deploy to AWS

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to EC2
        env:
          PRIVATE_KEY: ${{ secrets.EC2_SSH_KEY }}
          HOST: ${{ secrets.EC2_HOST }}
        run: |
          echo "$PRIVATE_KEY" > private_key && chmod 600 private_key
          ssh -i private_key ubuntu@$HOST '
            cd /home/ubuntu/animeboxd &&
            git pull &&
            cd server && npm install && pm2 restart animeboxd-api &&
            cd ../client && npm install && npm run build && sudo cp -r dist/* /var/www/html/
          '
```

---

## Cost Estimation

### Minimal Setup (Free Tier Eligible)
- EC2 t2.micro: Free tier (first 12 months)
- MongoDB Atlas: Free tier (512MB)
- **Total**: $0/month (first year)

### Production Setup
- EC2 t2.small: ~$17/month
- MongoDB Atlas M10: ~$57/month
- CloudFront: ~$1/month (50GB)
- **Total**: ~$75/month

---

## Troubleshooting

### Backend Not Starting
```bash
# Check logs
pm2 logs animeboxd-api

# Check if port is in use
sudo lsof -i :9000

# Restart
pm2 restart animeboxd-api
```

### Frontend Not Loading
```bash
# Check Nginx status
sudo systemctl status nginx

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Rebuild frontend
cd /home/ubuntu/animeboxd/client
npm run build
sudo cp -r dist/* /var/www/html/
```

### Database Connection Issues
- Check MongoDB Atlas IP whitelist
- Verify connection string in `.env`
- Check security groups on AWS

### CORS Issues
- Ensure backend CORS is configured correctly
- Check that `VITE_API_URL` matches your backend URL
- Verify Nginx proxy configuration

---

## Security Best Practices

1. **Use HTTPS**: Set up SSL certificates with Let's Encrypt
2. **Restrict Security Groups**: Only allow necessary ports
3. **Use Strong Secrets**: Generate strong JWT_SECRET
4. **Keep Dependencies Updated**: Regularly update npm packages
5. **Enable Logging**: Set up CloudWatch for monitoring
6. **Regular Backups**: Configure MongoDB Atlas backups
7. **Use IAM Roles**: Instead of hardcoding AWS credentials

---

## Support

For issues or questions:
- Check logs with `pm2 logs`
- Review AWS CloudWatch logs
- Check Nginx error logs: `/var/log/nginx/error.log`

## Next Steps

- Set up a custom domain
- Configure SSL/TLS
- Set up monitoring and alerts
- Implement CI/CD pipeline
- Configure automatic backups
- Set up staging environment

