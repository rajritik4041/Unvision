const BASE_URL = "https://api.apnawebtech.online";

export const getUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`);
  return res.json();
};
// export async function predictBreed(file : File) {
//   const formData = new FormData();
//   formData.append("file", file);

//   const res = await fetch("https://api.apnawebtech.online/predict", {
//     method: "POST",
//     body: formData,
//   });

//   return await res.json();
// }
