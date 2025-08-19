from flask import Blueprint
from .routes import run_scan

scanner_bp = Blueprint('scanner', __name__)

from .routes import *