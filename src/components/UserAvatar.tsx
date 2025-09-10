import Image from "next/image";
import avatarPlaceholder from "@/assets/avatar_placeholder.jpg";
import { cn } from "@/lib/utils";

interface UserButtonProps {
    avatarUrl?: string | null | undefined;
    size?: number;
    className?: string;
}

export default function UserAvatar({ avatarUrl, size = 40, className }: UserButtonProps) {
    return <Image
        src={avatarUrl || avatarPlaceholder}
        alt="User Avatar"
        width={size ?? 48}
        height={size ?? 48}
        className={cn("aspect-square h-fit flex-none rounded-full bg-secondary object-cover", className)}
    />;
}