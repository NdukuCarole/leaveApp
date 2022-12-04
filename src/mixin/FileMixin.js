import fileType from "file-type";

export default {
  methods: {
    pageCount: function (value) {
      if (!value) return 0;
      const bin = atob(value);
      return bin.match(/\/Type\s*\/Page\b/g).length;
    },

    downloadFile: async function (attachment, filename = "") {
      const myBuffer = Buffer.from(attachment, "base64");
      const res = await fileType.fromBuffer(myBuffer);

      const path = `data:${res.mime})};base64,${attachment}`;
      let ext = res.mime.split("/");
      ext = ext.pop();

      switch (ext) {
        case "pdf":
          ext = "pdf";
          break;
        case "vnd.openxmlformats-officedocument.wordprocessingml.document":
          ext = "docx";
          break;
        case "vnd.openxmlformats-officedocument.spreadsheetml.sheet":
          ext = "xlsx";
          break;
        case "jpeg":
        case "jpg":
          ext = "jpeg";
          break;
        case "png":
          ext = "png";
          break;
        default:
          ext = "pdf";
      }

      const filePath = filename || `attachment.${ext}`;

      const element = document.createElement("a");
      element.setAttribute("href", path);
      element.setAttribute("download", `${filePath}`);
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    },
  },
};
