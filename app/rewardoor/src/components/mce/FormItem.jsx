import BundledEditor from "./BundledEditor";

export default function FormItem({ onChange, value }) {
  return (
    <BundledEditor
      init={{
        selector: "textarea",
        menubar: false,
      }}
      value={value}
      onEditorChange={(v) => {
        console.log(v);
        onChange(v);
      }}
    />
  );
}
