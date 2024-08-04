import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './ProductSkeleton.css'
const ProductSkeleton = () => {
    return (
        <>
            <div className="col-lg-3 col-md-6col-sm-12 pb-1" >
                <div className="img mb-1" >
                    <Skeleton className='skeleton-item' height={150}></Skeleton>
                </div>
                <div className="information mb-1">
                    <Skeleton className='skeleton-item' height={20} count={2}></Skeleton>
                </div>
                <div className="action mb-4" style={{ display: "flex" }}>
                    <Skeleton containerClassName="flex-1" inline={true} width={'97%'} height={40}></Skeleton>
                    <Skeleton containerClassName="flex-1" inline={true} width={'99%'} height={40}></Skeleton>
                </div>
            </div>


        </>
    )
}

export default ProductSkeleton