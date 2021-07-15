import { useState, useEffect } from "react";
import web3 from "./web3";
import lottery from "./lottery";

const App = () => {
  const [owner, setOwner] = useState("");
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [totalAmount, setTotalAmount] = useState("");
  const [inTransaction, setInTransaction] = useState(false);

  useEffect(() => {
    lottery.methods.owner().call().then(setOwner);
    lottery.methods.getNumberOfPlayers().call().then(setNumberOfPlayers);
    web3.eth
      .getBalance(lottery.options.address)
      .then((wei) => setTotalAmount(web3.utils.fromWei(wei, "ether")));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const accounts = await web3.eth.getAccounts();

    setInTransaction(true);

    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei("0.001"),
      });
    } catch (err) {}

    setInTransaction(false);
  };

  const onClick = async (e) => {
    const accounts = await web3.eth.getAccounts();

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });
  };

  return (
    <>
      <h1>Welcome to the lottery!</h1>
      <p>This lottery is owned by: {owner}</p>
      <br />
      <p>
        Currently, there are {numberOfPlayers} in the race, for a whooping sum
        of {totalAmount} ether!
      </p>
      <hr />
      {inTransaction && <p>Waiting for transaction to finish...</p>}
      <form onSubmit={onSubmit}>
        <h4>Want to enter?</h4>
        <button>Enter with 0.001 ether</button>
      </form>
      <hr />
      <h4>Let's pick a winner!</h4>
      <button onClick={onClick}>Pick a winner</button>
    </>
  );
};

export default App;
