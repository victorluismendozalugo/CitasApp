import axios from 'axios'
import configService from './config'
import Swal from 'sweetalert2'

let isAlreadyFetchingAccessToken = false

const servicio = axios.create({
    headers: { 'api-key': 123 },
    baseURL: configService.apiUrl,
})

servicio.interceptors.request.use(
    config => {
        let token = window.localStorage.token
        if (token)
            config.headers.authorization = `Bearer ${token}`

        return config
    },
    error => {
        Swal.fire({
            text: 'Ocurrio un error al realizar la peticion al servidor',
            icon: 'warning'
        })
        return Promise.reject(error)
    }
)

servicio.interceptors.response.use(

    response => {
        return response;
    },
    error => {
        console.log("error-51", error)

        const { config, response } = error
        const originalRequest = config
        if (response != null) {
            if (response.status === 401) {
                //console.log("Unauthorized! :(") 

                if (!isAlreadyFetchingAccessToken) {
                    isAlreadyFetchingAccessToken = true

                    const serv = axios.create({
                        baseURL: configService.apiUrl,
                    })

                    // serv.post('/seguridad/renovar-token', { "refresh_token": window.localStorage.refreshToken })
                    //     .then(response => {
                    //         isAlreadyFetchingAccessToken = false

                    //         let token = response.data.accessToken

                    //         window.localStorage.token = token
                    //         window.localStorage.expiresIn = response.data.expiresIn
                    //         window.localStorage.refreshToken = response.data.refreshToken

                    //         window.localStorage.user = window.atob(
                    //             token.split(".")[1]
                    //         )

                    //         originalRequest.headers.Authorization = `Bearer ${token}`
                    //         axios(originalRequest)
                    //     })
                    //     .catch(error => {
                    //         console.error(error)
                    //     })
                }
            }
            else {
                Swal.fire({
                    text: 'La sesión ha caducado',
                    icon: 'warning'
                })
            }
        }
        return Promise.reject(error)
    })

export default servicio