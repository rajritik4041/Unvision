"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

type FormDataType = {
  file: FileList;
};

function Main() {
  const { register, handleSubmit } = useForm<FormDataType>();
  const [image, setImage] = useState<File | null>(null);
  const setData = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) { setImage(e.target.files[0]); }
  };
  const onSubmit = async (data: FormDataType) => {
    const formData = new FormData();
    if (data.file && data.file.length > 0) { formData.append("file", data.file[0]); }
    else if (image) { formData.append("file", image); }
    else { alert("Please select file"); return; }
    await fetch("/api/upload", { method: "POST", body: formData, });
  };

  return (
    <div>
      <div className="flex justify-center items-center m-1.5">
        <div>
          <li className="m-1.5">
            <Link href="/reviews">Reviews</Link>
          </li>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label>ENTER FILE :-</label>

          <input
            type="file"
            accept="image/*"
            className="border-2 w-52 p-1 m-1.5"
            {...register("file")}
            onChange={setData}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default Main;