import { useState } from "react";

export function PanelFile({ files }) {
    const [selectedImage, setSelectedImage] = useState(null);

    const openImagePreview = (image) => {
        setSelectedImage(image);
    };

    const closeImagePreview = () => {
        setSelectedImage(null);
    }
    return (
        <section className="panel-file grid">
            {(files.length > 0 && files[0] !== undefined) ? (
                files.map((file, idx) => (
                    <div className="file-container" key={`file ${idx}`}>
                        <div key={idx} className="file-item" onClick={() => openImagePreview(file)}>
                            <img src={file} alt={`File ${idx}`} />
                        </div>
                    </div>
                ))
            ) : (
                <div className="no-files-message grid place-center">
                    <img src="../../../public/icons/empty-file.svg" alt="" />
                    <div>
                        <span className="bold">Drag & drop</span>
                        <span> or </span>
                        <span className="bold">add files here</span>
                    </div>
                    <div>Upload, comment and review all files in this item to easily collaborate in context</div>
                    <input type="file" onChange={(e) => console.log("Selected files:", e.target.files)} />
                </div>
            )}


            {selectedImage && (
                <div className="image-preview">
                    <div className="preview-content">
                        <img src={selectedImage} alt="Preview" />
                        <button onClick={closeImagePreview}>Close</button>
                    </div>
                </div>
            )}
        </section>
    )
}
