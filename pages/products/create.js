import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';

const EditProductPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token')


        try {
            const response = await axios.post(`https://backend-nodejs-mysql-1.onrender.com/api/products`, product);
            toast.success('Product updated successfully!');
            router.push('/user/dashboard');
        } catch (error) {
            console.error('Error creating product:', error.message);
            toast.error('Failed to create product. Please try again.');
        }
    };


    return (
        <div className="max-w-2xl mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-6">Create Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={product.name} // Set the initial value from the state
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={product.description} // Set the initial value from the state
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={product.price} // Set the initial value from the state
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 border rounded-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default EditProductPage;
