from dataclasses import dataclass
from datetime import datetime
import uuid

@dataclass
class ScanRecord:
    id: str
    target: str
    tool: str
    summary: dict
    created_at: datetime

def make_scan_record(target: str, tool: str, summary: dict) -> ScanRecord:
    return ScanRecord(id=str(uuid.uuid4()), target=target, tool=tool, summary=summary, created_at=datetime.utcnow())
