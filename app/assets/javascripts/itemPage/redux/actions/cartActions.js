import { fetchingServerData } from './rootActions'

export function handleChangeItemQuantity(q){
    return {
        type: "HANDLE_CHANGE_ITEM_QUANTITY",
        data: q
    }
}

export function handleAddItemToCart(itemId){
    return  function(dispatch, getState) {
        const currentState = getState();
        const itemQuantity = currentState.cart.itemQuantity;
        $.ajax({
            url: '/carts/api/add_item',
            dataType: 'json',
            type: 'POST',
            data: {
                item_id: itemId,
                item_quantity: itemQuantity
            },
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(fetchingServerData(false));
                dispatch(fetchItemSuccessfully(data));
            }.bind(this),
            error: function(xhr, status, err) {
                if(xhr.status === 401){
                    dispatch(requireLogin());
                }
                dispatch(fetchingServerData(false));
            }.bind(this)
        });
    }
}

export function requireLogin() {
    return {
        type: "REQUIRE_LOGIN"
    }
}