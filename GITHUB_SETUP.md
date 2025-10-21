# GitHub Setup Guide 🚀

Your AnimeBoxd project is now ready to be uploaded to GitHub!

## Quick Start - Push to GitHub

### Option 1: Create New Repository on GitHub (Recommended)

1. **Go to GitHub and create a new repository:**
   - Visit: https://github.com/new
   - Repository name: `animeboxd`
   - Description: `A full-stack anime tracking application`
   - Choose: Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
   - Click "Create repository"

2. **Push your local repository to GitHub:**
   ```bash
   cd /Users/av/animeboxd
   git remote add origin https://github.com/YOUR_USERNAME/animeboxd.git
   git branch -M main
   git push -u origin main
   ```

   Replace `YOUR_USERNAME` with your actual GitHub username.

### Option 2: Using GitHub CLI (gh)

If you have GitHub CLI installed:

```bash
cd /Users/av/animeboxd
gh repo create animeboxd --public --source=. --remote=origin --push
```

Or for a private repository:
```bash
gh repo create animeboxd --private --source=. --remote=origin --push
```

---

## What's Been Set Up

✅ Git repository initialized
✅ All files committed (49 files)
✅ `.gitignore` configured to exclude:
   - `node_modules/`
   - `.env` files
   - Build outputs
   - OS-specific files
   - AWS deployment files

---

## Before Pushing - Important Notes

### 1. Environment Variables
Make sure you have NOT committed any `.env` files with sensitive data. They should be ignored by `.gitignore`.

### 2. Update README.md
Replace placeholders in `README.md`:
- Replace `YOUR_USERNAME` with your GitHub username
- Update author information
- Add your actual repository URL

### 3. Create Environment Files Locally
After cloning on a new machine, create these files:

**Server `.env`:**
```bash
cd server
nano .env
```
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=9000
NODE_ENV=development
```

**Client `.env`:**
```bash
cd client
nano .env
```
```env
VITE_API_URL=http://localhost:9000/api
```

---

## After Pushing to GitHub

### 1. Update README with Your Info

Edit the README.md file and replace:
```markdown
git clone https://github.com/YOUR_USERNAME/animeboxd.git
```
with your actual repository URL.

### 2. Set Up GitHub Actions (Optional)

If you want automatic deployments:

1. Go to your repository on GitHub
2. Navigate to: **Settings** > **Secrets and variables** > **Actions**
3. Add these secrets:
   - `EC2_SSH_KEY`: Your EC2 private key (.pem file contents)
   - `EC2_HOST`: Your EC2 public DNS or IP
   - `EC2_USERNAME`: SSH username (e.g., `ubuntu`)

Now, every push to `main` will automatically deploy to your EC2 instance!

### 3. Add a License (Optional)

```bash
cd /Users/av/animeboxd
```

Create a `LICENSE` file. For MIT License:
```bash
cat > LICENSE << 'EOF'
MIT License

Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy...
EOF

git add LICENSE
git commit -m "Add MIT License"
git push
```

### 4. Add Repository Topics

On GitHub, add relevant topics to make your repo discoverable:
- `react`
- `nodejs`
- `express`
- `mongodb`
- `anime`
- `fullstack`
- `tailwindcss`
- `aws`

---

## Common Git Commands

### Check Repository Status
```bash
git status
```

### Make Changes and Commit
```bash
git add .
git commit -m "Your commit message"
git push
```

### Pull Latest Changes
```bash
git pull
```

### View Commit History
```bash
git log --oneline
```

### Create a New Branch
```bash
git checkout -b feature/your-feature-name
git push -u origin feature/your-feature-name
```

---

## Troubleshooting

### Authentication Issues

If you get authentication errors, you need to use a Personal Access Token:

1. Go to: https://github.com/settings/tokens
2. Generate new token (classic)
3. Select scopes: `repo` (full control)
4. Copy the token
5. When prompted for password, use the token instead

### Already Exists Error

If the repository already exists on GitHub:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/animeboxd.git
git push -u origin main
```

### Large Files Error

If you accidentally committed large files:
```bash
# Add to .gitignore
echo "large-file-or-directory" >> .gitignore

# Remove from git
git rm -r --cached large-file-or-directory
git commit -m "Remove large files"
git push
```

---

## Next Steps After GitHub Upload

1. ✅ **Repository is on GitHub**
2. 📖 Read `DEPLOYMENT.md` for AWS deployment instructions
3. 🚀 Deploy to AWS (see detailed guide in DEPLOYMENT.md)
4. 🔒 Set up SSL certificates with Let's Encrypt
5. 🌐 Configure custom domain (optional)
6. 📊 Set up monitoring and logging
7. 🔄 Enable GitHub Actions for CI/CD

---

## Useful Links

- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **AWS Console**: https://console.aws.amazon.com/
- **Let's Encrypt**: https://letsencrypt.org/
- **PM2 Documentation**: https://pm2.keymetrics.io/
- **Nginx Documentation**: https://nginx.org/en/docs/

---

## Repository Structure

```
animeboxd/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── client/                     # React frontend
│   ├── Dockerfile             # Frontend Docker image
│   ├── nginx.conf             # Nginx config for Docker
│   └── src/                   # React source code
├── server/                     # Express backend
│   ├── Dockerfile             # Backend Docker image
│   ├── ecosystem.config.js    # PM2 configuration
│   └── src/                   # Express source code
├── .gitignore                 # Git ignore rules
├── docker-compose.yml         # Docker Compose config
├── nginx.conf                 # Production Nginx config
├── README.md                  # Project documentation
├── DEPLOYMENT.md              # AWS deployment guide
└── GITHUB_SETUP.md           # This file

```

---

## Support

If you encounter any issues:
1. Check the documentation in README.md
2. Review DEPLOYMENT.md for AWS-specific issues
3. Check git status and logs
4. Ensure all environment variables are set correctly

Good luck with your project! 🎉

