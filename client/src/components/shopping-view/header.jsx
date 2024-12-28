import { HousePlug, LogOut, Menu, ShoppingCart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingViewHeaderMenuItem } from "@/config";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { DropdownMenuLabel, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slices";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";

function MenuItems() {
    return <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
        {
            ShoppingViewHeaderMenuItem.map(menuItem => <Link className="text-sm font-medium" key={menuItem.id} to={menuItem.path}>{menuItem.label}</Link>)
        }
    </nav>
}

function HeaderRightContent() {

    const { user } = useSelector(state => state.auth);
    const {cartItems} = useSelector(state => state.shopCart);
    const [openCartSheet, setOpenCartSheet] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    function handleLogout() {
        dispatch(logoutUser());
    }

    useEffect(()=>{
        if(user?.id){
           dispatch(fetchCartItems(user?.id)); 
        }
    },[dispatch,user?.id]);

    console.log(cartItems.items, "hello");

    return <div className="flex flex-col lg:items-center lg:flex-row gap-4 ">
        <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet} >
            <Button onClick={() => setOpenCartSheet(true)} variant="outline" size="icon">
                <ShoppingCart className="w-6 h-6" />
                <span className="sr-only">User cart</span>
            </Button>
            <UserCartWrapper cartItems={cartItems?.items || []} />
        </Sheet>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="bg-black">
                    <AvatarFallback className="bg-black text-white font-extrabold">{user?.userName[0].toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" className="w-56">
                <DropdownMenuLabel>Logged in as "{user?.userName}"</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/shop/account')}>
                    <User className="mr-2 h-4 w-4" />
                    Account
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
}

function ShoppingHeader() {

    const { isAuthenticated, user } = useSelector(state => state.auth);

    return (
        <header className=" sticky top-0 z-40 w-full border-b bg-background ">
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
                <Link to={"/shop/home"} className="flex items-center gap-2">
                    <HousePlug className="h-6 w-6" />
                    <span className=" font-bold">Ecommerce</span>
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="lg:hidden">
                            <Menu className="h-6 w-6" />
                            <span className=" sr-only ">
                                Toggle header menu
                            </span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full max-w-xs">
                        <SheetTitle></SheetTitle>
                        <SheetDescription></SheetDescription>
                        <MenuItems />
                        <HeaderRightContent />
                    </SheetContent>
                </Sheet>
                <div className="hidden lg:block">
                    <MenuItems />
                </div>
                <div className="hidden lg:block">
                    <HeaderRightContent />
                </div>
            </div>
        </header>
    );
}

export default ShoppingHeader;