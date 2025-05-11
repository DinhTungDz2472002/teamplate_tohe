const CartItem = ({ item }) => (
    <div className="flex items-center p-4 border-b">
        <img src="~/assets/images/logo.png" alt={item.name} className="w-20 h-20 object-cover mr-4" />
        <div>
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-600">Size: {item.size}</p>
            <p className="text-gray-600">Color: {item.color}</p>
        </div>
    </div>
);

const CartSummary = ({ items }) => {
    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="bg-gray-100 p-6 rounded-lg h-fit">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            {items.map((item, index) => (
                <div key={index} className="flex justify-between mb-2">
                    <span>
                        {item.name} (x{item.quantity})
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            ))}
            <div className="flex justify-between font-semibold mt-4 pt-4 border-t">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button className="w-full bg-gray-800 text-white py-2 rounded mt-4">Checkout</button>
        </div>
    );
};

const Checkout = () => {
    const cartItems = [{ name: 'Basic Tee 6-Pack', size: 'XXS', color: 'White', price: 29.99, quantity: 2 }];

    return (
        <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-6">
            <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
                {cartItems.map((item, index) => (
                    <CartItem key={index} item={item} />
                ))}
            </div>
            <div className="w-full md:w-1/3">
                <CartSummary items={cartItems} />
            </div>
        </div>
    );
};

export default Checkout;
