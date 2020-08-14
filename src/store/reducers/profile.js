const initialState = {
    data: {
        id: null,
        login: '',
        fullName: '',
        email: '',
        generalPhone: '',
        createdBy: null,
        createdDate: null,
        lastModifiedBy: null,
        lastModifiedDate: null,
        officialStoreYN: '',
        sellerStoreId: null,
        sequence: null,
        name: '',
        urlPath: '',
        followerCount: null,
        grade: '',
        storeLogo: '',
        officialStore: false,
    },
    isLoaded: false,
}
export const profile = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PROFILE_SUCCESS':
            return {
                data: action.payload,
                isLoaded: true,
            }
        case 'GET_PROFILE_FAILED':
            return {
                ...state,
                isLoaded: true,
            }
        default:
            return state
    }
}
