const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { data, abi } = require("./solidity/Lottery.json");

const provider = new HDWalletProvider(process.env["WALLET_PASSPHRASE"], process.env["NODE_ENDPOINT"]);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: data.bytecode.object})
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to: ", result.options.address);
};
deploy()