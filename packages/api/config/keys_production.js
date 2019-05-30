module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.SECRET_OR_KEY,
  nodemailerService: process.env.NODEMAILER_SERVICE,
  nodemailerUser: process.env.NODEMAILER_USER,
  nodemailerPass: process.env.NODEMAILER_PASS,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  cloudinary_path_user_avatar: process.env.CLOUDINARY_PATH_USER_AVATAR,
  cloudinary_path_post_title: process.env.CLOUDINARY_PATH_POST_TITLE,
  envAPI: process.env.ENV_API
}
