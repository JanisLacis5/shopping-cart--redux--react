import {useDispatch, useSelector} from "react-redux"
import CartContainer from "./components/CartContainer"
import Navbar from "./components/Navbar"
import {useEffect} from "react"
import {countTotals, getCart} from "./features/cart/cartSlice"
import Modal from "./components/Modal"

function App() {
    const {cart, isLoading} = useSelector((store) => store.cart)
    const {isOpen} = useSelector((store) => store.modal)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(countTotals())
    }, [cart])

    useEffect(() => {
        dispatch(getCart())
    }, [])

    if (isLoading) {
        return (
            <div className="loading">
                <h2>Loading...</h2>
            </div>
        )
    }

    return (
        <main>
            {isOpen && <Modal />}
            <Navbar />
            <CartContainer />
        </main>
    )
}
export default App
