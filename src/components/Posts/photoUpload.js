import React, {useState} from "react"


export const FileUpload = () => {

    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const uploadImage = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "myUpload")
        data.append("cloud_name", "kritikillz")
        fetch("https://api.cloudinary.com/v1_1/kritikillz/image/upload", {
            method: "post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                setUrl(data.url)
            })
            .catch(err => console.log(err))
    }
    console.log(url)
    return (
        <>
            <div>
                <div>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])}></input>
                    <button onClick={() => uploadImage()}>Upload</button>
                </div>
                <div>
                    <img style={{ width: "250px" }} src={url} />
                </div>
            </div>
        </>
    )
};
