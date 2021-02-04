import {AddMessageActionType, ChangeMessageTextActionType} from "./dialogsReducer";
import {
    followReturnType,
    setCurrentPageReturnType, setFetchingReturnType,
    setTotalUsersCountReturnType,
    setUsersReturnType,
    unFollowReturnType
} from "./usersReducer";

type AddPostActionReturnType = {
    type: "ADD-POST"
}
type ChangePostTextActionReturnType = {
    type: "CHANGE-POST-TEXT"
    value: string
}
type setUserProfileReturnType = {
    type: "SET-USER-PROFILE"
    profile: userProfileType
}

export type ActionType =
    AddPostActionReturnType
    | ChangePostTextActionReturnType
    | AddMessageActionType
    | ChangeMessageTextActionType
    | setUsersReturnType
    | unFollowReturnType
    | followReturnType
    | setCurrentPageReturnType
    | setTotalUsersCountReturnType
    | setFetchingReturnType
    | setUserProfileReturnType
export type userProfileType = {
    aboutMe: string,
    contacts: {
        facebook: string,
        website: string,
        vk: string,
        twitter: string,
        instagram: string,
        youtube: string,
        github: string,
        mainLink: string
    },
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    userId: number,
    photos: {
        small: string,
        large: string
    }
}
type initialStateType = {
    posts: Array<{ id: number, message: string, likeCount: number }>
    newPostText: string
    profile: userProfileType | null
}

let initialState: initialStateType = {
    posts: [
        {id: 1, message: "Hi", likeCount: 10},
        {id: 2, message: "Sup", likeCount: 15}
    ],
    newPostText: "",
    profile: null
}

export const profileReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "ADD-POST":
            return {
                ...state,
                posts: [...state.posts, {id: 3, message: state.newPostText, likeCount: 0}],
                newPostText: ""
            }
        case "CHANGE-POST-TEXT":
            return {...state, newPostText: action.value}
        case "SET-USER-PROFILE":
            return {...state, profile: action.profile}
        default:
            return state
    }
}

export const ChangePostText = (value: string): ChangePostTextActionReturnType => ({
    type: "CHANGE-POST-TEXT",
    value: value
})
export const AddPost = (): AddPostActionReturnType => ({
    type: "ADD-POST"
})
export const SetUserProfile = (profile: userProfileType): setUserProfileReturnType => ({
    type: "SET-USER-PROFILE",
    profile
})