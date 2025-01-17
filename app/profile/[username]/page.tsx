import {
    getProfileByUsername,
    getUserLikedPosts,
    getUserPosts,
    isFollowing,
} from "@/app/actions/profile.action";
import ProfilePageCLient from "@/app/profile/[username]/ProfilePageCLient";
import { notFound } from "next/navigation";

export async function generateMetaData({
    params,
}: {
    params: { username: string };
}) {
    const user = await getProfileByUsername(params.username);
    if (!user) return;
    return {
        title: `${user.name ?? user.username}`,
        description: user.bio || `Check out ${user.username}'s profile`,
    };
}

async function ProfilePageServer({ params }: { params: { username: string } }) {
    const user = await getProfileByUsername(params.username);

    if (!user) return notFound();
    const [posts, likePosts, isCurrentUserFollowing] = await Promise.all([
        getUserPosts(user.id),
        getUserLikedPosts(user.id),
        isFollowing(user.id),
    ]);
    return (
        <ProfilePageCLient
            user={user}
            posts={posts}
            likePosts={likePosts}
            isFollowing={isCurrentUserFollowing}
        />
    );
}
export default ProfilePageServer;
