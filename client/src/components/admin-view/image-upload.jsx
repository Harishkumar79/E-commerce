import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({ imageFile, setImageFile, uploadImageUrl, setUploadImageUrl, imageLoading, setImageLoading , isEditMode , isCustomStyling = false}) {
    const inputRef = useRef(null);

    function handleImageFileChange(event) {
        // console.log(event.target.files);
        const selectedFile = event.target.files?.[0];
        if (selectedFile) setImageFile(selectedFile);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if (droppedFile) setImageFile(droppedFile);
    }

    function handleRemoveImage() {
        setImageFile(null);
        setUploadImageUrl(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    // console.log(imageFile);

    async function uploadImageToCloudinary() {
        setImageLoading(true)
        const data = new FormData();
        data.append("my_file", imageFile);
        const responce = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`, data);

        // console.log(responce);
        if (responce?.data?.success) {
            setUploadImageUrl(responce.data.result.url);
            setImageLoading(false);
        }
    }

    useEffect(() => {
        if (imageFile !== null) {
            uploadImageToCloudinary();
        }
    }, [imageFile]);

    return (
        <div className={`w-full mt-4 ${isCustomStyling ? '':' max-w-md mx-auto '}`}>
            <Label htmlFor="image-upload" className="text-lg font-semibold mb-2 block">
                Upload Image
            </Label>
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className = {`${isEditMode ? 'opacity-60' : ""} border-2 border-dashed rounded-lg p-4`}
            >
                <Input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    ref={inputRef}
                    onChange={handleImageFileChange}
                    disabled = {isEditMode}
                />
                {!imageFile ? (
                    <Label
                        htmlFor="image-upload"
                        className={`${isEditMode ? 'cursor-not-allowed' : ""} flex flex-col items-center justify-center h-32 cursor-pointer`}
                    >
                        <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
                        <span>Drag & drop or click to upload image</span>
                    </Label>
                ) : (
                    imageLoading ? (<Skeleton className="h-10 bg-gray-100" />)
                        : (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <FileIcon className="w-7 h-7 text-primary mr-2" />
                                    <p className="text-sm font-medium">{imageFile.name}</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-muted-foreground hover:text-foreground"
                                    onClick={handleRemoveImage}
                                >
                                    <XIcon className="w-4 h-4" />
                                    <span className="sr-only">Remove File</span>
                                </Button>
                            </div>
                        )
                )}
            </div>
        </div>
    );
}

export default ProductImageUpload;
