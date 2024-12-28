import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import { setProductDetails } from "@/store/shop/product-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {

    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.auth);
    const {toast} = useToast();

    function handleAddToCart(getCurrentProductId){
        // console.log('getCurrentProductId', getCurrentProductId);
        dispatch(addToCart({userId : user?.id, productId : getCurrentProductId, quantity : 1})).then(data=>{
            if(data?.payload.success){
                dispatch(fetchCartItems(user?.id));
                toast({
                    title : "Product is added to cart"
                })
            }
        })
    }

    function handelDialogClose(){
        setOpen(false);
        dispatch(setProductDetails());
    }


    // console.log('productDetails', productDetails);
    return (
        <Dialog open={open} onOpenChange={handelDialogClose}>
            <DialogContent aria-describedby={undefined} className=" grid grid-cols-2 gap-8 sm:p-12 max-w-[80vw]">
                <div className="relative overflow-hidden rounded-lg border p-4">
                    <img
                        src={productDetails?.image}
                        alt={productDetails?.title}
                        width={600}
                        height={600}
                        className=" aspect-square w-full object-cover"
                    />
                </div>
                <div className="">
                    <div>
                        <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
                        <p className=" text-muted-foreground text-2xl mb-5 mt-4">{productDetails?.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className={`text-3xl font-bold text-primary ${productDetails?.salePrice > 0 ? 'line-through' : ''}`}>${productDetails?.price}</p>
                        {
                            productDetails?.salePrice > 0 ? <p className="text-2xl font-bold text-muted-foreground">${productDetails?.salePrice}</p> : null
                        }
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <div className=" flex items-center gap-0.5">
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                            <StarIcon className="w-5 h-5 fill-primary" />
                        </div>
                        <span className=" text-muted-foreground">(4.5)</span>
                    </div>
                    <div className="mt-5 mb-5">
                        <Button className="w-full" onClick={()=>handleAddToCart(productDetails?._id)}>Add to Cart</Button>
                    </div>
                    <Separator />
                    <div className="max-h-[300px] overflow-auto">
                        <h2 className=" text-xl font-bold mb-4">Reviews</h2>
                        <div className="grid grid-6">
                            <div className=" flex gap-4">
                                <Avatar className="w-10 h-10 border">
                                    <AvatarFallback>Hk</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold">Harish Kumar</h3>
                                    </div>
                                    <div className=" flex items-center gap-0.5">
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                    </div>
                                    <p className=" text-muted-foreground">This is very nice product at this rate.</p>
                                </div>
                            </div>
                            <div className=" flex gap-4">
                                <Avatar className="w-10 h-10 border">
                                    <AvatarFallback>Hk</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold">Harish Kumar</h3>
                                    </div>
                                    <div className=" flex items-center gap-0.5">
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                    </div>
                                    <p className=" text-muted-foreground">This is very nice product at this rate.</p>
                                </div>
                            </div>
                            <div className=" flex gap-4">
                                <Avatar className="w-10 h-10 border">
                                    <AvatarFallback>Hk</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold">Harish Kumar</h3>
                                    </div>
                                    <div className=" flex items-center gap-0.5">
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                    </div>
                                    <p className=" text-muted-foreground">This is very nice product at this rate.</p>
                                </div>
                            </div>
                            <div className=" flex gap-4">
                                <Avatar className="w-10 h-10 border">
                                    <AvatarFallback>Hk</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold">Harish Kumar</h3>
                                    </div>
                                    <div className=" flex items-center gap-0.5">
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                        <StarIcon className="w-5 h-5 fill-primary" />
                                    </div>
                                    <p className=" text-muted-foreground">This is very nice product at this rate.</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex gap-2 ">
                            <Input placeholder="write a review..." />
                            <Button>Submit</Button>
                        </div>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    );
}

export default ProductDetailsDialog;