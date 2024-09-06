import { useEffect, useState } from 'react';
import { db } from '../data/db';


function useCart() {
    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);

    //#region Initial States
    function initialCart() {
        const cartString = localStorage.getItem("cart");
        return cartString ? JSON.parse(cartString) : [];
    }

    //#endregion

    //#region Effect Hooks
    useEffect(
        function updateLocalStorageOnCartChange() {
            localStorage.setItem("cart", JSON.stringify(cart))
        }, [cart])

    //#endregion

    //#region Functions
    function addItem(item) {
        // If it doesn't exist, add. If it exists, increase quantity.
        const existingItem = cart.find((x) => x.item.id === item.id);

        if (!existingItem) {
            setCart(prevCart => [...prevCart, { item: item, quantity: 1 }]);
        }
        else {
            // There's no point in cloning the array because the reference of the objects persists. 
            // The only thing that becomes a shallow copy is the actual array object.
            // Even then, we have to do it because the state setter calls a re-render. Otherwise we can't see the changes.
            const newCart = [...cart];
            newCart.find((x) => x.item.id === existingItem.item.id).quantity++;
            setCart(newCart);
        }
    }

    function increaseQuantity(item) {
        const newCart = [...cart];
        newCart.find((x) => x.item.id === item.item.id).quantity++;
        setCart(newCart);
    }

    function decreaseQuantity(item) {
        const newCart = [...cart];
        // Delete the item when there's no items left.
        if (newCart.find((x) => x.item.id === item.item.id).quantity === 1) {
            removeFromCart(item);
        }
        else {
            newCart.find((x) => x.item.id === item.item.id).quantity--;
            setCart(newCart);
        }
    }

    function removeFromCart(item) {
        setCart((prevCart) => prevCart.filter((x) => x.item.id !== item.item.id))
    }

    function clearCart() {
        setCart([]);
    }

    //#endregion

    return {
        data,
        cart,
        addItem,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart
    }
}

export default useCart;