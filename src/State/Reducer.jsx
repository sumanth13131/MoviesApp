import { fetchedHomeData, userCurrentMovieRating } from "./Actions"

export default function reducer(state = {}, action) {
    switch(action.type) {
        case fetchedHomeData:
            return {
                ...state, data: action.payload,
            }
        case userCurrentMovieRating:
            return {
                ...state, rating: action.payload,
            }
        default:
            return state
    }
}
