import Swal from 'sweetalert2'

const swal = {}

swal.install = function(Vue){
    Vue.prototype.$swal = Swal;
}

export default swal;