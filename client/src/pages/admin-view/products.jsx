import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addNewProduct, fetchAllProduct } from "@/store/admin/products-slice";
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

    const [openCreateproductsDialog , setOpenCreateproductsDialog] = useState(false);
    const [formData , setFormData] = useState(initialFormData);
    const [imageFile , setImageFile] = useState(null);
    const [uploadImageUrl , setUploadImageUrl] = useState(null);
    const [imageLoading , setImageLoading] = useState(false);
    const {productList} = useSelector(state=>state.adminProducts);
    const dispatch = useDispatch();  
    const {toast} = useToast();
 
    function onSubmit(event){
        event.preventDefault();
        // console.log("Submitting product data:", {
        //     ...formData,
        //     image: uploadImageUrl,
        // });
        dispatch(addNewProduct({
            ...formData,
            image : uploadImageUrl
        }))
        .then((data)=>{
            console.log(data);
            if(data?.payload?.success){
                dispatch(fetchAllProduct);
                setImageFile(null);
                setFormData(initialFormData);
                setOpenCreateproductsDialog(false);
                toast({
                    title: "Product Add Successfully"

                })
            }
        })
    }

    useEffect(()=>{
        dispatch(fetchAllProduct());
    },[dispatch]);

    console.log(productList,uploadImageUrl , "productList");
    console.log(formData);

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
                <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadImageUrl={uploadImageUrl} setUploadImageUrl={setUploadImageUrl} setImageLoading={setImageLoading} imageLoading={imageLoading}   
                />
                <div className="py-6">
                    <CommonForm onSubmit={onSubmit} formData={formData} setFormData={setFormData} formControls={addProductFormControls} buttonText={"Add"}/>
                </div>
            </SheetContent>
            </Sheet>
        </Fragment>
    );
}

export default AdminProducts;