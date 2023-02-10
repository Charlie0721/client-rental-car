<template>
  <div class="container ">
    <br>
    <h2>Datos del vehiculo con placa: {{ typeCar.plate }}</h2>
    <br>
    <div class="card" v-for="item in car" :key="item.id">
    
      <div class="card-body">{{ item.carType }}</div>
      <h6 class="card-subtitle mb-2 text-muted">Dias alquilados: {{ item.numberOfDays }}</h6>
      <p class="card-text">Total pagado: $ {{ item.totalToPay }}</p>
    </div>
    <br>
  </div>
</template>

<script lang="ts">
import { ICar } from "@/interface/car.interface";
import { CalculatePrices } from "@/services/calculate-prices";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      car: [] as Array<ICar>,
      typeCar: "" as string,
      plate: "" as string,
    };
  },
  mounted() {
    this.getDataCar();
  },
  methods: {
    async getDataCar() {
      let plate = this.$route.params.plate;

      const response = await CalculatePrices.getDataCar(plate);

      this.car = response.data;
      this.typeCar = response.data[0];
      console.log(this.typeCar);
    },
  },
});
</script>
