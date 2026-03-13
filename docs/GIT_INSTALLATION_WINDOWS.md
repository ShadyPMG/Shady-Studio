# Git Installation and Setup Guide for Windows

This guide will help you install Git on Windows and set up your repository for pushing code and images.

## Part 1: Installing Git on Windows

### Step 1: Download Git
1. Open your web browser and go to: https://git-scm.com/download/win
2. The download should start automatically. If not, click the download button.
3. The file will be named something like `Git-2.x.x-64-bit.exe`

### Step 2: Install Git
1. **Run the installer**: Double-click the downloaded `.exe` file
2. **Security prompt**: If Windows asks for permission, click "Yes"
3. **License agreement**: Read and click "Next"
4. **Installation location**: Keep the default location or choose your own, then click "Next"
5. **Component selection**: 
   - Keep all default options checked
   - Make sure "Git Bash Here" and "Git GUI Here" are selected
   - Click "Next"
6. **Default editor**: Choose your preferred editor (Notepad++ is a good option if you have it, otherwise keep Notepad)
7. **PATH environment**: 
   - **Recommended**: Select "Git from the command line and also from 3rd-party software"
   - This allows you to use Git from Command Prompt, PowerShell, and Git Bash
   - Click "Next"
8. **HTTPS transport**: Keep "Use the OpenSSL library" selected, click "Next"
9. **Line ending conversions**: 
   - **Recommended**: Select "Checkout Windows-style, commit Unix-style line endings"
   - Click "Next"
10. **Terminal emulator**: 
    - **Recommended**: Select "Use Windows' default console window"
    - Click "Next"
11. **Default behavior**: 
    - Keep "Default (fast-forward or merge)" selected
    - Click "Next"
12. **Extra options**: Keep defaults, click "Install"
13. **Installation progress**: Wait for installation to complete
14. **Finish**: Click "Finish" to complete installation

### Step 3: Verify Installation
1. Open **Command Prompt** (Press `Win + R`, type `cmd`, press Enter) or **PowerShell**
2. Type: `git --version`
3. You should see something like: `git version 2.x.x.windows.x`
4. If you see an error, make sure Git was added to your PATH (restart your terminal or computer if needed)

## Part 2: Configure Git (First Time Setup)

Before using Git, you need to configure your name and email:

1. Open **Command Prompt** or **PowerShell**
2. Set your name:
   ```
   git config --global user.name "Your Name"
   ```
   (Replace "Your Name" with your actual name)

3. Set your email:
   ```
   git config --global user.email "your.email@example.com"
   ```
   (Replace with your actual email - use the email associated with your GitHub/GitLab account)

4. Verify your settings:
   ```
   git config --global --list
   ```

## Part 3: Clone a Repository

### Option A: Clone via HTTPS (Easiest)

1. **Get the repository URL**:
   - Go to your repository on GitHub/GitLab/Bitbucket
   - Click the green "Code" button (or "Clone" button)
   - Copy the HTTPS URL (e.g., `https://github.com/username/repository-name.git`)

2. **Open Command Prompt or PowerShell**:
   - Navigate to where you want to clone the repository:
     ```
     cd C:\Users\YourUsername\Documents
     ```
     (Or any folder where you want the project)

3. **Clone the repository**:
   ```
   git clone https://github.com/username/repository-name.git
   ```

4. **Navigate into the cloned folder**:
   ```
   cd repository-name
   ```

## Part 4: Pushing Code and Images to the Repository

### Basic Workflow

1. **Check your current status**:
   ```
   git status
   ```
   This shows which files have been modified, added, or deleted.

2. **Add files to staging**:
   
   To add all files (including images):
   ```
   git add .
   ```
   
   Or add specific files:
   ```
   git add file1.html file2.css image1.jpg image2.png
   ```
   
   Or add all images in a folder:
   ```
   git add images/*.jpg images/*.png
   ```

3. **Commit your changes**:
   ```
   git commit -m "Add new images and update code"
   ```
   (Replace the message with a description of your changes)

4. **Push to the remote repository**:
   ```
   git push origin main
   ```
   (If your default branch is `master`, use `git push origin master` instead)

### Handling Large Images

If you have large image files:

1. **Check file sizes**:
   ```
   git add .
   git status
   ```


### Common Commands Reference

```bash
# Check status
git status

# Add all files
git add .

# Add specific file
git add filename.jpg

# Commit changes
git commit -m "Your commit message"

# Push to remote
git push origin main

# Pull latest changes
git pull origin main

# View commit history
git log

# Create a new branch
git checkout -b new-branch-name

# Switch branches
git checkout branch-name

# View all branches
git branch
```

## Troubleshooting

### Authentication Issues

If you get authentication errors when pushing:

1. **For HTTPS**: You may need to use a Personal Access Token instead of password
   - GitHub: Settings → Developer settings → Personal access tokens → Generate new token
   - Use the token as your password when prompted

2. **For SSH**: Make sure your SSH key is added to your Git hosting service

### "Repository not found" Error

- Check that you have access to the repository
- Verify the repository URL is correct
- Make sure you're authenticated

### Large File Warnings

- If files are too large, use Git LFS or compress them
- Remove large files from Git history if accidentally committed:
  ```
  git rm --cached large-file.jpg
  git commit -m "Remove large file"
  ```

## Next Steps

- Learn about branching: `git checkout -b feature-branch`
- Learn about pull requests (on GitHub/GitLab web interface)
- Set up `.gitignore` to exclude files you don't want to track
- Learn about Git workflows (feature branches, etc.)

## Quick Start Checklist

- [ ] Git installed and verified (`git --version`)
- [ ] Git configured with name and email
- [ ] Repository cloned locally
- [ ] Files added (`git add .`)
- [ ] Changes committed (`git commit -m "message"`)
- [ ] Changes pushed (`git push origin main`)

---

**Need Help?** 
- Git documentation: https://git-scm.com/doc
- GitHub Help: https://docs.github.com
- GitLab Help: https://docs.gitlab.com
