import { LucideIcon } from "lucide-react";

interface FeatureTagProps {
  icon: LucideIcon;
  text: string;
  className?: string;
}

const FeatureTag = ({ icon: Icon, text, className = "" }: FeatureTagProps) => {
  return (
    <span
      className={`px-4 py-2 bg-[#a5673f]/10 text-[#a5673f] rounded-full text-sm font-medium flex items-center gap-2 ${className}`}
    >
      <Icon size={16} />
      {text}
    </span>
  );
};

export default FeatureTag;
