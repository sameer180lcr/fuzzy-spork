import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

interface JobCardProps {
  title: string;
  department: string;
  type: string;
  location: string;
  applicants: number;
  daysOpen: number;
  status: "active" | "paused" | "closed";
}

const statusStyles = {
  active: "bg-emerald-50 text-emerald-600 border-emerald-200",
  paused: "bg-amber-50 text-amber-600 border-amber-200",
  closed: "bg-secondary text-muted-foreground border-border",
};

const JobCard = ({
  title,
  department,
  type,
  location,
  applicants,
  daysOpen,
  status,
}: JobCardProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/20 hover:shadow-medium transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{department}</p>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <Badge variant="secondary" className="font-normal">{type}</Badge>
        <Badge variant="secondary" className="font-normal">{location}</Badge>
        <Badge className={`font-normal border ${statusStyles[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            {applicants} applicants
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {daysOpen}d open
          </div>
        </div>
        <Button size="sm" variant="outline" asChild>
          <Link to="/dashboard/candidates">View</Link>
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
