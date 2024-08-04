import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface CartItem {
    id: string
    name: string
    price: number
    sale_price?: number,
    img: string,
    quantity: number
}


const initialState: CartItem[] = JSON.parse(localStorage.getItem('cart') as string) ?? []

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (cart, action: PayloadAction<CartItem>) => {

            const cartItemFounded: CartItem | undefined = cart.find(item => item.id === action.payload.id)

            if (cartItemFounded) {

                cart.splice(cart.indexOf(cartItemFounded, 0), 1, {
                    ...cartItemFounded,
                    quantity: cartItemFounded.quantity + 1
                })
                localStorage.setItem('cart', JSON.stringify(cart))
                return
            }
            cart.push(action.payload)
            localStorage.setItem('cart', JSON.stringify(cart))
        },
        increase: (cart, action: PayloadAction<CartItem>) => {
            const currentItem: CartItem | undefined = cart.find(item => item.id === action.payload.id)
            currentItem && cart.splice(cart.indexOf(currentItem, 0), 1, {
                ...currentItem,
                quantity: currentItem.quantity === 5 ? currentItem.quantity = 5 : currentItem.quantity + 1

            })

            localStorage.setItem('cart', JSON.stringify(cart))
        },
        decrease: (cart, action: PayloadAction<CartItem>) => {

            const currentItem: CartItem | undefined = cart.find(item => item.id === action.payload.id)
            currentItem && cart.splice(cart.indexOf(currentItem, 0), 1, {
                ...currentItem,
                quantity: currentItem.quantity === 1 ? currentItem.quantity = 1 : currentItem.quantity - 1
            })
            localStorage.setItem('cart', JSON.stringify(cart))
        },
        remove: (cart, action: PayloadAction<CartItem>) => {
            cart.splice(cart.indexOf(action.payload), 1)
            localStorage.setItem('cart', JSON.stringify(cart))
        },
        clear: () => {
            localStorage.removeItem('cart')
        }
    }
})

export const { add, increase, decrease, remove, clear } = cartSlice.actions

export default cartSlice.reducer