@echo off
echo 🚀 生日惊喜网站 - GitHub 部署脚本
echo =====================================
echo.

REM 检查是否已经初始化Git
if not exist .git (
    echo 📦 初始化Git仓库...
    git init
    echo.
)

REM 添加所有文件
echo 📁 添加文件到Git...
git add .
echo.

REM 提交更改
echo 💾 提交更改...
set /p commit_message="请输入提交信息 (默认: Update birthday surprise website): "
if "%commit_message%"=="" set commit_message=Update birthday surprise website
git commit -m "%commit_message%"
echo.

REM 检查是否已经添加远程仓库
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo 🔗 请输入你的GitHub仓库地址:
    echo 格式: https://github.com/用户名/仓库名.git
    set /p repo_url="仓库地址: "
    git remote add origin %repo_url%
    echo.
)

REM 推送到GitHub
echo 🚀 推送到GitHub...
git push -u origin main
if errorlevel 1 (
    echo 尝试推送到master分支...
    git push -u origin master
)
echo.

echo ✅ 部署完成！
echo.
echo 📋 接下来的步骤:
echo 1. 访问你的GitHub仓库
echo 2. 进入 Settings ^> Pages
echo 3. 选择 "Deploy from a branch"
echo 4. 选择 "main" 分支
echo 5. 点击 Save
echo.
echo 🌐 几分钟后你的网站将在以下地址可用:
echo https://你的用户名.github.io/仓库名
echo.
pause
