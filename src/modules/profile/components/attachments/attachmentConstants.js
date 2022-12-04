export default {
  attachment: "attachment/save",
  getAttachments: "attachment",
  delAttachment: "attachment/delete",
  attachmentDocTypes: "setup/attachmentDocTypes",
  GETATTACH: (id) => `attachment/${id}`,
  updateAttachment: "attachment/update",
  SINGLE: (id) => `attachment/line/${id}`,
};
