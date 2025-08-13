# SentinelX 🛡️

SentinelX is a modular cybersecurity scanning framework built with Python and Docker. It supports automated vulnerability scanning, link checking, image analysis, and AI-assisted security evaluations. The project is designed for scalability and easy integration of new tools.

## Features

- **Vulnerability Scanning:** Scan networks and applications for security weaknesses.
- **Link Checking:** Verify URLs for potential phishing or malicious content.
- **Image Analysis:** Detect unsafe or suspicious images using AI tools.
- **AI-assisted Tools:** Integrate machine learning models for smarter security decisions.
- **Task Management:** Schedule and run scans asynchronously.

## Project Structure

```diff
.  
├── app  
│   ├── __init__.py  
│   ├── models  
│   │   ├── __init__.py  
│   │   └── scan_result.py  
│   ├── routes  
│   │   ├── __init__.py  
│   │   └── scanner_routes.py  
│   ├── services  
│   │   ├── __init__.py  
│   │   └── scanner_service.py  
│   └── tasks  
│       ├── __init__.py  
│       └── scan_tasks.py  
├── deploy  
│   └── docker-compose.yml  
├── libs  
│   └── tools  
│       ├── base.py  
│       ├── image_analysis  
│       │   ├── dummy_image_checker.py  
│       │   └── __init__.py  
│       ├── __init__.py  
│       ├── link_check  
│       │   ├── dummy_link_checker.py  
│       │   └── __init__.py  
│       ├── ml_ai  
│       │   ├── dummy_ai_tool.py  
│       │   └── __init__.py  
│       ├── registry.py  
│       └── vulnerability  
│           ├── dummy_scanner.py  
│           └── __init__.py  
├── README.md  
├── requirements.txt  
└── tests  
    ├── __init__.py  
    └── test_scanners.py
```

---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/sentinelx.git
cd sentinelx

# 2. Create and activate a virtual environment
python3 -m venv .venv
source .venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Start the application using Docker
cd deploy
docker-compose up -d
```
---

## Usage

- **API Routes:** Access scanning endpoints via `app/routes/scanner_routes.py`.
- **Services:** Core scan logic is in `app/services/scanner_service.py`.
- **Tasks:** Asynchronous tasks are in `app/tasks/scan_tasks.py`.
- **Adding Tools:** New scanning modules can be added to `libs/tools/` subfolders.

---

## 1. Fork the repository
````bash
# 2. Create a new branch
git checkout -b feature-name

# 3. Make changes and commit
git commit -m "Description"

# 4. Push to your branch
git push origin feature-name

# 5. Open a pull request
