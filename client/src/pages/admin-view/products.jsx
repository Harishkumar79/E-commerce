import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormControls } from "@/config";
import { Fragment, useState } from "react";

const initialFormData = {
    productName: "",
    description: "",
    price: 0,
    category: "",
    size: "",
    color: "",
    stock: 0,
    image: null, 
}

function AdminProducts() {

    const [openCreateproductsDialog , setOpenCreateproductsDialog] = useState(false);
    const [formData , setFormData] = useState(initialFormData);
    const [imageFile , setImageFile] = useState(null);
    const [uploadImageUrl , setUploadImageUrl] = useState(null);

    function onSubmit(){

    }


    return (
        <Fragment>
            <div className="mb-5 w-full flex justify-end">
            <Button onClick={()=>setOpenCreateproductsDialog(true)}>Add New Product</Button>
            </div>

            {/* pending for product  */}
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
            <Sheet open={openCreateproductsDialog} onOpenChange={()=>{
                setOpenCreateproductsDialog(false)
            }} >
            <SheetContent side="right" className="overflow-auto">
                <SheetHeader>
                    <SheetTitle>Add New Product</SheetTitle>
                </SheetHeader>
                <ProductImageUpload file={imageFile} setFile={setImageFile} uploadImageUrl={uploadImageUrl} setUploadImageUrl={setUploadImageUrl}/>
                <div className="py-6">
                    <CommonForm onSubmit={onSubmit} formData={formData} setFormData={setFormData} formControls={addProductFormControls} buttonText={"Add"}/>
                </div>
            </SheetContent>
            </Sheet>
        </Fragment>
    );
}

export default AdminProducts;