module.exports = {

   returnCurrentPic: (picStatus, props) => {
      return {
         status: picStatus,
         description: props.randomPicture.picture.description,
         urls: {
            raw: props.randomPicture.picture.urls.raw,
            full: props.randomPicture.picture.urls.full,
         }
      }
   }
   
}