<template>
  <div class="container-fluid px-1 py-5 mx-auto">
    <div class="row d-flex justify-content-center">
      <div class="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
        <h3>Calcular Precios</h3>

        <div class="card">
          <h5 class="text-center mb-4">Ingrese los datos</h5>
          <form class="form-card" @submit.prevent="sendDataCar()">
            <div class="row justify-content-between text-left">
              <div class="form-group col-sm-6 flex-column d-flex">
                <label class="form-control-label px-3"
                  >Numero de placa<span class="text-danger"> *</span></label
                >
                <input
                  type="text"
                  name="fname"
                  v-model="car.plate"
                  style="text-transform: uppercase"
                />
              </div>
              <div class="form-group col-sm-6 flex-column d-flex">
                <label class="form-control-label px-3"
                  >Tipo de Vehículo<span class="text-danger"> *</span></label
                >
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="car.carType"
                >
                  <option selected>Seleccione el tipo de Vehículo</option>
                  <option value="COCHE">COCHE</option>
                  <option value="MICROBUS">MICROBUS</option>
                  <option value="FURGONETA">FURGONETA</option>
                  <option value="CAMION">CAMION</option>
                </select>
              </div>
            </div>
            <div class="row justify-content-between text-left">
              <div class="form-group col-sm-6 flex-column d-flex">
                <label class="form-control-label px-3"
                  >Precio Base<span class="text-danger"> *</span></label
                >
                <input type="number" step="0.01" v-model="basePrice" disabled />
              </div>
              <div class="form-group col-sm-6 flex-column d-flex">
                <label class="form-control-label px-3"
                  >Dias Alquilados<span class="text-danger"> *</span></label
                >
                <input type="number" v-model="car.numberOfDays" />
              </div>
              <div
                class="form-group col-sm-6 flex-column d-flex"
                v-if="car.carType === 'FURGONETA' || car.carType === 'CAMION'"
              >
                <label class="form-control-label px-3"
                  >Peso Maximo Autorizado <span class="text-danger"> </span
                ></label>
                <input type="number" step="0.01" v-model="pma" />
              </div>
            </div>

            <div class="row justify-content-between text-left">
              <div class="form-group col-12 flex-column d-flex">
                <label class="form-control-label px-3"
                  >Total a pagar<span class="text-danger"></span
                ></label>
                <input
                  type="number"
                  disabled
                  v-model="totalToPay"
                  step="0.01"
                />
              </div>
            </div>
            <div class="row justify-content-end">
              <div class="form-group col-sm-6">
                <button type="submit" class="btn btn-block btn-success">
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">PLACA</th>
          <th scope="col">TIPO VEHICULO</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="car in cars"
          :key="car.id"
          @click="viewDetail(car.plate)"
        >
          <th scope="row">{{ car.plate }}</th>
          <td>{{ car.carType }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ICar } from "../interface/car.interface";
import { CalculatePrices } from "../services/calculate-prices";
export default defineComponent({
  data() {
    return {
      car: {} as ICar,
      cars: [] as Array<ICar>,
      variablePrices: 0 as number | undefined,
      totalToPay: 0 as number,
      basePrice: 50 as number,
      pma: 0 as number,
    };
  },
  mounted() {
    this.getDataToCars();
  },
  methods: {
    async getDataToCars() {
      const response = await CalculatePrices.getDataCars();
      this.cars = response.data;
    },
    viewDetail(plate: string) {
      this.$router.push(`/${plate}` );
    },
    async sendDataCar() {
      try {
        if (this.car.carType === "COCHE") {
          this.variablePrices = 1.5;
          this.totalToPay =
            this.car.numberOfDays * (this.basePrice + this.variablePrices);
        }
        if (this.car.carType === "MICROBUS") {
          this.variablePrices = 2;
          this.totalToPay =
            this.car.numberOfDays * (this.basePrice + this.variablePrices);
        }
        if (this.car.carType === "FURGONETA") {
          this.variablePrices = 20;
          this.totalToPay =
            this.car.numberOfDays *
            (this.basePrice + this.variablePrices) *
            this.pma;
        }
        if (this.car.carType === "CAMION") {
          this.variablePrices = 2;
          this.totalToPay =
            this.car.numberOfDays * (this.basePrice + this.variablePrices);
        }
        let carPLate = this.car.plate.toUpperCase();
        this.car.plate = carPLate;
        this.car.variablePrices = this.variablePrices;
        this.car.totalToPay = this.totalToPay;
        this.car.basePrice = this.basePrice;

        const saveData = await CalculatePrices.sendData(this.car);
        console.log(saveData);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
    
  },
});
</script>


<style scoped>
body {
  color: #000;
  overflow-x: hidden;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.card {
  padding: 30px 40px;
  margin-top: 60px;
  margin-bottom: 60px;
  border: none !important;
  box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.2);
}
.blue-text {
  color: #00bcd4;
}
.form-control-label {
  margin-bottom: 0;
}
input,
textarea,
button {
  padding: 8px 15px;
  border-radius: 5px !important;
  margin: 5px 0px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  font-size: 18px !important;
  font-weight: 300;
}
input:focus,
textarea:focus {
  -moz-box-shadow: none !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  border: 1px solid #00bcd4;
  outline-width: 0;
  font-weight: 400;
}
.btn-block {
  text-transform: uppercase;
  font-size: 15px !important;
  font-weight: 400;
  height: 43px;
  cursor: pointer;
}
.btn-block:hover {
  color: #fff !important;
}
button:focus {
  -moz-box-shadow: none !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  outline-width: 0;
}
</style>