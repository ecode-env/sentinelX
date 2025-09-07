import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const severityStyles = {
  INFO: "bg-severity-info/10 text-severity-info border-severity-info/20",
  LOW: "bg-severity-low/10 text-severity-low border-severity-low/20",
  MEDIUM: "bg-severity-medium/10 text-severity-medium border-severity-medium/20",
  HIGH: "bg-severity-high/10 text-severity-high border-severity-high/20",
  CRITICAL: "bg-severity-critical/10 text-severity-critical border-severity-critical/20"
};

interface SeverityBadgeProps {
  severity: keyof typeof severityStyles;
  className?: string;
}

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  return (
    <Badge 
      variant="outline" 
      className={cn(
        severityStyles[severity],
        "font-mono text-xs font-medium",
        className
      )}
    >
      {severity}
    </Badge>
  );
}