const GallaryHead = () => {
    return(
        <div className="gallary__head">
            {/* <h2>Gallary</h2> */}
            <div className="gallary__head--left">
                <input type="checkbox" name="" id="" checked />
                <p>4 files selected</p>
            </div>
            <p className="gallary__head--right">Delete Files</p>
        </div>
    )
}


export default GallaryHead;