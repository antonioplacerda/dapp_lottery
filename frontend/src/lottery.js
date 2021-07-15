import web3 from "./web3";

const address = '0xEE7F2cD64543fe47BE2cae452510131b829D60fd'

const { abi } = require("../contracts/solidity/Lottery.json");

export default new web3.eth.Contract(abi, address);