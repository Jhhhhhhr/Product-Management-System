export const addProductToCart = async (token, productId, quantity) =>{
    const response = await fetch('http://localhost:3000/api/cart',{
        method: 'post',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({productID:productId, quantity: quantity})
    });

    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
    }
}

export const deleteOneProductFromCart = async (token, productId) => {
    const response = await fetch(`http://localhost:3000/api/cart/${productId}`,{
        method: 'delete',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({productID:productId})
    });

    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
    }
}

export const clearCart = async (token) => {
    const response = await fetch(`http://localhost:3000/api/cart`,{
        method: 'delete',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
    }
}

export const fetchUserCart = async (token) => {
    const response = await fetch(`http://localhost:3000/api/cart`,{
        method: 'get',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
    }
}