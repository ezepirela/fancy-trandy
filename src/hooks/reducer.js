export const initialState = {
    basket: []
}
export const getBasketTotalPrice = (basket) => {
	return basket?.reduce((amount, item) => item.price + amount, 0);
}
const reducer = (state, action) => {
    
    switch(action.type){
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item]
            };
        case "CLEAN_BASKET":
            return {
                ...state,
                basket: []
            };
        case "REMOVE_ITEM":
            let newBasket = [...state.basket];
            const index = state.basket.findIndex(basketItem => basketItem.id === action.id);
            if(index >= 0){
                newBasket.splice(index, 1)
            }else {
                console.log(`sorry could not find the ${action.id} in the state array`);
            }
            return {
                ...state,
                basket: newBasket
            }
        default: 
        return state;
    }
}
export default reducer;