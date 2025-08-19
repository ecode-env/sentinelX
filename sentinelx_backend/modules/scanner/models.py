from dataclasses import dataclass
from typing import List

@dataclass
class Finding:
    id: str
    title: str
    severity: str
    description: str
    evidence: dict

@dataclass
class ToolResult:
    tool: str
    target: str
    ok: bool
    severity: str
    summary: str
    findings: List[Finding]
    raw: dict = None