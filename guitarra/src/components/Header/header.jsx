import { useMemo } from 'react'

export default function Header({ cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart }) {
    const isEmpty = useMemo(() => {
        return cart.length === 0;
    }, [cart])

    const cartTotal = useMemo(() => {
        return cart.reduce((total, item) => total + (item.quantity * item.item.price), 0)
    }, [cart])

    //#region Handlers
    function handleAddOnClick(item) {
        increaseQuantity(item)
    }

    function handleRemoveOnClick(item) {
        decreaseQuantity(item)
    }

    function handleDeleteOnClick(item) {
        removeFromCart(item)
    }

    function handleVaciarOnClick() {
        clearCart();
    }

    //#endregion

    //#region Functions
    //#endregion

    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="./public/img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div className="carrito">
                            <img className="img-fluid" src="./public/img/carrito.png" alt="imagen carrito" />

                            <div id="carrito" className="bg-white p-3">
                                {isEmpty ?
                                    (<p className="text-center">El carrito esta vacio</p>) :
                                    (
                                        <table className="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map((cartItem) => {
                                                    const { item, quantity } = cartItem;
                                                    return (
                                                        <tr key={item.id}>
                                                            <td>
                                                                <img className="img-fluid" src={`./public/img/${item.image}.jpg`}
                                                                    alt="imagen guitarra" />
                                                            </td>
                                                            <td>{item.name}</td>
                                                            <td className="fw-bold">
                                                                ${item.price}
                                                            </td>
                                                            <td className="flex align-items-start gap-4">
                                                                <button type="button" className="btn btn-dark" onClick={() => handleRemoveOnClick(cartItem)}>
                                                                    -
                                                                </button>
                                                                {quantity}
                                                                <button type="button" className="btn btn-dark" onClick={() => handleAddOnClick(cartItem)}>
                                                                    +
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button className="btn btn-danger" type="button" onClick={() => handleDeleteOnClick(cartItem)}>
                                                                    X
                                                                </button>
                                                            </td>
                                                        </tr>)
                                                })}
                                            </tbody>
                                        </table>
                                    )
                                }
                                <p className="text-end">Total pagar: <span className="fw-bold">${cartTotal}</span></p>
                                <button className="btn btn-dark w-100 mt-3 p-2" onClick={handleVaciarOnClick}>Vaciar Carrito</button>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}