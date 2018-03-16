const GRID_STATE_CHANGE_ACTION = 'GRID_STATE_CHANGE';
import { fetchingServerData } from './rootActions'

export const createGridAction = (partialStateName, partialStateValue) => ({
    type: GRID_STATE_CHANGE_ACTION,
    partialStateName,
    partialStateValue,
});

export function fetchBuyerOrders() {
    return  function(dispatch, getState) {
        $.ajax({
            url: '/orders/api/buyer_orders',
            dataType: 'json',
            type: 'GET',
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(fetchingServerData(false));
                dispatch(insertBuyerOrders(data));
            }.bind(this),
            error: function(xhr, status, err) {
                dispatch(fetchingServerData(false));
            }.bind(this)
        });
    }
}

export function insertBuyerOrders(data) {
    return {
        type: 'INSERT_BUYER_ORDERS',
        data: data
    }
}

export function cancelOrder(orderId) {
    return  function(dispatch, getState) {
        $.ajax({
            url: '/orders/api/cancel',
            dataType: 'json',
            type: 'PATCH',
            data: {
                id: orderId
            },
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(fetchingServerData(false));
                dispatch(insertBuyerOrders(data));
            }.bind(this),
            error: function(xhr, status, err) {
                dispatch(fetchingServerData(false));
            }.bind(this)
        });
    }
}

export function deliveryTrack(orderId) {
    return  function(dispatch, getState) {
        $.ajax({
            url: '/orders/api/delivery_tracking',
            dataType: 'json',
            type: 'GET',
            data: {
                order_id: orderId
            },
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(fetchingServerData(false));
                dispatch(insertDeliveryTrack(data));
            }.bind(this),
            error: function(xhr, status, err) {
                dispatch(fetchingServerData(false));
            }.bind(this)
        });
    }
}

export function insertDeliveryTrack(data){
    return {
        type: "INSERT_DELIVERY_TRACK",
        data: data
    }
}

export function confirmDelivered(orderId){
    return  function(dispatch, getState) {
        $.ajax({
            url: '/orders/api/confirm_delivered',
            dataType: 'json',
            type: 'PATCH',
            data: {
                id: orderId
            },
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(fetchingServerData(false));
                dispatch(insertBuyerOrders(data));
            }.bind(this),
            error: function(xhr, status, err) {
                dispatch(fetchingServerData(false));
            }.bind(this)
        });
    }
}