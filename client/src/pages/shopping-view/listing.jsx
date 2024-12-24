import ProductFilter from "@/components/shopping-view/filter";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import { DropdownMenu,DropdownMenuContent,DropdownMenuRadioGroup,DropdownMenuRadioItem,DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { fetchAllFilteredProduct } from "@/store/shop/product-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ShoppingListing() {
    
    const dispatch = useDispatch();
    const {productList} = useSelector(state=> state.shopProducts );
    const [filters , setFilters] = useState({});
    const [sort , setSort] = useState(null);


    function handleSort(value){
        setSort(value);
    }

    function handleFilter(getSectionId , getCurrentOption){
        console.log('getSectionId :' , getSectionId , '|| getCurrentOption', getCurrentOption);

        let cpyFilters = {...filters};
        const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

        if(indexOfCurrentSection === -1){
            cpyFilters = {
                ...cpyFilters,
                [getSectionId] : [getCurrentOption]
            }
        }else{
            const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption);

            if( indexOfCurrentOption === -1) cpyFilters[getSectionId].push(getCurrentOption);
            else cpyFilters[getSectionId].splice(indexOfCurrentOption , 1);
        }
        
        setFilters(cpyFilters);
        sessionStorage.setItem('filters' , JSON.stringify(cpyFilters));
    }

    useEffect(()=>{
        setSort("price-lowtohigh");
        setFilters(JSON.parse(sessionStorage.getItem('filters' )) || {});
    },[]);

    console.log(filters);

    //fetch list of products
    useEffect(()=>{
        dispatch(fetchAllFilteredProduct());
    },[dispatch]);

    // console.log('productList', productList);

    return ( 
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6 ">
            <ProductFilter filters={filters} handleFilter={handleFilter}/>
            <div className=" bg-background w-full rounded-lg shadow-sm">
                <div className=" p-4 border-b flex items-center justify-between">
                    <h3 className="text-lg font-extrabold">All products</h3>
                    <div className="flex items-center gap-3">
                        <span className=" text-muted-foreground">{productList.length} Product</span>
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className=" flex items-center gap-1">
                            <ArrowUpDownIcon className="w-4 h-4"/>
                            <span>Sort By</span>
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                            <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                                {
                                    sortOptions.map(sortItem => <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>{sortItem.label}</DropdownMenuRadioItem>)
                                }
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {
                        productList && productList.length > 0 ? 
                        productList.map(productItem => <ShoppingProductTile key={productItem._id} product={productItem}/>) : null
                    }
                </div>
            </div>
        </div>
    );
}

export default ShoppingListing;