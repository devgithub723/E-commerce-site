import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { clearSelectedProduct, createProductsAsync, fetchProductByIdAsync, selectBrands, selectCategories, selectProductById, updateProductAsync } from '../../product-list/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Modal from '../../common/Modal'
import { useAlert } from "react-alert";

const AdminProductForm = () => {
    const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm();
    const categories = useSelector(selectCategories)
    const brands = useSelector(selectBrands)
    const selectedProduct = useSelector(selectProductById)
    const param = useParams()
    const alert = useAlert();
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(-1)

    const colors = [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400', id: 'white' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400', id: 'gray' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900', id: 'black' },
    ]

    const sizes = [
        { name: 'XXS', inStock: true, id: 'XXS' },
        { name: 'XS', inStock: true, id: 'XS' },
        { name: 'S', inStock: true, id: 'S' },
        { name: 'M', inStock: true, id: 'M' },
        { name: 'L', inStock: true, id: 'L' },
        { name: 'XL', inStock: true, id: 'XL' },
        { name: '2XL', inStock: true, id: '2XL' },
        { name: '3XL', inStock: true, id: '3XL' },
    ]

    useEffect(() => {
        if (param.id) {
            dispatch(fetchProductByIdAsync(param.id))
        }
        else {
            dispatch(clearSelectedProduct())
        }

    }, [param.id, dispatch])

    useEffect(() => {
        if (selectedProduct && param.id) {
            setValue('title', selectedProduct.title)
            setValue('description', selectedProduct.description)
            setValue('brand', selectedProduct.brand)
            setValue('category', selectedProduct.category)
            setValue('price', selectedProduct.price)
            setValue('discountPercentage', selectedProduct.discountPercentage)
            setValue('stock', selectedProduct.stock)
            setValue('rating', selectedProduct.rating)
            setValue('thumbnail', selectedProduct.thumbnail)
            setValue('image1', selectedProduct.images[0])
            setValue('image2', selectedProduct.images[1])
            setValue('image3', selectedProduct.images[2])
            setValue('highlight1', selectedProduct.highlights[0]);
            setValue('highlight2', selectedProduct.highlights[1]);
            setValue('highlight3', selectedProduct.highlights[2]);
            setValue('highlight4', selectedProduct.highlights[3]);
            setValue('sizes', selectedProduct.sizes.map(size => size.id));
            setValue('colors', selectedProduct.colors.map(color => color.id));

        }
    }, [selectedProduct, param.id, setValue])

    const handleDelete = () => {
        const product = { ...selectedProduct }
        product.deleted = true;
        dispatch(updateProductAsync(product))
    }
    return (
        <div>
            <form
                noValidate
                onSubmit={handleSubmit((data) => {
                    console.log(data)
                    const product = { ...data }
                    product.images = [product.image1, product.image2, product.image3, product.thumbnail]
                    product.highlights = [product.highlight1, product.highlight2, product.highlight3, product.highlight4]
                    product.rating = 0
                    product.colors = product.colors.map(color => colors.find(clr => clr.id === color))
                    product.sizes = product.sizes.map(size => sizes.find(sz => sz.id === size))
                    delete product['image1']
                    delete product['image2']
                    delete product['image3']
                    product.price = +product.price;
                    product.stock = +product.stock;
                    product.discountPercentage = +product.discountPercentage;
                    if (param.id) {
                        product.id = param.id
                        product.rating = selectedProduct.rating || 0;
                        dispatch(updateProductAsync(product))
                        alert.success("Product Updated Successfully")
                        reset()
                    }
                    else {
                        dispatch(createProductsAsync(product))
                        alert.success("Product Added Successfully")
                        reset()
                    }
                })}>
                <div className="space-y-12 bg-white p-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Add Product</h2>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            {selectedProduct && selectedProduct.deleted && <h2 className="text-red-500 sm:col-span-6"> This product is Deleted</h2>}
                            <div className="sm:col-span-6">
                                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                    Product Name
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            type="text"
                                            {...register("title", {
                                                required: "name is required",
                                            })}
                                            id="titlle"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                    Description
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        {...register("description", {
                                            required: "description is required",
                                        })}
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                                    Brand
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <select className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            {...register("brand", {
                                                required: "brand is required",
                                            })}>
                                            <option>--choose--brand</option>
                                            {brands.map(brand => <option value={brand.value}>{brand.label}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="colors" className="block text-sm font-medium leading-6 text-gray-900">
                                    Colors
                                </label>
                                <div className="mt-2">
                                    {colors.map((color) => (
                                        <>
                                            <input type='checkbox'
                                                {...register("colors", {
                                                })}
                                                key={color.id} value={color.id} />{' '}{color.name}
                                        </>
                                    ))}
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="sizes"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Sizes
                                </label>
                                <div className="mt-2">
                                    {sizes.map((size) => (
                                        <>
                                            <input
                                                type="checkbox"
                                                {...register('sizes', {
                                                })}
                                                key={size.id}
                                                value={size.id}
                                            />{' '}
                                            {size.name}
                                        </>
                                    ))}
                                </div>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                    Category
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <select className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            {...register("category", {
                                                required: "category is required",
                                            })}>
                                            <option>--choose--category</option>
                                            {categories.map(category => <option value={category.value}>{category.label}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                    Price
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            type="number"
                                            {...register("price", {
                                                required: "price is required",
                                                min: 1,
                                                max: 10000
                                            })}
                                            id="price"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="discount" className="block text-sm font-medium leading-6 text-gray-900">
                                    Discount
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            type="text"
                                            {...register("discountPercentage", {
                                                required: "discountPercentage is required",
                                                min: 0,
                                                max: 100,
                                            })}
                                            id="discountPercent"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                                    Stock
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            type="number"
                                            {...register("stock", {
                                                required: "stock is required",
                                                min: 0,
                                            })}
                                            id="stock"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                                    Rating
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            type="number"
                                            {...register("rating", {
                                                required: "rating is required",
                                                min: 0,
                                            })}
                                            id="stock"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="Thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                                    Thumbnail
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            type="text"
                                            {...register("thumbnail", {
                                                required: "stock is required",
                                                min: 0,
                                            })}
                                            id="thumbnail"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                                    Image 1
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            type="text"
                                            {...register("image1", {
                                                required: "image is required",
                                                min: 0,
                                            })}
                                            id="image1"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                                    Image 2
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            type="text"
                                            {...register("image2", {
                                                required: "image is required",
                                                min: 0,
                                            })}
                                            id="image2"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                                    Image 3
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            type="text"
                                            {...register("image3", {
                                                required: "image is required",
                                                min: 0,
                                            })}
                                            id="image3"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="highlight1" className="block text-sm font-medium leading-6 text-gray-900">
                                    Highlight 1
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            type="text"
                                            {...register("highlight1", {
                                            })}
                                            id="highlight1"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="highlight2" className="block text-sm font-medium leading-6 text-gray-900">
                                    Highlight 2
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            type="text"
                                            {...register("highlight2", {
                                            })}
                                            id="highlight2"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="highlight3" className="block text-sm font-medium leading-6 text-gray-900">
                                    Highlight 3
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            type="text"
                                            {...register("highlight3", {
                                            })}
                                            id="highlight3"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="highlight4" className="block text-sm font-medium leading-6 text-gray-900">
                                    Highlight 4
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            type="text"
                                            {...register("highlight4", {
                                            })}
                                            id="highlight4"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Extra</h2>
                        <div className="mt-10 space-y-10">
                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                                <div className="mt-6 space-y-6">
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="comments"
                                                name="comments"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="comments" className="font-medium text-gray-900">
                                                Comments
                                            </label>
                                            <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="candidates"
                                                name="candidates"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="candidates" className="font-medium text-gray-900">
                                                Candidates
                                            </label>
                                            <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="offers"
                                                name="offers"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="offers" className="font-medium text-gray-900">
                                                Offers
                                            </label>
                                            <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    {selectedProduct && !selectedProduct.deleted && <button
                        onClick={(e) => { e.preventDefault(); setOpenModal(selectedProduct.id) }}
                        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                        Delete
                    </button>}

                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>

            {selectedProduct && <Modal
                title={`Delete ${selectedProduct.title} from the cart`}
                message="Are you sure you want to delete this item from the poduct list"
                deactivate="Delete"
                cancleOption="Cancle"
                deactivateAction={() => handleDelete()}
                cancleAction={() => setOpenModal(-1)}
                showModal={openModal === selectedProduct.id}
            >
            </Modal>}
        </div>
    )
}

export default AdminProductForm
