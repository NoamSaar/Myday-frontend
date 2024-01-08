import { utilService } from "../services/util.service";

export function UserImg({ user }) {
    return (
        <>
            {user.imgUrl ?
                <img className="user-img" src={user.imgUrl} /> :
                <span className="extra-members-box">{utilService.getFormatName(user.fullname)}</span>}
        </>
    )
}
