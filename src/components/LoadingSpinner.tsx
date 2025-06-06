interface LoadingSpinnerProps {
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const LoadingSpinner = ({
  title = "Laden...",
  description,
  size = "md",
  className = "",
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-8 w-8 border-b-2",
    md: "h-12 w-12 border-b-3",
    lg: "h-16 w-16 border-b-4",
  };

  const titleSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={`text-center py-8 ${className}`}>
      <div
        className={`animate-spin rounded-full border-[#a5673f] mx-auto mb-4 ${sizeClasses[size]}`}
      ></div>
      <h2 className={`font-bold text-[#5a3d2b] mb-2 ${titleSizes[size]}`}>
        {title}
      </h2>
      {description && (
        <p className="text-[#5a3d2b]/70 text-sm">{description}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
