import { useState } from "react";
import { ReactComponent as DollarIcon } from "../../assets/images/icon-dollar.svg";
import { ReactComponent as PersonIcon } from "../../assets/images/icon-person.svg";
import "./calculator.styles.scss";


const Calculator = () => {
    const [bill, setBill] = useState('');
    const [tip, setTip] = useState('');
    const [people, setPeople] = useState('');

    const handleInput = (event) => {
        let { name, value } = event.target;

        const validChars = [
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9'
        ];
        
        if (name === 'bill') 
            validChars.push('.');

        value = value.split('')
            .map((char) => !validChars.includes(char) ? '' : char)
            .reduce((prev, curr, index) => prev + curr, '');

        switch (name) {
            case 'bill':
                /* 
                    check value field of the bill input element 
                    if value does not conform to following regular expression,
                    do not allow an update. Can start with a digit, followed by 
                    at most one ., ending with at most 2 digits. Ending with 0 
                    digits is supported, as any trailing . will be truncated when 
                    parsing string to float
                    */
                value = !value.match(/^\d*\.{0,1}\d{0,2}$/) ? bill : value;
                value === '' ?
                    setBill('')
                    : setBill(value);
                break;
            case 'people':
                value === '' ?
                    setPeople('')
                    : setPeople(parseInt(value) > 100 ? 100 : parseInt(value));
                break;
            default:    /* this will handle tip state */
                if (name === 'tip-custom') {
                    value === '' ?
                        setTip('')
                        : setTip(parseInt(value) > 100 ? 100 : parseInt(value));
                } else {
                    let percentages = {
                        '5': 5,
                        '10': 10,
                        '15': 15,
                        '25': 25,
                        '50': 50
                    };
                    setTip(percentages[value]);
                }
        }
    };

    const resetAll = () => {
        setBill('');
        setPeople('');
        setTip('');
    };

    const calculateTipPerPerson = () => {
        if (bill === '' || people === '' || people === 0 || tip === '') {
            return 0;
        }
        return (bill * tip) / (100.0 * people);
    };

    const calculateBillPerPerson = () => {
        if (bill === '' || people === '' || people === 0) {
            return 0;
        }
        return bill / people;
    }

    const calculateTotal = () => {
        if (bill === '' || people === '' || tip === '') {
            return 0;
        }
        return (calculateTipPerPerson() + calculateBillPerPerson());
    };

    return (
        <div className="calculator-container">
            <div className="calculator-input-container">
                <div className="bill-container">
                    <label htmlFor="bill">
                        <DollarIcon/>
                        Bill
                    </label>
                    <input type="text"
                        name="bill"
                        min="0"
                        placeholder="0"
                        value={bill}
                        onChange={handleInput} />
                </div>
                <div className="tip-container">
                    <div className="tip-text">Select Tip %</div>
                    <div className="tip-grid-container">
                        <input className={`tip-grid-item ${tip === 5 ? 'active' : ''}`} name="tip-5" type="button" value="5%" onClick={handleInput} />
                        <input className={`tip-grid-item ${tip === 10 ? 'active' : ''}`} name="tip-10" type="button" value="10%" onClick={handleInput} />
                        <input className={`tip-grid-item ${tip === 15 ? 'active' : ''}`} name="tip-15" type="button" value="15%" onClick={handleInput} />
                        <input className={`tip-grid-item ${tip === 25 ? 'active' : ''}`} name="tip-25" type="button" value="25%" onClick={handleInput} />
                        <input className={`tip-grid-item ${tip === 50 ? 'active' : ''}`} name="tip-50" type="button" value="50%" onClick={handleInput} />
                        <input className="tip-grid-item" name="tip-custom" type="text" min="0" value={tip} placeholder="Custom" onChange={handleInput} />
                    </div>
                </div>
                <div className="people-container">
                    <label htmlFor="people">
                        <div className="people-label-text">
                            <PersonIcon/>
                            Number of People
                        </div>
                        {
                            people === 0 && <div className="error">Can't be zero</div>
                        }
                    </label>
                    <input type="text"
                        name="people"
                        min="0"
                        value={people}
                        placeholder="0"
                        onChange={handleInput}
                        className={`${people === 0 ? 'error' : ''}`} />
                </div>
            </div>
            <div className="result-container">
                <div className="result-item">
                    <div className="result-label-container">
                        <div className="result-type">Tip Amount</div>
                        <div className="per-person">/ person</div>
                    </div>
                    <div className="money-amount">${calculateTipPerPerson().toFixed(2)}</div>
                </div>
                <div className="result-item">
                    <div className="result-label-container">
                        <div className="result-type">Total</div>
                        <div className="per-person">/ person</div>
                    </div>
                    <div className="money-amount">${calculateTotal().toFixed(2)}</div>
                </div>
                <input type="button" value="RESET" onClick={resetAll} />
            </div>
        </div>
    );
};

export default Calculator;