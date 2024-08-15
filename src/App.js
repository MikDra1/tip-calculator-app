import { useState } from "react";
import dollarBill from './images/icon-dollar.svg'
import personIcon from './images/icon-person.svg'

export default function  App() {
  const [bill, setBill] = useState('');
  const [custom, setCustom] = useState('');
  const [people, setPeople] = useState('');
  const [percent, setPercent] = useState('')
  const personZero = +people === 0 ? people === '' ? false : true : false
  const tip = custom ? custom : percent;
  const tipAmount = Number.isFinite(+bill * (+tip / 100) / +people) ? (+bill * (+tip / 100) / +people).toFixed(2) : "0"
  const total = Number.isFinite(+bill / +people + +tipAmount * 2) ? ((+bill / +people + +tipAmount )).toFixed(2) : '0'

  function handleCustomChange(value) {
    setCustom('')
    setPercent(value)
  }

  function handleReset() {
    setBill('')
    setCustom('')
    setPeople('')
    setPercent('')
  }

  return (
    <main className="container">
      <h1>Spli<br></br>tter</h1>
      <div className="card">
        <CardTop bill={bill} onBill={setBill} custom={custom} onCustom={setCustom} people={people} setPeople={setPeople} onCustomChange={handleCustomChange} tip={tip} personZero={personZero}/>
        <CardBottom tipAmount={tipAmount} total={total} handleReset={handleReset}/>
      </div>
    </main>
  );
}

function CardTop({bill, onBill, custom, onCustom, people,onCustomChange, tip, personZero, setPeople}) {
  return (
    <div className="card__top">
      <div className="bill">
      <label className="label bill__label" for="bill">Bill</label>
      <div className="input--content">
        <img src={dollarBill} alt="" className="icon"/>
      <input className="input bill__input" value={bill} type="text" id="bill"  onChange={(e) => {onBill(e.target.value.replace(',', '.'))}} placeholder="0"/>
      </div>
      </div>

      <p className="select__tip--title">Select Tip %</p>
      <div className="tip">


      <Button tip={tip} custom={custom} value={5} onCustomChange={onCustomChange}>5%</Button>
      <Button tip={tip} custom={custom} value={10} onCustomChange={onCustomChange}>10%</Button>
      <Button tip={tip} custom={custom} value={15} onCustomChange={onCustomChange}>15%</Button>
      <Button tip={tip} custom={custom} value={25} onCustomChange={onCustomChange}>25%</Button>
      <Button tip={tip} custom={custom} value={50} onCustomChange={onCustomChange}>50%</Button>

      <input className="custom--input" type="text" placeholder="Custom" value={custom} onChange={e => onCustom(e.target.value)}/>
      </div>

      <div className="people__count">
        <label className="label people__label" for="people">Number of People</label>

        <span className={`people--error ${personZero ? 'display--block' : ''}`}>Can't be zero</span>

        <div className={`input--content ${personZero ? 'input--red' : ''}`}><img src={personIcon} alt="" className="icon"/>
        <input className="input people__input" type="text" value={personZero ? '' : people} onChange={e => setPeople(e.target.value)} placeholder="0"/>
        </div>
      </div>
    </div>
  );
}

function CardBottom({tipAmount, total, handleReset}) {
  return <div className="card__bottom">
    <div className="total__amount">
      <div >
        <p>Tip Amount</p>
        <span className="person--text">/ person</span>
      </div>
      <h2>${tipAmount === '0' ? `${tipAmount}.00` : tipAmount}</h2>
    </div>


    <div className="total__amount">
      <div >
        <p>Total</p>
        <span className="person--text">/ person</span>
      </div>
      <h2>${total === '0' ? `${total}.00` : total}</h2>
    </div>

  <button className="btn__reset" onClick={handleReset}>RESET</button>
  </div>
}

function Button({children, onCustomChange, value, tip, custom}) {
  return <button className={`btn__tip ${custom ? '' : tip === value ? 'btn__tip--active' : ''}`} onClick={() => onCustomChange(value)}>{children}</button>
}
