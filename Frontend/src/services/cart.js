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