const fetchCartAPI = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
        },
    };
    const response = await fetch("http://localhost:3000/api/cart", options);
    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
    }
    return responseData;
}

const updateCartItemAPI = async (data) => {
    const { token, productID, quantity } = data
    const newItem = {
        productID,
        quantity
    };
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
        },
        body: JSON.stringify(newItem)
    };
    const response = await fetch("http://localhost:3000/api/cart", options);
    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
    }
    return responseData;
}

const removeCartItemAPI = async (token, productID) => {
    const payload = {
        method: "DELETE",
        headers: {
            "x-auth-token": token
        },
    };
    const response = await fetch(`http://localhost:3000/api/cart/${productID}`, payload);
    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
    }
    return responseData;
};

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5OGYwZGRiYzI5MzhjYWIyODRlMmJiIn0sImlhdCI6MTcwNDY3Nzc0MywiZXhwIjoxNzA3MjY5NzQzfQ.gKANlzZ0JnlwWQOf1Y3V2qMWXKLADJFsGVi6WYi8O4c";
const pID = "6597b18cec341c1e4bf9232a";
const quantity = 16;
//fetchCartAPI("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5OGYwZGRiYzI5MzhjYWIyODRlMmJiIn0sImlhdCI6MTcwNDY3Nzc0MywiZXhwIjoxNzA3MjY5NzQzfQ.gKANlzZ0JnlwWQOf1Y3V2qMWXKLADJFsGVi6WYi8O4c").then((d) => console.log(d));
//updateCartItemAPI(token, pID, quantity).then(d => console.log(d));
export { fetchCartAPI, updateCartItemAPI, removeCartItemAPI };