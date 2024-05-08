import { Editor } from "@tinymce/tinymce-react";
import uploadFile from "@/utils/upload";
// TinyMCE so the global var exists
// eslint-disable-next-line no-unused-vars
import tinymce from "tinymce/tinymce";
// DOM model
import "tinymce/models/dom/model";
// Theme
import "tinymce/themes/silver";
// Toolbar icons
import "tinymce/icons/default";
// Editor styles
import "tinymce/skins/ui/oxide/skin.min.css";

// importing the plugin js.
// if you use a plugin that is not listed here the editor will fail to load
import "tinymce/plugins/advlist";
import "tinymce/plugins/anchor";
import "tinymce/plugins/autolink";
import "tinymce/plugins/autoresize";
import "tinymce/plugins/autosave";
import "tinymce/plugins/charmap";
import "tinymce/plugins/code";
import "tinymce/plugins/codesample";
import "tinymce/plugins/directionality";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/help";
import "tinymce/plugins/image";
import "tinymce/plugins/importcss";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/media";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/preview";
import "tinymce/plugins/quickbars";
import "tinymce/plugins/save";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/table";
import "tinymce/plugins/template";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/wordcount";

// importing plugin resources
import "tinymce/plugins/emoticons/js/emojis";

// Content styles, including inline UI like fake cursors
// import contentCss from 'tinymce/skins/content/dark/content.min.css?raw';
// import contentUiCss from 'tinymce/skins/ui/oxide-dark/content.inline.min.css?raw';
// import skinCss from 'tinymce/skins/ui/oxide-dark/skin.css?url'
import "./css/content.css";
// import contentUiCss from './css/content.inline.css?raw'
import "./css/content.inline.css";
import "./css/skin.css";

export default function BundledEditor(props) {
  const { init, ...rest } = props;
  // note that skin and content_css is disabled to avoid the normal
  // loading process and is instead loaded as a string via content_style
  // console.log({init})
  return (
    <Editor
      apiKey="1sbhkejkzk9owvvikl43hj814a6ri0qed0c8pr53waolkm8q"
      init={{
        ...init,
        inline: true,
        skin: false,
        // content_css: contentCss,
        browser_spellcheck: true,
        contextmenu: false,
        image_title: true,
        file_picker_types: "image",
        // file_picker_callback: (cb, value, meta) => {
        //   const input = document.createElement('input');
        //   input.setAttribute('type', 'file');
        //   input.setAttribute('accept', 'image/*');

        //   input.addEventListener('change', (e) => {
        //     const file = e.target.files[0];

        //     const reader = new FileReader();
        //     reader.addEventListener('load', () => {
        //       /*
        //         Note: Now we need to register the blob in TinyMCEs image blob
        //         registry. In the next release this part hopefully won't be
        //         necessary, as we are looking to handle it internally.
        //       */
        //       const id = 'blobid' + (new Date()).getTime();
        //       const blobCache =  tinymce.activeEditor.editorUpload.blobCache;
        //       const base64 = reader.result.split(',')[1];
        //       const blobInfo = blobCache.create(id, file, base64);
        //       blobCache.add(blobInfo);

        //       /* call the callback and populate the Title field with the file name */
        //       cb(blobInfo.blobUri(), { title: file.name });
        //     });
        //     reader.readAsDataURL(file);
        //   });

        //   input.click();
        // },
        async images_upload_handler(blobInfo, progress) {
          const accessUrl = await uploadFile(blobInfo.blob());
          return accessUrl;
        },
        // content_style: [contentCss, init.content_style || ""].join("\n"),
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "media",
          "table",
          "wordcount",
          "autoresize",
        ],
        toolbar:
          "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | removeformat ",
      }}
      {...rest}
    />
  );
}
