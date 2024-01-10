import { useSelector } from "react-redux"

export function UserDetails() {
  const user = useSelector(storeState => storeState.userModule.watchedUser)
  return (
    <section className="user-details">
      <h1>User Details</h1>
    </section>
  )
}