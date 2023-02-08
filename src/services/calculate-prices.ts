import axios from "./axios"

export class CalculatePrices{

static sendData=async (data:any)=>await axios.post('/car', data)
static getDataCars=async()=>await axios.get('/car')
static getDataCar=async(plate:string)=>await axios.get('/car/'+plate)

}