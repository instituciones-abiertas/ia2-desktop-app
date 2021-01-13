export default function convertToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (file.name !== undefined) {
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => console.log(error);
    } else {
      resolve();
    }
  });
}
