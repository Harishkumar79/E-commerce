import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImages, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {

    const [imageFile, setImageFile] = useState(null);
    const [uploadImageUrl, setUploadImageUrl] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const dispatch = useDispatch();
    const { featureImageList } = useSelector(state => state.commonFeature)

    // console.log(uploadImageUrl,"uploadImagesUrl");

    function handleUploadFeatureImage() {
        dispatch(addFeatureImages(uploadImageUrl)).then(data => {
            // console.log('data', data);
            if (data?.payload?.success) {
                dispatch(getFeatureImages());
                setImageFile(null);
                setUploadImageUrl('');
            }
        })
    }

    useEffect(() => {
        dispatch(getFeatureImages());
    }, [dispatch])

    // console.log('featureImageList', featureImageList);

    return (
        <div>
            <ProductImageUpload
                imageFile={imageFile}
                setImageFile={setImageFile}
                uploadImageUrl={uploadImageUrl}
                setUploadImageUrl={setUploadImageUrl}
                setImageLoading={setImageLoading}
                imageLoading={imageLoading}
                isCustomStyling={true}
            // isEditMode={currentEditedId !== null}
            />
            <Button onClick={handleUploadFeatureImage} className=" mt-5 w-full">Upload</Button>
            <div className="flex flex-col gap-4 mt-5">
                {
                    featureImageList && featureImageList.length > 0 ?
                        featureImageList.map(featureImageItems => <div>
                            <div className="relative">
                                <img src={featureImageItems.image} alt={"image"} className="w-full  h-[300px] object-cover rounded-t-lg"
                                />
                            </div>
                        </div>) : null
                }
            </div>
        </div>
    );
}

export default AdminDashboard;