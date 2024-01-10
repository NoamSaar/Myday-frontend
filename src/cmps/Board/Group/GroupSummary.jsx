import DynamicSummary from "./DynamicSummary"

export function GroupSummary({ group, titlesOrder }) {
    console.log('group', group)
    console.log('titlesOrder', titlesOrder)
    return (
        <div className="sticky-left subgrid full-grid-column group-summary">


            <div className="sticky-left place-holder"></div>


            <ul className="clean-list subgrid grid-column-table-content summary-content">
                {titlesOrder.map((title, idx) => {
                    return <DynamicSummary key={idx} title={title} group={group} />
                })}
            </ul>

        </div>
    )
}
