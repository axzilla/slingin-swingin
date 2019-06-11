# codehustla.io - Gemeinsam werden wir bessere Entwickler
## Für jeden der Lust und Zeit hat an diesem Projekt mitzuwirken

### Production-Umgebung www.codehustla.io
### Staging-Umgebung https://codehustla-staging.herokuapp.com/

1. Create and setup .env files
2. Run "npm i" in root folder, "npm i" in packages/app and "npm i" in packages/api folder
3. Start app with "npm run dev"
4. Create features, debug code, have fun... Happy coding!!!

## api .env

MONGO_URI="i.e. mongodb://localhost:27017/name-to-your-app"  
SECRET_OR_KEY="use-any-secret-you-want"  
NODEMAILER_SERVICE="nodemailer-service"  
NODEMAILER_USER="nodemailer-user"  
NODEMAILER_PASS="nodemailer-pass"  
CLOUDINARY_API_KEY="cloudinary-api-key"  
CLOUDINARY_API_SECRET="cloudinary-api-secret"  
CLOUDINARY_CLOUD_NAME="cloudinary-cloud-name"  
CLOUDINARY_PATH_POST_TITLE="path-to-post-title"  
CLOUDINARY_PATH_USER_AVATAR="path-to-user-avatar"  
ENV_URL="http://localhost:3000 or https://www.example.io"

## app .env

SKIP_PREFLIGHT_CHECK=true  
GOOGLE_ANALYTICS_TRACKING_ID="Tracking-ID"
