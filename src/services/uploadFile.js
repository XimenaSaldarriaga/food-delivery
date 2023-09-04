
const uploadFile = async (file) => {
    
    const cloudName = 'dctajxhwc'
    const urlCloudinary = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
    const uploadPreset = 'user-profile-image-delivery-food'

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("cloud_name", cloudName);

    try {
        const resp = await fetch(urlCloudinary, {
          method: "post",
          body: formData,
        });

        if (!resp.ok) return null;

        const data = await resp.json();
        return data.secure_url;
    } catch (error) {
        console.log(error);
        return null;
    }
    
}

export default uploadFile;