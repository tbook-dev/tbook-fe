// import { Editor } from "@tinymce/tinymce-react";
import BundledEditor from './BundledEditor'

export default function FormItem({ onChange, value }) {
  return (
    <BundledEditor
      init={{
        selector: 'textarea',
        menubar: false,
        // theme: "oxide-dark",
        // inline: true,
        // plugins:
        //   "autoresize mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
        // toolbar:
        //   "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
        plugins: [
          'advlist', 'anchor', 'autolink', 'image', 'link', 'lists',
          'searchreplace', 'table', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat',
      }}
      value={value}
      onEditorChange={(v) => {
        console.log(v);
        onChange(v);
      }}
    />
  );
}
