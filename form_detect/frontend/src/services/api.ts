const BASE_URL = "http://localhost:8000";

export const getUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`);
  return res.json();
};
// export async function predictBreed(file : File) {
//   const formData = new FormData();
//   formData.append("file", file);

//   const res = await fetch("http://127.0.0.1:8000/predict", {
//     method: "POST",
//     body: formData,
//   });

//   return await res.json();
// }
