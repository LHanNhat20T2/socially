/* eslint-disable @next/next/no-img-element */
"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { XIcon } from "lucide-react";

interface ImageUploadProps {
    onchange: (url: string) => void;
    value: string;
    endpoint: "imageUploader";
}
function ImageUpload({ endpoint, onchange, value }: ImageUploadProps) {
    if (value) {
        return (
            <div className="relative size-40">
                <img
                    src={value}
                    alt="Upload"
                    className="rounded-md size-40 object-cover"
                    width={300}
                    height={500}
                />
                <button
                    onClick={() => onchange("")}
                    className="absolute top-0 ring-0 p-1 bg-red-500 rounded-full shadow-sm"
                    type="button"
                >
                    <XIcon className="h-4 w-4 text-white" />
                </button>
            </div>
        );
    }
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                console.log("Files: ", res);
                onchange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                console.log(error);
            }}
        ></UploadDropzone>
    );
}
export default ImageUpload;
