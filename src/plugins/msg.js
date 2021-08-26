import Swal from 'sweetalert2'

const msg = {}

const swal = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-primary mx-2 btn-width-100',
        cancelButton: 'btn btn-danger mx-2 btn-width-100'
    },
    buttonsStyling: false,
    allowEscapeKey : false,
    allowOutsideClick: false
})

msg.show = (mensaje, icon) => {
    return swal.fire({
        text: mensaje,
        icon: icon,
        confirmButtonText: 'Aceptar'        
    })
}

msg.ok = (mensaje) => {
    return msg.show(mensaje, "")
}

msg.info = (mensaje) => {
    return msg.show(mensaje, "info")
}

msg.success = (mensaje) => {
    return msg.show(mensaje, "success");
}

msg.error = (mensaje) => {
    return msg.show(mensaje, "error")
}

msg.warning = (mensaje) => {
    return msg.show(mensaje, "warning")
}

msg.question = (mensaje, icon = 'question') => {
    return swal.fire({
        text: mensaje,
        icon: icon,
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    })
}

msg.install = (Vue) => {
    Vue.prototype.$msg = msg
}

export default msg