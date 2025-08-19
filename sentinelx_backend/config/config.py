import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'default-secret-key')
    ENABLE_NMAP = int(os.getenv('ENABLE_NMAP', 0))
    ENABLE_CLAMAV = int(os.getenv('ENABLE_CLAMAV', 0))
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL", "sqlite:///sentinelx.db"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False