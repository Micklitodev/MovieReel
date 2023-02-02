const endpoint = 'https://www.google.com/'
const apiKey = '*hasidufhD-08md09spau8mr4'


const apiEngine = async () => {
   const path = 'test/api'
   const queryParams = `?my_api=${apiKey}`
   const url = `${endpoint}${path}${queryParams}`
   
   try{
    const response = await fetch(url)
    if (response.ok) {
        const jsonResponse = response.json()
        return jsonResponse
    }

   }catch(Error) {
    console.log(Error)
   }
}           


