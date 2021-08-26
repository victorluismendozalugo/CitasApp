import servicioBase from '@/services/base'

const servicio = {};


servicio.citasXdia = (datos) => {
    return servicioBase.post("citas/citas/dia", datos)
        .then(r => {
            return r.data
        })
        .catch(err => {
            console.log(err);
        })
}

servicio.citasGuardar = (datos) => {
    return servicioBase.post("citas/citas/guardar", datos)
        .then(r => {
            return r.data
        })
        .catch(err => {
            console.log(err);
        })
}

servicio.citasMotivos = (datos) => {
    return servicioBase.post("citas/tipos", datos)
        .then(r => {
            return r.data
        })
        .catch(err => {
            console.log(err);
        })
}

export default servicio