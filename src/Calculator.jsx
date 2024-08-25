import React, { useState, useEffect } from "react";
import Calc from "./assets/illustration-empty.svg";
import Icon from "./assets/icon-calculator.svg";

function Calculator() {
  const [valuex , setValuex] = useState()
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [selectedType, setSelectedType] = useState("");
  const [formData, setFormData] = useState({
    amount: "",
    term: "",
    rate: "",
    type: "",
  });

  const handleSelection = (type) => {
    setSelectedType(type);
    setFormData({ ...formData, type: type });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formData);
    }
  }, [formErrors, isSubmit, formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    var t;
    setFormErrors(validate(formData));
    if (!isSubmit) setIsSubmit(true);
    
    if (formData.type == "repayment")
      t = calculateMonthlyPayment(
        formData.amount,
        formData.term,
        formData.rate
      );
    else if (formData.type == "interest-only")
      t = calculateInterestOnlyPayment(formData.amount, formData.rate);
      let x = t.toFixed(4)
      setValuex (x)
  };
  
  function calculateInterestOnlyPayment(P, rAnnual) {
    // Convert annual interest rate to a decimal monthly rate
    let r = rAnnual / (12 * 100);
    // Calculate the interest-only payment
    let M = P * r;
    // Return the interest-only payment
    return M;
  }

  function calculateMonthlyPayment(P, T, rAnnual) {
    // Convert annual interest rate to a decimal
    let r = rAnnual / (12 * 100);
    // Calculate the total number of monthly payments
    let n = T * 12;
    // Calculate the monthly payment (M) using the formula
    let M = (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    // Return the monthly payment
    return M;
  }

  const validate = (values) => {
    const errors = {};
    if (!values.amount) {
      errors.amount = "This field is required";
    }
    if (!values.term) {
      errors.term = "This field is required";
    }
    if (!values.rate) {
      errors.rate = "This field is required";
    }
    if (!values.type) errors.type = "one value must be selected";
    return errors;
  };
  
  function lastNumber(value) {
    // تحويل القيمة إلى نص
    let r = value.toString();
    r = r.replace(/\./g, '');
    let part1 = r.slice(0,1)
    let part2 = r.slice(1,4)
    let part3 = r.slice(4,6)
    let result = part1 + ',' +part2 + '.' + part3
    return result;
}
  function lasNumber(value) {
    value *= 30
    // تحويل القيمة إلى نص
    let r = value.toString();
    r = r.replace(/\./g, '');
    let part1 = r.slice(0,3)
    let part2 = r.slice(3,6)
    let part3 = r.slice(6,8)
    let result = part1 + ',' +part2 + '.' + part3
    return result;
}
  const handleClick = () => {
    setFormData({
      amount: "",
      term: "",
      rate: "",
      type: "",
    });
    setSelectedType('')
      setIsSubmit(false)
  }

  return (
    <div className="grid   md:grid-flow-col  place-items-center  bg-white rounded-3xl">
      <div className="width p-10 flex flex-col justify-evenly gap-8">
        <div className="flex justify-between items-center">
          <h1 className="ggg font-bold text-2xl">Mortgage Calculator</h1>
          <p className="underline text-[var(--text)] cursor-pointer hover:text-black" onClick={handleClick}>
            Clear All
          </p>
        </div>
        <form className="grid" onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <label className="grid gap-3" htmlFor="amount">
              Mortgage Amount
              <div className="relative">
                <span
                  className={`${
                    formErrors.amount ? "bg-[var(--Red)] text-white" : ""
                  } absolute p-2 text-xl pr-5 rounded-l-lg font-bold`}
                  id="mb"
                >
                  £
                </span>
                <input
                  type="text"
                  name="amount"
                  id="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className={`${
                    formErrors.amount ? "border-[var(--Red)]" : ""
                  } pl-14`}
                />
              </div>
              <h4>{formErrors.amount}</h4>
            </label>

            <div className="flex justify-between gap-4">
              <label className="grid gap-3 w-full" htmlFor="term">
                Mortgage Term
                <div className="relative">
                  <input
                    type="text"
                    name="term"
                    id="term"
                    value={formData.term}
                    onChange={handleChange}
                    className={`${
                      formErrors.term ? "border-[var(--Red)]" : ""
                    }`}
                  />
                  <span
                    className={`${
                      formErrors.term ? "bg-[var(--Red)] text-white" : ""
                    } absolute p-2 text-xl pr-5 rounded-r-lg font-bold`}
                  >
                    years
                  </span>
                </div>
                <h4>{formErrors.term}</h4>
              </label>
              <label className="grid gap-3 w-full relative" htmlFor="rate">
                Interest Rate
                <div className="relative">
                  <input
                    type="text"
                    name="rate"
                    id="rate"
                    value={formData.rate}
                    onChange={handleChange}
                    className={`${
                      formErrors.rate ? "border-[var(--Red)]" : ""
                    }`}
                  />
                  <span
                    className={`${
                      formErrors.rate ? "bg-[var(--Red)] text-white" : ""
                    } absolute p-2 text-xl pr-5 rounded-r-lg font-bold`}
                  >
                    %
                  </span>
                </div>
                <h4>{formErrors.rate}</h4>
              </label>
            </div>

            <div className="grid gap-1">
              <label className="mb-3">Mortgage Type</label>
              <div>
                <div
                  onClick={() => handleSelection("repayment")}
                  className={`flex gg items-center p-3 mb-2 rounded-lg font-bold ggg cursor-pointer hover:border-2 hover:border-[var(--calcv)] ${
                    selectedType === "repayment"
                      ? "border-[var(--ventage)] bg-[var(--bgg)]"
                      : ""
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full border border-gray-500 mr-4 flex items-center justify-center ${
                      selectedType === "repayment"
                        ? "border-[var(--calcv)]"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${
                        selectedType === "repayment" ? "bg-yellow-300" : ""
                      }`}
                    ></div>
                  </div>
                  Repayment
                </div>
                <div
                  onClick={() => handleSelection("interest-only")}
                  className={`flex gg items-center p-3 font-bold mb-2 rounded-lg ggg cursor-pointer hover:border-2 hover:border-[var(--calcv)] ${
                    selectedType === "interest-only"
                      ? "border-[var(--ventage)] bg-[var(--bgg)]"
                      : ""
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full border border-gray-500 mr-4 flex items-center justify-center ${
                      selectedType === "interest-only"
                        ? "border-[var(--calcv)]"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${
                        selectedType === "interest-only" ? "bg-yellow-300" : ""
                      }`}
                    ></div>
                  </div>
                  Interest Only
                </div>
              </div>
              <h4>{formErrors.type}</h4>
            </div>
            <button
              type="submit"
              className="h-14 bg-[var(--ventage)] hover:bg-[var(--calcv)] rounded-3xl w-80 ggg font-semibold flex items-center justify-center"
            >
              <img src={Icon} className="mr-4" alt="Icon" />
              Calculate Repayments
            </button>
          </div>
        </form>
      </div>

      <div
        id=""
        className="bg-[var(--Slate-900)] text-white gx flex flex-col items-center h-full rounded-3xl justify-center gap-4 p-10 wedth text-lg font-light"
      >
        {Object.keys(formErrors).length === 0 && isSubmit ? (
          <div className="w-full flex flex-col" >
            <p className="text-3xl font-bold">
            Your results
            </p>
            <p className="mt-4 text-[var(--Slate-300)]">
            Your results are shown below based on the information you
              provided. To adjust the results, edit the form and click
              “calculate repayments” again.
            </p>
            <div className="relative mt-8 z-10">
            <div className="absolute h-8 w-full  bg-[var(--ventage)]  -top-1 rounded-2xl -z-10"></div>
              <div className=" rounded-xl bg-[var(--bgbg)] top-1 w-full p-8 ">
                <div className="grid gap-4">
                <p className="text-[var(--Slate-300)]">Your monthly repayments</p>
                <p className="text-[var(--ventage)] text-5xl font-bold">£ {lastNumber(valuex)}</p>
                </div>

                 <div className="h-px bg-white mb-8 mt-8"></div>
                  <div className="grid">
                  <p className="text-[var(--Slate-300)]">Total you'll repay over the term</p>
                <p className="text-xl font-bold">£ {lasNumber(valuex)}</p>
                </div>
            </div>
            </div>
          </div>
        ) : (
          <div className=" w-full flex flex-col items-center text-center justify-center">
            <img src={Calc} alt="Calculator Illustration" />
            <p className="text-2xl font-bold mt-4">Results shown here</p>
            <p className="text-[var(--Slate-300)]">
              Complete the form and click “calculate repayments” to see what
              your monthly repayments would be.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Calculator;
