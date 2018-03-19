export function fetchingServerData(bool) {
    return {
        type: 'FETCHING_SEVER_DATA',
        isFetching: bool
    }
}

export function closeTip() {
    return {
        type: 'CLOSE_TIP'
    }
}