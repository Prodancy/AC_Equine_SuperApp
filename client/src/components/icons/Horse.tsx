import { LucideProps } from "lucide-react";

interface HorseProps extends LucideProps {
  activePart?: string;
}

export const Horse = ({ activePart, ...props }: HorseProps) => {
  const parts = [
    { id: "neck", d: "M100,60 Q120,40 140,60 T160,100", label: "Neck" },
    { id: "back-left", d: "M160,100 Q200,80 240,100", label: "Back Left" },
    { id: "back-right", d: "M160,110 Q200,90 240,110", label: "Back Right" },
    { id: "leg-front-left", d: "M100,160 L100,240", label: "Front Leg Left" },
    { id: "leg-front-right", d: "M120,160 L120,240", label: "Front Leg Right" },
    { id: "hoof-front-left", d: "M90,240 L110,240", label: "Hoof Front Left" },
  ];

  return (
    <svg 
      viewBox="0 0 256 256" 
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Base Horse Shape - Simplified for anatomical hotspots */}
      <path d="M40,160 Q60,140 100,160 T160,160 T220,140" strokeOpacity="0.2" />
      <path d="M100,160 L80,100 L120,40 L160,100 L160,160" strokeOpacity="0.2" />
      
      {/* Hotspots */}
      {parts.map((part) => (
        <g key={part.id}>
          <path 
            d={part.d} 
            stroke={activePart === part.id ? "#FF8A00" : "currentColor"}
            strokeWidth={activePart === part.id ? "4" : "2"}
            strokeOpacity={activePart === part.id ? "1" : "0.2"}
            className="transition-all duration-300"
          />
          {activePart === part.id && (
            <circle 
              cx={part.d.split(/[MLQ ]/)[1]} 
              cy={part.d.split(/[MLQ ]/)[2]} 
              r="4" 
              fill="#FF8A00"
              className="animate-pulse"
            />
          )}
        </g>
      ))}
    </svg>
  );
};
