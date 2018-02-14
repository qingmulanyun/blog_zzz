export function switchBuildComponent(tab_index) {
    return {
        type: 'SWITCH_BUILD_COMPONENT',
        data: tab_index
    }
}

export function toggleCreateItemPage() {
    return {
        type: "TOGGLE_CREATE_ITEM_PAGE"
    }
}