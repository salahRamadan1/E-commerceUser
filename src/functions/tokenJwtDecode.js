import { jwtDecode } from "jwt-decode"

var imgUrl = 'http://localhost:3001/profilePicture/';
const handleVerifyToken = () => {

    if (localStorage.getItem('userToken')) {

        const token = localStorage.getItem('userToken')
        var user = jwtDecode(token)
        console.log(user);
    }
}

export { handleVerifyToken, imgUrl }