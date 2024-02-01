import BundledEditor from "./BundledEditor";

export default function FormItem({ onChange, value, placeholder }) {
  return (
    <BundledEditor
      init={{
        selector: "textarea",
        menubar: false,
      }}
      placeholder={placeholder}
      value={value}
      onEditorChange={(v) => {
        onChange(v);
      }}
    />
  );
}
