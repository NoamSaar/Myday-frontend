import { SquerePreview } from "./SquerePreview"


export function SquerePreviewList({ squeres }) {
    return (
        <ul className='clean-list'>
            {squeres.map((squere, idx) => {
                return <li key={idx}>
                    <SquerePreview txt={squere.txt} img={squere.img} />
                </li>
            })}
        </ul>
    )
}
