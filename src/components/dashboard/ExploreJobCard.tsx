import { Bookmark, MapPin, Building2, Clock, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface ExploreJobCardProps {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    type: string;
    posted: string;
    logo?: string;
    tags: string[];
}

const ExploreJobCard = ({
    id,
    title,
    company,
    location,
    salary,
    type,
    posted,
    tags,
}: ExploreJobCardProps) => {
    const [isSaved, setIsSaved] = useState(false);

    return (
        <Link
            to={`/dashboard/jobs/${id}`}
            className="block bg-white border border-[#e5e5e5] rounded-2xl p-6 hover:shadow-lg hover:border-[#d2d2d7] transition-all duration-300 group"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#f5f5f7] flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-[#86868b]" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">{title}</h3>
                        <p className="text-sm text-[#86868b]">{company}</p>
                    </div>
                </div>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setIsSaved(!isSaved);
                    }}
                    className={`p-2 rounded-full transition-colors ${isSaved ? 'bg-[#0071e3]/10 text-[#0071e3]' : 'hover:bg-[#f5f5f7] text-[#86868b]'
                        }`}
                >
                    <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {tags.slice(0, 3).map((tag) => (
                    <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-[#f5f5f7] text-[#1d1d1f] text-xs font-medium"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex items-center gap-4 text-sm text-[#86868b] pt-4 border-t border-[#f5f5f7]">
                <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>{location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4" />
                    <span>{salary}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{posted}</span>
                </div>
            </div>
        </Link>
    );
};

export default ExploreJobCard;
