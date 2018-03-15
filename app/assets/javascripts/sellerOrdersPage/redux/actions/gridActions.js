const GRID_STATE_CHANGE_ACTION = 'GRID_STATE_CHANGE';
import { fetchingServerData } from './rootActions'

export const createGridAction = (partialStateName, partialStateValue) => ({
    type: GRID_STATE_CHANGE_ACTION,
    partialStateName,
    partialStateValue,
});

export function fetchSellerOrders() {
    return  function(dispatch, getState) {
        $.ajax({
            url: '/orders/api/seller_orders',
            dataType: 'json',
            type: 'GET',
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(fetchingServerData(false));
                dispatch(insertSellerOrders(data));
            }.bind(this),
            error: function(xhr, status, err) {
                dispatch(fetchingServerData(false));
            }.bind(this)
        });
    }
}

export function insertSellerOrders(data) {
    return {
        type: 'INSERT_SELLER_ORDERS',
        data: data
    }
}

export function handleOrderStatusChange(orderId, status) {
    return  function(dispatch, getState) {
        $.ajax({
            url: '/orders/api/update',
            dataType: 'json',
            type: 'PATCH',
            data: {
                id: orderId,
                status: status
            },
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(fetchingServerData(false));
                dispatch(fetchSellerOrders(data));
            }.bind(this),
            error: function(xhr, status, err) {
                dispatch(fetchingServerData(false));
            }.bind(this)
        });
    }
}

export function handleSubmitDeliveryTrackNumber(orderId, trackNumber) {
    return  function(dispatch, getState) {
        $.ajax({
            url: '/orders/api/update_delivery_track_number',
            dataType: 'json',
            type: 'PATCH',
            data: {
                id: orderId,
                track_number: trackNumber
            },
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(fetchingServerData(false));
                dispatch(fetchSellerOrders(data));
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