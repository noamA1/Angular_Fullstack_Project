const { upload } = require("../common/helper");

exports.uploadCategoryImage = (req, res) => {
  res.json({ url: `${upload.getDestination}` + upload.getFilename });
};

// vacationsRouter.post(
//     `${generalSetting.baseUrl}/vacation-image`,
//     upload.single("file"),
//     (req, res) => {
//       res.json({ url: `${upload.getDestination}` + upload.getFilename });
//     }
//   );
