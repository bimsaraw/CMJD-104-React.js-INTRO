import axios from "axios";
import { useEffect, useState } from "react";

function Product() {

    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/products")
            .then(function (response) {
                setProducts(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get("http://localhost:8080/categories")
            .then(function (response) {
                setCategories(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [qty, setQty] = useState("");
    const [categoryId, setCategoryId] = useState(null);


    function handleName(event) {
        setName(event.target.value);
    }

    function handlePrice(event) {
        setPrice(event.target.value);
    }

    function handleQuantity(event) {
        setQty(event.target.value);
    }

    function handleCategory(event) {
        setCategoryId(event.target.value);
    }

    function createProduct(event) {
        event.preventDefault();

        const data = {
            name: name,
            price: price,
            quantity: qty,
            categoryId: categoryId
        };

        axios
            .post("http://localhost:8080/products", data)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            <h1>Products</h1>

            {products && products.map((product) => {
                return (
                    <div key={product.id}>
                        <h2>{product.name}</h2>
                        <p>Category: {product.category?.name}</p>
                        <p>Price: {product.price}</p>
                        <p>Qty: {product.quantity}</p>
                    </div>
                )
            })
            }

            <form onSubmit={createProduct}>
                <div>
                    <label>Name</label>
                    <input type="text" onChange={handleName} required />
                </div>

                <br />

                <div>
                    <label>Price</label>
                    <input type="text" onChange={handlePrice} required />
                </div>

                <br />

                <div>
                    <label>Quantity</label>
                    <input type="text" onChange={handleQuantity} required />
                </div>

                <div>
                    <label>Category</label>
                    <select onChange={handleCategory} required>
                        <option value="">Select a category</option>

                        {categories && categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>

                <br />
                <br />
                <button type="submit">Create Product</button>
            </form>

        </div>
    )
}

export default Product;