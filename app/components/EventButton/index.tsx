import Link from "next/link";
import { type ReactNode } from "react";

type EventButtonProps = {
    href: string;
    label: string;
    variant?: "default" | "maps";
    icon?: ReactNode;
    srSuffix?: string;
    className?: string;
};

const EventButton = ({
    href,
    label,
    variant = "default",
    icon,
    srSuffix,
    className = "",
}: EventButtonProps) => {
    const variantClass = variant === "maps" ? "event-button--maps" : "";

    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            prefetch={false}
            className={`event-button ${variantClass} ${className}`.trim()}
        >
            {icon}
            <span className="event-button__label">{label}</span>
            {srSuffix ? <span className="sr-only">{srSuffix}</span> : null}
        </Link>
    );
};

export default EventButton;
