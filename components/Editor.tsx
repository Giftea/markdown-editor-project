import React, { useState, useMemo } from "react";
import SimpleMDEditor from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from 'axios'

type ImageUploadType = {
   (image: File, 
   onSuccess: (url: string) => void, 
   onError: (errorMessage: string) => void) : void
}

const Editor = () => {
  const [value, setValue] = useState("");

  const onChange = (value: string) => {
    setValue(value);
  };

  const imageUpload:ImageUploadType  = async (image, onSuccess, onError) => {
  
    try {
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'igtpzjq7');
      const res = await axios.post('https://api.cloudinary.com/v1_1/dvxrsopw3/image/upload', data);
      const { secure_url } = res.data;
      onSuccess(secure_url)
    } catch (error) {    
        console.error(error)
    }
  }

  const newOptions = useMemo(() => {
    return {
      spellChecker: false,
      showIcons: ["strikethrough", "table", "code", "upload-image"],
      hideIcons: ["bold", "image"],
      uploadImage: true,
      imageUploadFunction: imageUpload,
    };
  }, []);


  return <SimpleMDEditor
            id="editor" 
            value={value} 
            onChange={onChange} 
            options={newOptions}
            />;
};

export default Editor;
