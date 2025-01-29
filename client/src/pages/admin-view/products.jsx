import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addNewProduct, deleteProduct, editProduct, fetchAllProduct } from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: ""
}

function AdminProducts() {
    const [openCreateproductsDialog, setOpenCreateproductsDialog] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadImageUrl, setUploadImageUrl] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const { productList } = useSelector((state) => state.adminProducts);
    const dispatch = useDispatch();
    const { toast } = useToast();

    function onSubmit(event) {
        event.preventDefault();

        currentEditedId !== null ? dispatch(editProduct({
            id: currentEditedId,
            formData
        })).then((data) => {
            // console.log(data , "edit");
            if (data?.payload?.success) {
                dispatch(fetchAllProduct());
                setFormData(initialFormData);
                setOpenCreateproductsDialog(false);
                setCurrentEditedId(null);
                toast({ title: "Product Edit" });
            }
        })
        : dispatch(
            addNewProduct({
                ...formData,
                image: uploadImageUrl,
            })
        ).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllProduct());
                setImageFile(null);
                setFormData(initialFormData);
                setOpenCreateproductsDialog(false);
                toast({ title: "Product added successfully" });
            }
        })
            .catch((error) => {
                toast({
                    title: "Error",
                    description: "Failed to add product.",
                    variant: "error",
                });
            });
    }

    function handleDelete(getCurrentProductId){
        dispatch(deleteProduct(getCurrentProductId)).then(data =>{
            if(data?.payload.success){
                dispatch(fetchAllProduct());
            }
        })
    }

    function isFormValid(){
        return Object.keys(formData).map(key => formData[key] !== '').every(item => item);
    }

    useEffect(() => {
        dispatch(fetchAllProduct());
    }, [dispatch]);

    return (
        <Fragment>
            <div className="mb-5 w-full flex justify-end">
                <Button onClick={() => setOpenCreateproductsDialog(true)}>Add New Product</Button>
            </div>

            {/* Product List */}
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {productList && productList.length > 0
                    ? productList.map((productItem) => (
                        <AdminProductTile setCurrentEditedId={setCurrentEditedId}
                            setFormData={setFormData}
                            setOpenCreateproductsDialog={setOpenCreateproductsDialog} 
                            key={productItem._id} product={productItem} 
                            handleDelete={handleDelete}
                            />
                    ))
                    : null}
            </div>

            <Sheet
                open={openCreateproductsDialog}
                onOpenChange={() => {
                    setOpenCreateproductsDialog(false);
                    setCurrentEditedId(null);
                    setFormData(initialFormData);
                }}

            >
                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle>
                            {
                                currentEditedId !== null ? 'Edit Product' : 'Add New Product'
                            }
                        </SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                        uploadImageUrl={uploadImageUrl}
                        setUploadImageUrl={setUploadImageUrl}
                        setImageLoading={setImageLoading}
                        imageLoading={imageLoading}
                        isEditMode={currentEditedId !== null}
                    />
                    <div className="py-6">
                        <CommonForm
                            onSubmit={onSubmit}
                            formData={formData}
                            setFormData={setFormData}
                            formControls={addProductFormControls}
                            buttonText={
                                currentEditedId !== null ? 'Edit' : 'Add'
                            }
                            isBtnDisable={!isFormValid()}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    );
}

export default AdminProducts;
