
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-hot-toast'; 
import Link from 'next/link';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    const deleteProduct = async (id) => {
        const token = localStorage.getItem('token'); // Get token from localStorage

        try {
            const response = await axios.delete(`http://localhost:8000/api/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });

            toast.success('Product deleted successfully!');

        } catch (error) {
            console.error('Error deleting product:', error.message);
            toast.error('Failed to delete product.');
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/'); 
            return;
        }

        // Fetch product data from the backend API
        const fetchProducts = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get('http://localhost:8000/api/products', {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                });
                setProducts(response.data.data); 
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Error fetching products');
                setLoading(false);
                toast.error('Failed to load products'); 
            }
        };

        fetchProducts(); 
    }, [deleteProduct]); 



    return (
        <div class="font-sans overflow-x-auto">
            <div className='p-5 flex justify-between items-center'>
                <div>
                    <h2 class="text-lg font-semibold mb-4">Product List</h2>
                </div>

                <div>
                    

                    <Link href="/products/create" type="button" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                        Create New Product
                    </Link>
                </div>
            </div>
            <table class="min-w-full bg-white">
                <thead class="bg-gray-100 whitespace-nowrap">
                    <tr>
                        <th class="p-4 text-left text-xs font-semibold text-gray-800">Name</th>
                        <th class="p-4 text-left text-xs font-semibold text-gray-800">Description</th>
                        <th class="p-4 text-left text-xs font-semibold text-gray-800">Price</th>
                        {/* <th class="p-4 text-left text-xs font-semibold text-gray-800">Last Updated</th> */}
                        <th class="p-4 text-left text-xs font-semibold text-gray-800">Actions</th>
                    </tr>
                </thead>
                <tbody class="whitespace-nowrap">
                    {products.length === 0 ? (
                        <tr class="hover:bg-gray-50">
                            <td class="p-4 text-center text-gray-800" colSpan="5">No products available</td>
                        </tr>
                    ) : (
                        products.map((product) => (
                            <tr key={product.id} class="hover:bg-gray-50">
                                <td class="p-4 text-[15px] text-gray-800">{product.name}</td>
                                <td class="p-4 text-[15px] text-gray-800">{product.description}</td>
                                <td class="p-4 text-[15px] text-gray-800">{product.price}</td>
                                {/* <td class="p-4 text-[15px] text-gray-800">{product.lastUpdated}</td> */}
                                <td class="p-4 text-[15px] text-gray-800">
                                    <Link href={`/products/${product.id}`}><button class="mr-2 text-blue-500 hover:underline">Edit</button></Link>
                                    <button class="text-red-500 hover:underline" onClick={()=>deleteProduct(product.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>


    );
};

export default Dashboard;
