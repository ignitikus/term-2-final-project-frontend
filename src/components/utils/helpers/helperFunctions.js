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
   },

   getUserFromLS: () => {
      return JSON.parse(window.localStorage.getItem('user'))
   },

   addToLocalStorage: (key,data) =>{
      return window.localStorage.setItem(key, data)
   },
}