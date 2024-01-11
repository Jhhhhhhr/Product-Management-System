export const createProduct = async (token, product_info) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
        },
        body: JSON.stringify(product_info)
    }

    const response = await fetch("http://localhost:3000/api/products", options);
    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
    }
    return responseData;
}

export const updateProduct = async (token, productId, product_info)=>{
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
        },
        body: JSON.stringify(product_info)
    }

    const response = await fetch(`http://localhost:3000/api/products/${productId}`, options);
    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
    }
    return responseData;
}

export const fetchOneProductInfo = async (productId) => {
    const response = await fetch(`http://localhost:3000/api/products/${productId}`)
    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
    }
    return responseData;
}