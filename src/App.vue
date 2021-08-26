<template>
  <div id="app">
    <citas/>
  </div>
</template>

<script>
import Citas from "./components/Citas.vue";
export default {
  name: "App",
  components: {
    Citas,
  },
  data() {
    return {
    };
  },
  mounted() {
    // this.getProds();
  },
  methods: {
    // getProds() {
    //   var datos = {
    //     productoID: 0,
    //     productoSucID: 1,
    //   };
    //   servicioProductos
    //     .productosCon(datos)
    //     .then(async (r) => {
    //       if (r.value) {
    //         this.productos = r.data.data;
    //       } else {
    //         await this.$msg.warning(r.message);
    //       }
    //     })
    //     .catch(async (r) => {
    //       await this.$msg.error("El servicio no se encuentra disponible");
    //     });
    //}
    // getProdsFitrados() {
    //   this.productos = [];
    //   var datos = {
    //     ProdColorID: this.$store.state.colorID,
    //     ProdEstiloID: this.$store.state.estiloID,
    //     ProdTallaID: this.$store.state.tallaID,
    //     ProdTemporadaID: this.$store.state.temporalidadID,
    //     ProdTerminadoID: this.$store.state.terminadoID,
    //     ProductoSucID: 1,
    //   };
    //   servicioProductos
    //     .productosFiltros(datos)
    //     .then(async (r) => {
    //       if (r.value) {
    //         this.productos = r.data.data;
    //         if (this.productos.length==0) {
    //            await this.$msg.warning("No se encontraron productos con las caracteristicas proporcionadas");
    //         }
    //       } else {
    //         await this.$msg.warning(r.message);
    //       }
    //     })
    //     .catch(async (r) => {
    //       await this.$msg.error("El servicio no se encuentra disponible");
    //     });
    // },
    // limpiarBusqueda() {
    //   window.history.go();
    //   this.$store.commit("setColor", 0);
    //   this.$store.commit("setEstilo", 0);
    //   this.$store.commit("setTalla", 0);
    //   this.$store.commit("setTempo", 0);
    //   this.$store.commit("setTerm", 0);
    // },
  },
};
</script>

<style>
/* .v-application--wrap {
  min-height: 0vh !important;
} */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>