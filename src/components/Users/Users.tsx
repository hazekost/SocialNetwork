import s from "./Users.module.css";
import userIcon from "../../assets/images/userIcon.png";
import React from "react";
import {userType} from "../../Redux/usersReducer";
import {NavLink} from "react-router-dom";
import {networkAPI} from "../../api/api";

type UsersPropsType = {
    totalCount: number
    pageSize: 5
    followingInProgress: Array<number>
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    users: Array<userType>
    follow: (userID: number) => void
    unFollow: (userID: number) => void
    setFollowing: (userId: number, isFetching: boolean) => void
}

export const Users: React.FC<UsersPropsType> = (props) => {

    let pagesCount = Math.ceil(props.totalCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            {props.users.map(u => <div key={u.id}>
                <div className={s.image}>
                    <NavLink to={`/profile/${u.id}`}>
                        <img src={u.photos.small !== null ? u.photos.small : userIcon}/>
                    </NavLink>
                </div>
                <div>
                    {
                        u.followed
                            ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                props.setFollowing(u.id, true)
                                networkAPI.unFollow(u.id).then((response) => {
                                    if (response.data.resultCode === 0) {
                                        props.unFollow(u.id)
                                    }
                                    props.setFollowing(u.id, false)
                                })
                            }}>UnFollow</button>
                            : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                props.setFollowing(u.id, true)
                                networkAPI.follow(u.id).then((response) => {
                                    if (response.data.resultCode === 0) {
                                        props.follow(u.id)
                                    }
                                    props.setFollowing(u.id, false)
                                })
                            }}>Follow</button>
                    }
                </div>
                <div>{u.name}</div>
                <div>{u.status}</div>
            </div>)}
            <div>
                {
                    pages.map(p =>
                        <span onClick={() => {
                            props.onPageChanged(p)
                        }}
                              className={props.currentPage === p ? s.selectedPage : ""}>{p} </span>)
                }
            </div>
        </div>
    )
}