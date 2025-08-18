from dotenv import load_dotenv
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
load_dotenv(dotenv_path=ROOT / ".env")

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "change-me")
    DEBUG = os.getenv("DEBUG", "False").lower() in ("1", "true", "yes")
    PORT = int(os.getenv("PORT", "5000"))
    DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite:///{ROOT / 'sentinelx.db'}")
    SQLALCHEMY_DATABASE_URI = DATABASE_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    NMAP_PATH = os.getenv("NMAP_PATH", "/usr/bin/nmap")
    ENABLE_NMAP = os.getenv("ENABLE_NMAP", "0") == "1"
    REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    # OpenVAS / WebScanner settings
    ENABLE_WEBSCANNER = os.getenv("ENABLE_WEBSCANNER", "1") == "1"
    OPENVAS_HOST = os.getenv("OPENVAS_HOST", "127.0.0.1")
    OPENVAS_PORT = int(os.getenv("OPENVAS_PORT", 9390))
    OPENVAS_USER = os.getenv("OPENVAS_USER", "admin")
    OPENVAS_PASSWORD = os.getenv("OPENVAS_PASSWORD", "password")


