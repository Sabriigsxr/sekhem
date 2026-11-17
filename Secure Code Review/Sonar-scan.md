# SonarQube + Docker SonarScanner

Minimal setup and usage guide.

## 1. Run SonarQube

Pull image:

``` bash
sudo docker pull sonarqube:latest
```

Create persistent storage:

``` bash
sudo mkdir -p /opt/sonarqube/{data,logs,extensions}
sudo chown -R 1000:1000 /opt/sonarqube
```

Run SonarQube on port `8051`:

``` bash
sudo docker run -d \
  --name sonarqube \
  --restart unless-stopped \
  -p 8051:9000 \
  -v /opt/sonarqube/data:/opt/sonarqube/data \
  -v /opt/sonarqube/logs:/opt/sonarqube/logs \
  -v /opt/sonarqube/extensions:/opt/sonarqube/extensions \
  sonarqube:latest
```

Open:

``` text
http://192.168.66.154:8051
```

Check status:

``` bash
curl http://192.168.66.154:8051/api/system/status
```

Expected:

``` json
{"status":"UP"}
```

------------------------------------------------------------------------

## 2. Create Scanner Token

In SonarQube:

``` text
Profile → Security → Generate Tokens
```

Create a **Global Analysis Token**.

Use one token for multiple projects. Keep the token private.

------------------------------------------------------------------------

## 3. Pull SonarScanner Docker Image

``` bash
sudo docker pull sonarsource/sonar-scanner-cli:latest
```

No manual `sonar-scanner` installation is required.

------------------------------------------------------------------------

## 4. Scan a Project

Go to the project directory:

``` bash
cd /path/to/project
```

Run:

``` bash
sudo docker run --rm \
  --network host \
  -v "$(pwd):/usr/src" \
  sonarsource/sonar-scanner-cli:latest \
  -Dsonar.projectKey=PROJECT_KEY \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://192.168.66.154:8051 \
  -Dsonar.token="YOUR_TOKEN"
```

Example:

``` bash
cd ~/test/vulnApp/vuln-nodejs-app

sudo docker run --rm \
  --network host \
  -v "$(pwd):/usr/src" \
  sonarsource/sonar-scanner-cli:latest \
  -Dsonar.projectKey=NodeApp \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://192.168.66.154:8051 \
  -Dsonar.token="YOUR_TOKEN"
```

## 5. Future Projects

Use the **same command and token**. Only change:

``` bash
-Dsonar.projectKey=AnotherProject
```

Each unique `sonar.projectKey` represents a separate SonarQube project.

Example:

``` text
NodeApp
DVWA
ReactApp
BankingAPI
```

If the token's user has permission to create projects, new projects can
be created automatically on their first successful scan.

------------------------------------------------------------------------

## 6. Important

### No space after `=`

Correct:

``` bash
-Dsonar.projectKey=NodeApp
```

Incorrect:

``` bash
-Dsonar.projectKey= NodeApp
```

### Use the real URL

Correct:

``` bash
-Dsonar.host.url=http://192.168.66.154:8051
```

### Scanner working directory

The scanner may create:

``` text
.scannerwork/
```

Add it to `.gitignore` if required:

``` gitignore
.scannerwork/
```

------------------------------------------------------------------------


## Scan a Project from Any Directory

You do **not** have to `cd` into the project first. Mount the project path directly with `-v`.

### Linux

Example project:

```text
/home/hacker/projects/NodeApp
```

Run from any directory:

```bash
sudo docker run --rm \
  --network host \
  -v "/home/hacker/projects/NodeApp:/usr/src" \
  sonarsource/sonar-scanner-cli:latest \
  -Dsonar.projectKey=NodeApp \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://192.168.66.154:8051 \
  -Dsonar.token="YOUR_TOKEN"
```

### Windows PowerShell

Example project:

```text
C:\Users\hacker\projects\NodeApp
```

Run:

```powershell
docker run --rm `
  --network host `
  -v "C:\Users\hacker\projects\NodeApp:/usr/src" `
  sonarsource/sonar-scanner-cli:latest `
  -Dsonar.projectKey=NodeApp `
  -Dsonar.sources=. `
  -Dsonar.host.url=http://192.168.66.154:8051 `
  -Dsonar.token="YOUR_TOKEN"
```

If Docker Desktop does not allow access to the Windows drive, allow the drive/folder in Docker Desktop settings.

### Important

The path before `:/usr/src` is the **actual project directory**:

```text
/path/to/project:/usr/src
```

The scanner always analyzes `/usr/src` because:

```bash
-Dsonar.sources=.
```

So you can run the command from **any directory** as long as the project path is correct.

## Optional Convenience Scripts

### Linux — `sonarScan`

```bash
#!/usr/bin/env bash

SONAR_URL="http://192.168.66.154:8051"
SONAR_TOKEN=""

PROJECT_DIR="$(pwd)"
PROJECT_KEY="$(basename "$PROJECT_DIR")"

if [ -z "$SONAR_TOKEN" ]; then
    read -rsp "SonarQube token: " SONAR_TOKEN
    echo
fi

sudo docker run --rm \
  --network host \
  -v "$PROJECT_DIR:/usr/src" \
  sonarsource/sonar-scanner-cli:latest \
  -Dsonar.projectKey="$PROJECT_KEY" \
  -Dsonar.sources=. \
  -Dsonar.host.url="$SONAR_URL" \
  -Dsonar.token="$SONAR_TOKEN"
```

Install:

```bash
chmod +x sonarScan
sudo mv sonarScan /usr/local/bin/
```

Use from any project directory:

```bash
cd /path/to/project
sonarScan
```

Set `SONAR_TOKEN` in the script if you don't want to be prompted.

### Windows — `sonarScan.bat`

```bat
@echo off

set "SONAR_URL=http://192.168.66.154:8051"
set "SONAR_TOKEN="

for %%I in ("%CD%") do set "PROJECT_KEY=%%~nxI"

if "%SONAR_TOKEN%"=="" set /p "SONAR_TOKEN=SonarQube token: "

docker run --rm ^
  --network host ^
  -v "%CD%:/usr/src" ^
  sonarsource/sonar-scanner-cli:latest ^
  -Dsonar.projectKey=%PROJECT_KEY% ^
  -Dsonar.sources=. ^
  -Dsonar.host.url=%SONAR_URL% ^
  -Dsonar.token=%SONAR_TOKEN%
```

Put `sonarScan.bat` somewhere in your Windows `PATH`.

Use:

```bat
cd C:\path\to\project
sonarScan
```

The current folder name is used as the project key.

## Quick Template

``` bash
cd /path/to/project

sudo docker run --rm \
  --network host \
  -v "$(pwd):/usr/src" \
  sonarsource/sonar-scanner-cli:latest \
  -Dsonar.projectKey=PROJECT_KEY \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://192.168.66.154:8051 \
  -Dsonar.token="YOUR_TOKEN"
```
