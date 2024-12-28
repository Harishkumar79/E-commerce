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
import { fetchAllFilteredProduct } from '@/store/shop/product-slice';
import ShoppingProductTile from '@/components/shopping-view/product-tile';

const catrgoryWithIcon = [
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

    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [bannerOne, bannerTwo, bannerThree];
    const { productList } = useSelector(state => state.shopProducts)
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    console.log('productList', productList);

    useEffect(() => {
        dispatch(fetchAllFilteredProduct({ filterParams: {}, sortParams: 'price-lotohigh' }));
    }, [dispatch]);

    return (
        <div className="flex flex-col min-h-screen">
            <div className=" relative w-full h-[600px] overflow-hidden">
                {
                    slides.map((slides, index) => <img
                        src={slides}
                        key={index}
                        className={` ${index === currentSlide ? ' opacity-100 ' : 'opacity-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
                    />)
                }
                <Button onClick={() => setCurrentSlide(prevSlide => (prevSlide - 1 + slides.length) % slides.length)} variant="outline" size="icon" className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 ">
                    <ChevronLeftIcon className=' w-4 h-4' />
                </Button>
                <Button onClick={() => setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length)} variant="outline" size="icon" className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 ">
                    <ChevronRightIcon className=' w-4 h-4' />
                </Button>
            </div>
            <section className='py-12 bg-gray-50'>
                <div className='container mx-auto px-4'>
                    <h2 className=' text-3xl font-bold text-center mb-8'>Shop by catrgory</h2>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                        {
                            catrgoryWithIcon.map(catrgoryItem => <Card key={catrgoryItem.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    <catrgoryItem.icon className='w-12 h-12 mb-4 text-primary' />
                                    <span className=' font-bold'>{catrgoryItem.label}</span>
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
                            brandsWithIcon.map(brandItem => <Card key={brandItem.id} className="cursor-pointer hover:shadow-lg transition-shadow">
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
                            productList.map((productItem)=><ShoppingProductTile key={productItem._id} product={productItem} />)
                         ) : null
                       }
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ShoppingHome;