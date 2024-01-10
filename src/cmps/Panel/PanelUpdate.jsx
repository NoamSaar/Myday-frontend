
export function PanelUpdate({ updates }) {
    console.log('updates:', updates)
    return (
        <section className="panel-update flex justify-center">
            {updates.length > 0 ?
                updates[0].txt
                :
                <div class="post_not_found grid place-center">
                    <img src="../../../public/icons/no-updates.svg" alt="" />
                    <div className="post-not-found-txt">
                        <h2>No updates yet for this item</h2>
                        <p class="post_not_found_subtitle">Be the first one to update about progress, mention someone
                            <br />
                            or upload files to share with your team members</p>
                    </div>
                </div>

            }
        </section>
    )
}
