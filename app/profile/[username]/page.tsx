import {
    getProfileByUsername,
    getUserLikedPosts,
    getUserPosts,
    isFollowing,
} from "@/app/actions/profile.action";
import NotFound from "@/app/profile/[username]/not-found";
import ProfilePageClient from "@/app/profile/[username]/ProfilePageCLient";
import { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ username: string }>;
}): Promise<Metadata> {
    const resolvedParams = await params;
    const user = await getProfileByUsername(resolvedParams.username);
    if (!user) return {};

    return {
        title: `${user.name ?? user.username}`,
        description: user.bio || `Check out ${user.username}'s profile`,
    };
}

async function ProfilePageServer({
    params,
}: {
    params: Promise<{ username: string }>;
}) {
    const resolvedParams = await params;
    const user = await getProfileByUsername(resolvedParams.username);

    if (!user) return NotFound();

    const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
        getUserPosts(user.id),
        getUserLikedPosts(user.id),
        isFollowing(user.id),
    ]);

    return (
        <ProfilePageClient
            user={user}
            posts={posts}
            likedPosts={likedPosts}
            isFollowing={isCurrentUserFollowing}
        />
    );
}

export default ProfilePageServer;
