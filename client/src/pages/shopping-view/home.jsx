import { Button } from '@/components/ui/button';
import bannerOne from '../../assets/banner-1.webp'
import bannerTwo from '../../assets/banner-2.webp'
import bannerThree from '../../assets/banner-3.webp'
import { 
    BabyIcon,ChevronLeftIcon, ChevronRightIcon, CloudLightning,
    Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, FootprintsIcon,
    ShirtIcon,
    WatchIcon, 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilteredProduct, fetchProductDetails } from '@/store/shop/product-slice';
import ShoppingProductTile from '@/components/shopping-view/product-tile';
import { useNavigate } from 'react-router-dom';
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import { useToast } from '@/hooks/use-toast';
import ProductDetailsDialog from '@/components/shopping-view/product-details';
import { getFeatureImages } from '@/store/common-slice';

const categoryWithIcon = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightning },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: FootprintsIcon },
];

const brandsWithIcon = [
    { id: "nike", label: "Nike", icon: Dice1 },
    { id: "adidas", label: "Adidas" , icon: Dice2 },
    { id: "puma", label: "Puma" , icon: Dice3 },
    { id: "levi", label: "Levi's", icon: Dice4  },
    { id: "zara", label: "Zara", icon: Dice5  },
    { id: "h&m", label: "H&M", icon: Dice6  },
  ]

function ShoppingHome() {

    const [openDetailsDialog , setOpenDetailsDialog] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)
    const { productList , productDetails} = useSelector(state => state.shopProducts);
    const {toast} = useToast();
    const dispatch = useDispatch();
    const { featureImageList } = useSelector(state => state.commonFeature)

    function handleNavigateToListingPage(getCurrentItem , section){
        // console.log('getCurrentItem', getCurrentItem , 'section' , section);
        sessionStorage.removeItem('filters');
        const currentFilter = {
            [section] : [getCurrentItem.id]
        }

        sessionStorage.setItem('filters' , JSON.stringify(currentFilter))
        navigate(`/shop/listing`);
    }

    function handleGetProductDetails(getCurrentProductId){
        dispatch(fetchProductDetails(getCurrentProductId));
    }

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

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % featureImageList.length);
        }, 3000);

        return () => clearInterval(timer);
    }, [featureImageList]);

    useEffect(() => {
        dispatch(fetchAllFilteredProduct({ filterParams: {}, sortParams: 'price-lotohigh' }));
    }, [dispatch]);

    useEffect(()=>{
        if(productDetails !== null){
            setOpenDetailsDialog(true);
        }
    },[productDetails]);


    useEffect(() => {
        dispatch(getFeatureImages());
    }, [dispatch])

    return (
        <div className="flex flex-col min-h-screen">
            <div className=" relative w-full h-[600px] overflow-hidden">
                {
                    featureImageList && featureImageList.length > 0 ? featureImageList.map((slides, index) => <img
                        src={slides?.image}
                        key={index}
                        className={` ${index === currentSlide ? ' opacity-100 ' : 'opacity-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
                    />) : null
                }
                <Button onClick={() => setCurrentSlide(prevSlide => (prevSlide - 1 + featureImageList.length) % featureImageList.length)} variant="outline" size="icon" className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 ">
                    <ChevronLeftIcon className=' w-4 h-4' />
                </Button>
                <Button onClick={() => setCurrentSlide(prevSlide => (prevSlide + 1) % featureImageList.length)} variant="outline" size="icon" className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 ">
                    <ChevronRightIcon className=' w-4 h-4' />
                </Button>
            </div>
            <section className='py-12 bg-gray-50'>
                <div className='container mx-auto px-4'>
                    <h2 className=' text-3xl font-bold text-center mb-8'>Shop by catrgory</h2>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                        {
                            categoryWithIcon.map(categoryItem => <Card onClick={()=>handleNavigateToListingPage(categoryItem , 'category')} key={categoryItem.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    <categoryItem.icon className='w-12 h-12 mb-4 text-primary' />
                                    <span className=' font-bold'>{categoryItem.label}</span>
                                </CardContent>
                            </Card>
                            )
                        }
                    </div>
                </div>
            </section>

            <section className='py-12 bg-gray-50'>
                <div className='container mx-auto px-4'>
                    <h2 className=' text-3xl font-bold text-center mb-8'>Shop by brands</h2>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
                        {
                            brandsWithIcon.map(brandItem => <Card 
                            onClick={()=>handleNavigateToListingPage(brandItem , 'brand')}key={brandItem.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    <brandItem.icon className='w-12 h-12 mb-4 text-primary' />
                                    <span className=' font-bold'>{brandItem.label}</span>
                                </CardContent>
                            </Card>
                            )
                        }
                    </div>
                </div>
            </section>

            <section className='py-12 bg-gray-50'>
                <div className='container mx-auto px-4'>
                    <h2 className=' text-3xl font-bold text-center mb-8'>Feature Products</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                       {
                        productList && productList.length > 0 ? (
                            productList.map((productItem)=><ShoppingProductTile key={productItem._id} product={productItem} 
                            handleGetProductDetails={handleGetProductDetails}
                            handleAddToCart={handleAddToCart}
                            />)
                         ) : null
                       }
                    </div>
                </div>
            </section>
            <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails}/>
        </div>
    );
}

export default ShoppingHome;