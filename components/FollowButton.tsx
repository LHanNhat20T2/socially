"use client";

import { toggleFollow } from "@/app/actions/user.acion";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const FollowButton = ({ userId }: { userId: string }) => {
    const [isLoading, setIsLoading] = useState(false);
    const handleFollow = async () => {
        setIsLoading(true);
        try {
            await toggleFollow(userId);
            toast.success("User followed successfully");
        } catch (error) {
            toast.error("Error following user");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Button
            size={"sm"}
            variant={"secondary"}
            onClick={handleFollow}
            disabled={isLoading}
            className="w-20"
        >
            {isLoading ? (
                <Loader2Icon className="size-4 animate-spin" />
            ) : (
                "Follow"
            )}
        </Button>
    );
};
export default FollowButton;
