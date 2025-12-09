import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, ExternalLink } from "lucide-react";

interface CandidateCardProps {
  name: string;
  role: string;
  location: string;
  experience: string;
  skills: string[];
  matchScore: number;
  rating: number;
  avatar?: string;
}

const CandidateCard = ({
  name,
  role,
  location,
  experience,
  skills,
  matchScore,
  rating,
}: CandidateCardProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/20 hover:shadow-medium transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-sm font-semibold">
              {name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10">
          <span className="text-sm font-semibold text-primary">{matchScore}%</span>
          <span className="text-xs text-primary/70">match</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5" />
          {location}
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {experience}
        </div>
        <div className="flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          {rating.toFixed(1)}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-5">
        {skills.slice(0, 4).map((skill) => (
          <Badge key={skill} variant="secondary" className="font-normal">
            {skill}
          </Badge>
        ))}
        {skills.length > 4 && (
          <Badge variant="secondary" className="font-normal">
            +{skills.length - 4}
          </Badge>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        <Button size="sm" className="flex-1">
          View Profile
        </Button>
        <Button size="sm" variant="outline">
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default CandidateCard;
