import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems }) {
    // Calculate the total cart amount
    const totalCartAmount = cartItems && cartItems.length > 0
        ? cartItems.reduce((sum, currentItem) => (
            sum + (
                currentItem?.salePrice > 0
                    ? currentItem?.salePrice
                    : currentItem?.price
            ) * currentItem?.quantity
        ), 0)
        : 0;

    return (
        <SheetContent className="sm:max-w-md">
            <SheetHeader>
                <SheetTitle>User Cart Wrapper</SheetTitle>
            </SheetHeader>
            <div className="mt-8 space-y-4">
                {
                    cartItems && cartItems.length > 0
                        ? cartItems.map(item => <UserCartItemsContent key={item.productId} cartItems={item} />)
                        : <p>Your cart is empty</p>
                }
            </div>
            <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">${totalCartAmount.toFixed(2)}</span> {/* Displaying total with 2 decimal points */}
                </div>
            </div>
            <Button className="w-full mt-6">Checkout</Button>
        </SheetContent>
    );
}

export default UserCartWrapper;