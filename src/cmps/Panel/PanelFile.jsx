import { useRef, useState } from "react"
import { BigPlusIcon, CloseIcon } from "../../services/svg.service"
import { uploadService } from '../../services/upload.service'


export function PanelFile({ files, onAddFile }) {
    const [selectedImage, setSelectedImage] = useState(null)
    const fileInputRef = useRef(null)

    const openImagePreview = (image) => {
        setSelectedImage(image)
    }

    const closeImagePreview = () => {
        setSelectedImage(null)
    }

    const handleButtonClick = () => {
        fileInputRef.current.click()
    }

    // const handleFileChange = (ev) => {
    //     const selectedFiles = ev.target.files
    //     onAddFile(selectedFiles)
    // }


    function handleFileChange(ev) {
        const file = ev.target.files[0]

        if (file) {
            const reader = new FileReader()
            reader.onloadend = async () => {
                const imgURL = await uploadService.uploadImg(ev)
                onAddFile(imgURL)
            }
            reader.readAsDataURL(file)
        }
    }

    // console.log('files:', files)
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
                    <img src="/icons/empty-file.svg" alt="" />

                    <div>
                        <span className="bold">Drag & drop</span>
                        <span> or </span>
                        <span className="bold">add files here</span>
                    </div>

                    <div>Upload, comment and review all files in this item to easily collaborate in context</div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange} />

                    <button
                        className="btn btn-add clrblue" onClick={handleButtonClick}>
                        <BigPlusIcon />
                        Add file
                    </button>
                </div>
            )}


            {selectedImage && (
                <div className="image-preview">
                    <div className="preview-content">
                        <img src={selectedImage} alt="Preview" />
                        <button onClick={closeImagePreview}><CloseIcon /></button>
                    </div>
                </div>
            )}
        </section>
    )
}
