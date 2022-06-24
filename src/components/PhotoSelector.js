import * as React from 'react';

export default function PhotoSelector({ photoMode, blobPhoto, register, ErrorMsg, errors,
    processImage, photoInputRef, enrolleeImage, initCaptureImage, selectImage, picture, dependant = false }) {
    //console.log(picture, 'picture...')
    return (
        <div className="user-image-wrapper">
            {photoMode === 1 && (<input
                type="hidden"
                name="photo"
                value={blobPhoto}
                ref={dependant ? register : register({
                    required: "Please add enrollee photo!"
                })}
            />)}
            {photoMode === 2 && (<input
                onChange={processImage}
                accept="image/jpeg, image/png"
                type="file"
                id="image-input"
                name="photo"
                ref={dependant ? register : register({
                    required: "Please add enrollee photo!"
                })}
                tabIndex="-1" />)}
            <div className="user-image-container dropdown">
                <div className="user-image-box dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {/* {enrolleeImage === null && (<i className="bx bx-user placeholder"></i>)}
                    {enrolleeImage && (<img src={enrolleeImage} />)} */}

                    {enrolleeImage ? (<img src={enrolleeImage} />)
                        : picture ? (<img src={picture} />)
                            : (<i className="bx bx-user placeholder"></i>)}


                </div>
                <div className="image-edit-box dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-pencil-alt"></i>
                </div>

                <div className="dropdown-menu">
                    <a className="dropdown-item" style={{ cursor: 'pointer' }} onClick={initCaptureImage}>Capture Image</a>
                    <a className="dropdown-item" style={{ cursor: 'pointer' }} onClick={selectImage}>Select Image</a>
                </div>
            </div>
            <ErrorMsg errors={errors} name="photo" />
        </div>
    );
}
