import axios from "./axios"

export class CalculatePrices{

static sendData=async (data:any)=>await axios.post('/car', data)
static getDataCar=async()=>await axios.get('/car')
static getDataCars=async(plate:string)=>await axios.get('/car/'+plate)

}