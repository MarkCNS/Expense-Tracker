import { useState } from "react";
import "./App.css";
import Card from "./components/card";
import Button from "./components/button";
import Input from "./components/input";
// import { trash-can-list } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  const [totalBlnc, setTotalBlnc] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);

  const addTransec = () => {
    const newTransaction = {
      id: Math.floor(Math.random() * 100),
      text: text,
      amount: Number(amount),
    };

    {
      newTransaction.amount === 0
        ? alert("Amount cannot be empty or 0")
        : setTransactions([newTransaction, ...transactions]);
      setTotalBlnc(totalBlnc + Number(amount));

      {
        amount < 0
          ? setExpense(expense + Number(amount))
          : setIncome(income + Number(amount));
      }
      setAmount("");
      setText("");
    }
  };

  const delTransec = (id, amount) => {
    const afterDel = transactions.filter((item) => item.id !== id);
    console.log(id);
    setTransactions(afterDel);
    setTotalBlnc(totalBlnc - Number(amount));
    {
      amount < 0
        ? setExpense(expense - Number(amount))
        : setIncome(income - Number(amount));
    }
  };

  return (
    <div className="App">
      <Card>
        <div className="t-title">
          <h1>Expense Tracker</h1>
        </div>
        <div className="blnc-counter">
          <p className="blnc-a">Your Balance</p>
          <p className="blnc-b">${totalBlnc}</p>
        </div>
        <div className="real-counter">
          <div>
            <h4>Income</h4>
            <p className="inc-counter">${income}</p>
          </div>
          <div>
            <h4>Expense</h4>
            <p className="exp-counter">${Math.abs(expense)}</p>
          </div>
        </div>
        <div className="hist">
          <h3>History</h3>
          {transactions.length > 0 ? (
            <ul className="hist-list">
              {transactions.map((item, i) => (
                <li key={i}>
                  <div className="list-spread">{item.text}</div>
                  <div>{item.amount}</div>
                  <Button
                    type="button"
                    className="del-transec"
                    children="Delete"
                    onClick={() => delTransec(item.id, item.amount)}
                  />
                  {item.amount < 0 ? (
                    <div className="dot"></div>
                  ) : (
                    <div className="dot-green"></div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="noData">No Data Found</div>
          )}
        </div>
        <div className="transec">
          <h3>Add new transaction</h3>
          <div className="transec-list">
            {/* <label className="t-transec">Text</label> */}
            <Input
              className="text-input"
              type="text"
              label="Text"
              variant="outlined"
              size="small"
              margin="normal"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text..."
            />

            <label className="amt-transec">
              Amount
              <br />
              (negative-expense, positive-income)
            </label>
            {/* <div className="amount-box">
              <span className="prefix">$</span>
              <span className="suffix"> */}
            <Input
              type="number"
              className="currency-field"
              id="currency-field"
              label="Amount ( -ve = expense, +ve (default) = income )"
              variant="outlined"
              size="small"
              margin="normal"
              placeholder="$ 1,000,000.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {/* </span>
            </div> */}
            <Button
              type="button"
              className="add-transec"
              children="Add transaction"
              onClick={addTransec}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default App;
