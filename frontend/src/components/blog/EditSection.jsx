import React, { useEffect, useState } from "react";

function EditSection({ index, serveSectionData, section }) {
  const [type, setType] = useState("SUBTITLE");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [subtitle, setSubtitle] = useState("");

  useEffect(() => {
    if (type === "SUBTITLE" && subtitle) {
      serveSectionData({ type, subtitle }, index);
    } else if (type === "IMAGE" && image) {
      serveSectionData({ type, image }, index);
    } else if(type === "DESCRIPTION" && description){
      serveSectionData({ type, description }, index);
    }
  }, [subtitle, description, image]);

  useEffect(() => {
    if (section) {
      setType(section?.type);
      if (section?.type === "SUBTITLE") {
        setSubtitle(section?.subtitle);
      } else if (section?.type === "IMAGE") {
        setImageURL(section?.image instanceof File ? URL.createObjectURL(section?.image) : section?.image);
      } else {
        setDescription(section?.description);
      }
    }
  }, [section]);

  const handleImage = (e) => {
    setImageURL(URL.createObjectURL(e.target.files[0]))
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <div className="flex flex-col px-5 gap-1">
        <label htmlFor="#type">Type</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="select-type1"
        >
          <option value="SUBTITLE">SubTitle</option>
          <option value="IMAGE">Image</option>
          <option value="DESCRIPTION">Description</option>
        </select>
      </div>

      {type === "DESCRIPTION" ? (
        <div className="flex flex-col px-5 gap-1">
          <label htmlFor="#desc">Enter the Description</label>
          <textarea
            id="desc"
            className="textarea-type1"
            value={description}
            rows={5}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
      ) : type === "SUBTITLE" ? (
        <div className="flex flex-col px-5 gap-1">
          <label htmlFor="#subtitle">Enter the Subtitle</label>
          <textarea
            id="subtitle"
            className="textarea-type1"
            value={subtitle}
            rows={5}
            onChange={(e) => setSubtitle(e.target.value)}
          ></textarea>
        </div>
      ) : (
        <div className="flex flex-col px-5 gap-1">
          <label htmlFor="#image">Image</label>
          <input
            type="file"
            id="image"
            onChange={handleImage}
            className="inp-type1"
          />
          {imageURL && (
            <div className="h-[200px]">
              <img src={imageURL} alt="Image" className="h-full object-cover" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default EditSection;
