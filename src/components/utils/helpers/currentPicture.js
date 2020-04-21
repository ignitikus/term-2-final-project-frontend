module.exports = {

   returnCurrentPic: (picStatus, props) => {
      return {
         status: picStatus,
         description: props.randomPicture.picture.description,
         urls: {
            thumb: props.randomPicture.picture.urls.thumb,
            full: props.randomPicture.picture.urls.full,
         }
      }
   }
   
}