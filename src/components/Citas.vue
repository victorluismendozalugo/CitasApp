  <template>
  <div>
    <b-button v-b-modal.modal-xl variant="dark" @click="abrirModal"
      >Aparta tu cita</b-button
    >

    <b-modal
      id="modal-xl"
      size="xl"
      title="Citas"
      hide-header
      no-close-on-backdrop
    >
      <b-row>
        <b-col>
          <b-calendar
            v-model="cita.citaFecha"
            style="border-radius: 9px"
            v-bind="labels[locale] || {}"
            :locale="locale"
            :hide-header="hideHeader"
            @context="onContext"
            :date-disabled-fn="dateDisabled"
            :min="minDate"
          ></b-calendar>
        </b-col>
        <b-col>
          <div>
            <b-form-group>
              <br />
              <b-form-checkbox-group
                class="flex-wrap"
                v-model="horariosSelected"
                style="column-count: 2"
                :options="horariosDisponibles"
                buttons
                button-variant="primary"
                name="buttons-2"
                :state="state"
              ></b-form-checkbox-group>
              <b-form-invalid-feedback :state="state"
                >Seleccione un horario</b-form-invalid-feedback
              >
              <b-form-valid-feedback :state="state"
                >Gracias</b-form-valid-feedback
              >
            </b-form-group>
          </div>
        </b-col>
      </b-row>

      <br />
      <b-row>
        <b-card>
          <label>Seleccione el motivo de su cita</label>
          <b-card-body>
            <b-select
              v-model="cita.citaTipo"
              class="form-control"
              style="border-radius: 9px"
            >
              <b-form-select-option value="0">Motivo</b-form-select-option>
              <option
                v-for="item in motivos"
                :key="item.tipoID"
                :value="item.tipoID"
                style="border-radius: 20px"
                class="dropdown-item"
              >
                {{ item.tipoDescripcion }}
              </option>
            </b-select>
          </b-card-body>
        </b-card>
      </b-row>

      <br />
      <b-row>
        <b-card>
          <label>Favor de ingresar sus datos</label>
          <b-card-body>
            <div class="col-12">
              <div class="form-group row">
                <div class="col-sm-4 col-md-4 col-lg-3 col-xl-3">
                  <b-form-input
                    id="input-1"
                    v-model="cita.clienteNombre"
                    placeholder="Nombre"
                    required
                    maxlength="20"
                    @input="
                      (v) => {
                        cita.clienteNombre = v.toUpperCase();
                      }
                    "
                  ></b-form-input>
                </div>
                <div class="col-sm-4 col-md-4 col-lg-3 col-xl-3">
                  <b-form-input
                    id="input-2"
                    v-model="cita.clienteAp"
                    placeholder="Apellido"
                    required
                    maxlength="20"
                    @input="
                      (v) => {
                        cita.clienteAp = v.toUpperCase();
                      }
                    "
                  ></b-form-input>
                </div>
                <div class="col-sm-4 col-md-4 col-lg-3 col-xl-3">
                  <b-form-input
                    id="input-3"
                    v-model="cita.clienteEmail"
                    type="email"
                    placeholder="Correo"
                    required
                    maxlength="100"
                    @input="
                      (v) => {
                        cita.clienteEmail = v.toUpperCase();
                      }
                    "
                  ></b-form-input>
                </div>
                <div class="col-sm-4 col-md-3 col-lg-3 col-xl-3">
                  <b-form-input
                    id="input-4"
                    v-model="cita.clienteTelefono"
                    type="text"
                    placeholder="Teléfono"
                    required
                    maxlength="10"
                  ></b-form-input>
                </div>
              </div>
            </div>
          </b-card-body>
        </b-card>
      </b-row>
      <template #modal-footer>
        <div class="mt-3">
          <b-button-group>
            <p class="float-left"></p>
            <b-button
              variant="primary"
              size="sm"
              class="float-left"
              @click="hide"
            >
              Cerrar
            </b-button>
            <p class="float-right"></p>
            <b-button
              variant="success"
              size="sm"
              class="float-right"
              @click="registrarCita()"
            >
              Registrar cita
            </b-button>
          </b-button-group>
        </div>
      </template>
    </b-modal>
  </div>
</template>
  <script>
import servicioCitas from "../services/servicio-citas.js";
export default {
  name: "Citas",
  data() {
    return {
      cita: {
        citaID: 0,
        citaTipo: 0,
        clienteNombre: "",
        clienteAp: "",
        clienteTelefono: "",
        clienteEmail: "",
        citaFecha: "",
        sucursalID: 1,
        citaDiaID: 0,
      },
      motivos: [],
      context: null,
      showDecadeNav: false,
      hideHeader: true,
      locale: "es-MX",
      labels: {
        "es-MX": {
          weekdayHeaderFormat: "narrow",
          labelPrevDecade: "Década anterior",
          labelPrevYear: "Año anterior",
          labelPrevMonth: "Mes anterior",
          labelCurrentMonth: "Mes actual",
          labelNextMonth: "Próximo mes",
          labelNextYear: "Próximo año",
          labelNextDecade: "Próxima década",
          labelToday: "Hoy",
          labelSelected: "Fecha seleccionada",
          labelNoDateSelected: "Sin fecha seleccionada",
          labelCalendar: "Calendario",
          labelNav: "Navegación por calendario",
          labelHelp: "Use las teclas de flecha para navegar por el calendario",
        },
      },
      horariosSelected: [],
      horariosDisponibles: [],
      text: "",
      minDate: "",
    };
  },
  mounted() {
    this.getMotivosCitas();
    this.obtieneFechaMinima();
  },
  computed: {
    state() {
      this.verificaChecks();
      return this.horariosSelected.length === 1;
    },
  },
  methods: {
    abrirModal() {
      this.$bvModal.show("modal-xl");
    },
    hide() {
      this.$bvModal.hide("modal-xl");
    },
    onContext(ctx) {
      this.context = ctx;
      this.obtieneHorariosDisponibles();
    },
    dateDisabled(ymd, date) {
      const weekday = date.getDay();
      const day = date.getDate();
      return weekday === 0;
    },
    verificaChecks() {
      this.cita.citaDiaID = this.horariosSelected[0];
      if (this.horariosSelected.length > 1) {
        this.$msg.error("Solamente puede seleccionar un horario");
        this.horariosSelected = [];
        this.cita.citaDiaID = 0;
      }
    },
    obtieneHorariosDisponibles() {
      if (this.cita.citaFecha != "") {
        this.horariosDisponibles = [];
        this.horariosSelected = [];
        servicioCitas
          .citasXdia({
            SucursalID: 1,
            CitaFecha: this.cita.citaFecha,
          })
          .then(async (r) => {
            if (r.value) {
              var datos = r.data.data;
              for (var i = 0; i < datos.length; i++) {
                var horario = {
                  text: datos[i].citaHora,
                  value: datos[i].citaID,
                  disabled: datos[i].estatusCitaHora,
                };
                this.horariosDisponibles.push(horario);
              }
            } else {
              await this.$msg.warning(r.message);
            }
          })
          .catch(async (r) => {
            await this.$msg.error("El servicio no se encuentra disponible");
          });
      }
    },
    getMotivosCitas() {
      servicioCitas
        .citasMotivos({
          SucursalID: 1,
          TipoID: 0,
        })
        .then(async (r) => {
          r.value
            ? (this.motivos = r.data.data)
            : await this.$msg.warning(r.message);
        })
        .catch(async (r) => {
          await this.$msg.error("El servicio no se encuentra disponible");
        });
    },
    validarDatos() {
      if (
        this.cita.citaTipo == 0 ||
        this.cita.clienteNombre == "" ||
        this.cita.clienteAp == "" ||
        this.cita.clienteTelefono == "" ||
        this.cita.clienteEmail == "" ||
        this.cita.citaFecha == "" ||
        this.cita.citaDiaID == 0
      ) {
        this.$msg.error(
          "Favor de registrar todos los datos para hacer el registro de su cita"
        );
        return false;
      } else {
        return true;
      }
    },
    registrarCita() {
      if (this.validarDatos()) {
        servicioCitas
          .citasGuardar(this.cita)
          .then(async (r) => {
            if (r.data.codigoError == 1) {
              this.$msg.error(r.message);
            } else {
              this.$msg.ok(r.message);
              this.inicializarCampos()
              this.hide();
            }
          })
          .catch(async (r) => {
            await this.$msg.error("El servicio no se encuentra disponible");
          });
      }
    },
    obtieneFechaMinima() {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1);
      this.minDate = new Date(today);
    },
    inicializarCampos() {
      this.cita.citaID = 0;
      this.cita.citaTipo = 0;
      this.cita.clienteNombre = "";
      this.cita.clienteAp = "";
      this.cita.clienteTelefono = "";
      this.cita.clienteEmail = "";
      this.cita.citaFecha = "";
      this.cita.sucursalID = 1;
      this.cita.citaDiaID = 0;
      this.horariosDisponibles = [];
      this.horariosSelected = [];
    },
  },
};
</script>