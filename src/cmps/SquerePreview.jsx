
export function SquerePreview({ img, txt }) {
    return (
        <div className="squere-preview">
            {img && <img src={img} />}
            {txt && <p>{txt}</p>}

        </div>
    )
}
