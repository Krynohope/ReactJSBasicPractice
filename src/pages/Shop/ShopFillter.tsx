import { useEffect, useState } from "react"
import { CategoryModel } from "../../models/Category"
import { getCategories } from "../../services/categoryService"

interface Props {
    onFilterChange: (categoryId: string) => void
}

const ShopFillter = ({ onFilterChange }: Props) => {
    const [categories, setCategories] = useState<CategoryModel[]>([])

    useEffect(() => {
        const getData = async () => {
            const cates = await getCategories()
            setCategories(cates)
        }
        getData()
    }, [])

    const handleClick = (event: any) => {
        const categoryId = event.target.id.split("-")[1]
        onFilterChange(categoryId)
    }
    return (
        <>
            <form>
                {categories.map((category: CategoryModel, index: number) =>
                    <div key={index} className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                        <input onChange={handleClick} type="radio" name="category-filter" className="custom-control-input" id={`category-${category.id}`} />
                        <label className="custom-control-label" htmlFor={`category-${category.id}`}>{category.name}</label>
                    </div>
                )}
            </form>
        </>
    );
}

export default ShopFillter;