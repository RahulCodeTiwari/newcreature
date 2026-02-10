import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const RichTextEditor = ({ value, onChange }) => {
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        [{ header: false }],
        [{ header: 2 }, { header: 3 }, { header: 4 }],
        ["bold", "italic", "underline"],
        ["link"],
        ["clean"],
      ],
    },
    formats: [
      "header",
      "bold",
      "italic",
      "underline",
      "list",
      "link",
    ],
  });

  useEffect(() => {
    if (!quill) return;

    // set initial value
    if (value) {
      quill.root.innerHTML = value;
    }

    quill.on("text-change", () => {
      onChange(quill.root.innerHTML);
    });
  }, [quill]);

  return <div className="bg-white" ref={quillRef} />;
};

export default RichTextEditor;
