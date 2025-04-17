export const b64_to_img = (b64) =>{
    const img = new Image();
    img.src = b64;
    return img;

}