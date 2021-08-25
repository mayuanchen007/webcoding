import axios from "axios";

export  const getCurrentCity= function() {
    const localCity = window.localStorage.getItem('cur-city');
    if (!localCity) {
        return new Promise((resolve, reject) => {
            try {
                var myCity = new window.BMapGL.LocalCity();
                myCity.get(async (result)=>{
                   const {data:res}=await axios.get('http://localhost:8080/area/info',{params:{name:result.name}});
                   resolve(res.body.label);
                   window.localStorage.setItem('cur-city',JSON.stringify(res.body.label));
                });

            } catch (error) {
                reject(error)
            }
        });
    }
    return  Promise.resolve(JSON.parse(localCity))
}