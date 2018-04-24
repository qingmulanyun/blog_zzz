export function fetchingServerData(bool) {
    return {
        type: 'FETCHING_SEVER_DATA',
        isFetching: bool
    }
}

export function fetchWishProductsInfo() {
    return  function(dispatch, getState) {
        $.ajax({
            url: '/shops/api/wish_products_index',
            dataType: 'json',
            type: 'GET',
            beforeSend:function(data) {
                dispatch(fetchingServerData(true));
            }.bind(this),
            success: function(data) {
                dispatch(fetchingServerData(false));
                dispatch(fetchWishProductsInfoSuccessfully(data));
            }.bind(this),
            error: function(xhr, status, err) {
                dispatch(fetchingServerData(false));
            }.bind(this)
        });
    }
}

export function fetchWishProductsInfoSuccessfully(data) {
    return {
        type: "FETCH_WISH_PRODUCTS_INFO_SUCCESSFULLY",
        data: data
    }
}

export function toggleProposalPage(boolean) {
    return {
        type: "TOGGLE_PROPOSAL_PAGE",
        data: boolean
    }
}