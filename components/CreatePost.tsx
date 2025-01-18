"use client";
import { createPost } from "@/app/actions/post.action";
import ImageUpload from "@/components/ImageUpload";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { ImageIcon, Loader2, SendIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const CreatePost = () => {
    const { user } = useUser();
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isPosting, setIsPosting] = useState(false);
    const [showImageUpload, setShowImageUpload] = useState(false);
    const handleSubmit = async () => {
        if (!content.trim() && !imageUrl) return;
        setIsPosting(true);
        try {
            const result = await createPost(content, imageUrl);
            if (result.success) {
                setContent("");
                setImageUrl("");
                setShowImageUpload(false);
                toast.success("Post created successfully");
            }
        } catch (error) {
            console.log("Failed to create post: ", error);
            toast.error("Failed to create post");
        } finally {
            setIsPosting(false);
        }
    };
    return (
        <Card className="mb-6">
            <CardContent className="pt-6">
                <div className="space-y-4">
                    <div className="flex space-x-4">
                        <Avatar className="w-10 h-10">
                            <AvatarImage
                                src={user?.imageUrl || "/avatar.png"}
                            />
                        </Avatar>
                        <Textarea
                            placeholder="What's on your mind"
                            className="min-h-[100px] resize-none border-none focus-visible:ring-0 p-0 text-base"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            disabled={isPosting}
                        ></Textarea>
                    </div>

                    {/* Todo: handle Image Uploads */}
                    {(showImageUpload || imageUrl) && (
                        <div className="border rounded-lg p-4">
                            <ImageUpload
                                endpoint="imageUploader"
                                value={imageUrl}
                                onchange={(url) => {
                                    setImageUrl(url);
                                    if (!url) setShowImageUpload(false);
                                }}
                            />
                        </div>
                    )}
                    <div className="flex items-center justify-between border-t pt-4">
                        <div className="flex space-x-2">
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-primary"
                                onClick={() =>
                                    setShowImageUpload(!showImageUpload)
                                }
                                disabled={isPosting}
                            >
                                <ImageIcon className="size-4 mr-2" />
                                Photo
                            </Button>
                        </div>
                        <Button
                            className="flex items-center cursor-pointer"
                            onClick={handleSubmit}
                            disabled={
                                (!content.trim() && !imageUrl) || isPosting
                            }
                        >
                            {isPosting ? (
                                <>
                                    <Loader2 className="size-4 mr-2 animate-spin" />
                                    Posting...
                                </>
                            ) : (
                                <>
                                    <SendIcon className="size-4 mr-2" />
                                    Post
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
export default CreatePost;
