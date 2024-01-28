
export function SortPicker() {
    return (
        <section className="sort-picker general-modal board-member-select">

            <h4>Sort by</h4>

            <select name="type">
                <option value={1}>Name</option>
                <option value={1}>Status</option>
                <option value={1}>Date</option>
                <option value={1}>Priority</option>
            </select>

            <select name="dir">
                <option value={1}>Ascending</option>
                <option value={1}>Descending</option>
            </select>

            <button className="btn">+ Add new sort</button>

        </section>
    )
}
