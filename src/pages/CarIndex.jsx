import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadCars, addCar, updateCar, removeCar, addToCart } from '../store/actions/user.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { carService } from '../services/car.service.js'

export function CarIndex() {

    const cars = useSelector(storeState => storeState.carModule.cars)
    const loggedinUser = useSelector(storeState => storeState.userModule.user)
    const isLoading = useSelector(storeState => storeState.userModule.isLoading)


    useEffect(() => {
        loadCars()
    }, [])

    async function onRemoveCar(carId) {
        try {
            await removeCar(carId)
            showSuccessMsg('Car removed')
        } catch (err) {
            showErrorMsg('Cannot remove car')
        }
    }

    async function onAddCar() {
        const car = carService.getEmptyCar()
        car.vendor = prompt('Vendor?')
        try {
            const savedCar = await addCar(car)
            showSuccessMsg(`Car added (id: ${savedCar._id})`)
        } catch (err) {
            showErrorMsg('Cannot add car')
        }
    }

    async function onUpdateCar(car) {
        const price = +prompt('New price?')
        const carToSave = { ...car, price }
        try {
            const savedCar = await updateCar(carToSave)
            showSuccessMsg(`Car updated, new price: ${savedCar.price}`)
        } catch (err) {
            showErrorMsg('Cannot update car')
        }
    }

    function onAddToCart(car) {
        console.log(`Adding ${car.vendor} to Cart`)
        addToCart(car)
        showSuccessMsg('Added to Cart')
    }

    function onAddCarMsg(car) {
        console.log(`TODO Adding msg to car`)
        try {
            showSuccessMsg(`Car msg added, it now has: ${3}`)
        } catch (err) {
            showErrorMsg('Cannot update car')
        }

    }

    function shouldShowActionBtns(car) {
        if (!loggedinUser) return false
        if (loggedinUser.isAdmin) return true
        return car.owner?._id === loggedinUser._id
    }

    return (
        <section className='car-index'>
            {isLoading && 'Loading...'}

        </section>
    )
}