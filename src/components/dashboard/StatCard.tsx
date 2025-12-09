import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
}

const StatCard = ({ icon: Icon, label, value, change, positive }: StatCardProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        {change && (
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
          )}>
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold mb-1">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

export default StatCard;
