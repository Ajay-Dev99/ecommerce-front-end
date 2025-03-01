import React, { useEffect, useRef, useState } from 'react'
import PageHeader from '../../components/Admin/PageHeader'
import { FaImage } from "react-icons/fa";
import Variants from '../../components/Admin/Product/Variants';
import { getcategoriesbrands } from '../../sevices/adminApis';

function Addproduct() {
    const [values, setValues] = useState({ name: '', brand: "", category: "", units: "", label: "" })
    const [images, setImages] = useState([])
    const [formUtilites, setFormUtilites] = useState({})
    const [selectedVariant, setSelectedVariant] = useState("");
    const fileInputs = useRef([]);


    useEffect(() => {
        getcategoriesbrands().then((res) => setFormUtilites(res.data)).then((err) => console.log(err))
    }, [])


    const handleClick = (index) => {

        if (fileInputs.current[index]) {
            fileInputs.current[index].click(index); // Trigger the file input
        }

    };
    const handleFileChange = (e, index) => {
        const file = e.target.files[0];

        if (file) {
            const newImages = [...images];
            newImages[index] = file; // Create a preview URL
            setImages(newImages);
        }
    };

    const handleChange = (e) => {
        console.log(e.target.value);
        setValues({ ...values, [e.target.name]: e.target.value })


    };



    const handlePublish = () => {
        console.log(values, "values");
        console.log(images, "images");

    }

    const handleRadioChange = (event) => {

        setSelectedVariant(event.target.value);
    };
    const Imagesection = () => {
        return (
            <div className="w-full space-y-3">

                <div className="flex gap-2 px-3">
                    <div className="flex flex-col w-1/2">
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Regular Price</label>
                        <input type="text" name="originalPrice" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col w-1/2">
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Offer Price</label>
                        <input type="text" name="offerPrice" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} />
                    </div>
                </div>
                <div className="flex gap-2 px-3">
                    <div className="flex flex-col w-1/2">
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity In Stock</label>
                        <input type="text" name="stock" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col w-1/2">
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock Status</label>
                        <select id="countries" name="stockStatus" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange}>

                            <option value="instock">In stock</option>
                            <option value="outofstock">Out of stock</option>
                        </select>
                    </div>
                </div>

                <div className='px-3'>
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <textarea id="message" name='description' rows={6} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." defaultValue={""} onChange={handleChange} />
                </div>
                <p className="px-3 text-sm font-medium text-gray-900 dark:text-white">{selectedVariant == "hasVariants" ? "Variants Images" : "Product Images"}</p>
                <div className="images w-full flex gap-2 px-3 rounded-lg">
                    {/* First Large Image Div */}
                    <div
                        className="border border-dotted border-black w-1/3 h-52 flex flex-col justify-center items-center bg-[#E2E1E1] cursor-pointer"
                        onClick={() => handleClick(0)}
                        onChange={(e) => handleFileChange(e, 0)}
                    >
                        {images[0] ? <img src={URL.createObjectURL(images[0])} alt="Preview" className="w-full h-full object-contain" /> : <div> <FaImage className="text-gray-500 text-3xl" />
                            <p className="text-blue-600 text-sm font-medium">Select Image</p></div>}
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={(el) => (fileInputs.current[0] = el)}
                        />
                    </div>

                    {/* Second Large Image Div */}
                    <div
                        className="border border-dotted border-black w-1/3 h-52 flex flex-col justify-center items-center bg-[#E2E1E1] cursor-pointer"
                        onClick={() => handleClick(1)}
                        onChange={(e) => handleFileChange(e, 1)}

                    >
                        {images[1] ? <img src={URL.createObjectURL(images[1])} alt="Preview" className="w-full h-full object-fill" /> : <div> <FaImage className="text-gray-500 text-3xl" />
                            <p className="text-blue-600 text-sm font-medium">Select Image</p></div>}

                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={(el) => (fileInputs.current[1] = el)}
                        />
                    </div>

                    {/* Third Div (Split into 2 smaller divs) */}
                    <div className="border  w-1/3 h-52 flex flex-col gap-2">
                        {[...Array(2)].map((_, index) => (
                            <div
                                key={index}
                                className="border border-dotted border-black h-1/2 flex flex-col justify-center items-center bg-[#E2E1E1] cursor-pointer"
                                onClick={() => handleClick(index + 2)}
                                onChange={(e) => handleFileChange(e, index + 2)}

                            >
                                {images[index + 2] ? <img src={URL.createObjectURL(images[index + 2])} alt="Preview" className="w-full h-full object-fill" /> : <div> <FaImage className="text-gray-500 text-3xl" />
                                    <p className="text-blue-600 text-sm font-medium">Select Image</p></div>}

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    ref={(el) => (fileInputs.current[index + 2] = el)}
                                />
                            </div>
                        ))}
                    </div>

                </div>

                {selectedVariant == "hasVariants" && <div className="w-full text-end">
                    <button onClick={() => {
                        setSelectedVariant("")
                    }} className='btn bg-blue-600 text-white p-1 px-3  rounded-3xl'>Save Variant</button>
                </div>}
            </div>
        )
    }

    const AddProductForm = () => {
        return (<div className=" space-y-4 bg-white py-3 px-5">

            {/* ProductName  */}
            <div className="mb-5">
                <label htmlFor="productName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ProductName</label>

                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} />
            </div>

            {/* Brand Category  */}
            <div className="flex gap-2 ">
                <div className="flex flex-col w-1/2">
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand Name</label>
                    <select id="countries" name="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange}>

                        {formUtilites.brands && formUtilites.brands.map((brand) => <option value={brand._id}>{brand.name}</option>)}

                    </select>
                </div>
                <div className="flex flex-col w-1/2">
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">category</label>
                    <select id="countries" name="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange}>

                        {formUtilites.categories && formUtilites.categories.map((category) => <option value={category._id}>{category.name}</option>)}
                    </select>
                </div>
            </div>





            {/* Units Label  */}
            <div className="flex gap-2">
                <div className="flex flex-col w-1/2">
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Units</label>
                    <select id="countries" name="units" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange}>

                        <option value="peices">Peices</option>
                        <option value="kg">Kg</option>
                    </select>
                </div>
                <div className="flex flex-col w-1/2">
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Label</label>
                    <select id="countries" name="label" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange}>

                        <option value="topproducts">Top Products</option>
                        <option value="featuredproducts">Featured Products</option>
                        <option value="mostpopular">Most Popular</option>
                    </select>
                </div>
            </div>


            {/* Radio Button  */}
            <div>
                <div className='flex gap-2'>
                    <div className="flex items-center ps-4 border border-gray-200 rounded-sm dark:border-gray-700 w-1/2">
                        <input
                            id="bordered-radio-1"
                            type="radio"
                            name="variantradio"
                            value="hasVariants"
                            checked={selectedVariant === "hasVariants"}
                            onChange={handleRadioChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="bordered-radio-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Has Product Variants</label>
                    </div>
                    <div className="flex items-center ps-4 border border-gray-200 rounded-sm dark:border-gray-700 w-1/2">
                        <input
                            id="bordered-radio-2"
                            type="radio"
                            name="variantradio"
                            value="noVariants"
                            checked={selectedVariant === "noVariants"}
                            onChange={handleRadioChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="bordered-radio-2" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">No Product Variants</label>
                    </div>
                </div>
            </div>



            {/* {selectedVariant == "hasVariants" ? <Variants /> : ''} */}


            <div className="flex flex-wrap gap-2 justify-center">
                {/* <div className="border border-black border-dotted w-1/4 h-44"></div>
                <div className="border border-black border-dotted w-1/4 h-44"></div>
                <div className="border border-black border-dotted w-1/4 h-44"></div> */}
            </div>

        </div>)
    }
    return (
        <div className='space-y-3 w-full bg-white p-3 flex flex-col min-h-full'>
            <PageHeader content={"Products"} />

            <h1 className='font-bold text-lg mb-2'>Add Product</h1>
            <div className='w-full flex  justify-between'>
                <div className={selectedVariant == "" ? `w-full` : `w-1/2`}><AddProductForm /></div>
                <div className={selectedVariant == "" ? `hidden` : ` w-1/2 flex items-center`}> <Imagesection /></div>
            </div>
            <div className="flex justify-center gap-4">
                <button className="btn bg-red-600 text-white p-1 px-3 w-full rounded-3xl">Cancel</button>
                <button className="btn bg-green-600 text-white p-1 px-3 w-full rounded-3xl" onClick={handlePublish}>Publish Product</button>
            </div>
        </div>
    )
}

export default Addproduct



