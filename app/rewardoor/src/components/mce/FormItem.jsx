import BundledEditor from "./BundledEditor";

export default function FormItem({ onChange, value, placeholder,...props }) {
  console.log({props})
  return (
    <BundledEditor
      init={{
        selector: "textarea",
        menubar: false,
        placeholder
      }}
      value={value}
      onEditorChange={(v) => {
        onChange(v);
      }}
    />
  );
}
