import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";


export default function CardForm({card, submitHandler, cancelHandler}) {
    const [cardInfo, setCardInfo] = useState(card);

  useEffect(() => {
    setCardInfo(card);
  }, [card]);

  const updateForm = (event) => {
    const { name, value } = event.target;
    setCardInfo({ ...cardInfo, [name]: value });
  };

  const submit = (event) => {
    event.preventDefault();
    if (validate()){
      submitHandler(cardInfo);
      setCardInfo({})
    } else {
      window.alert("Please fill in all fields.")
    }
  };

  //create validation function to see whether cardInfo is empty
  const validate = () => {
    if (!cardInfo || cardInfo.front === "" || cardInfo.back === "") {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div>
        <form onSubmit={submit}>
        <div className="form-group mb-3">
          <label>Front</label>
          <textarea
            className="form-control"
            as="textarea"
            rows="3"
            name="front"
            placeholder="Front side of card"
            value={cardInfo?.front || ""}
            onChange={updateForm}
          />
        </div>
        <div className="form-group mb-3">
          <label>Back</label>
          <textarea
            className="form-control"
            as="textarea"
            rows="3"
            name="back"
            placeholder="Back side of card"
            value={cardInfo?.back || ""}
            onChange={updateForm}
          />
        </div>
        <Link to="/" className="btn btn-secondary" onClick={cancelHandler}>
          Cancel
        </Link>
        <button className="btn btn-primary" type="submit" onClick={submit}>
          Save
        </button>
      </form>
    </div>
  )
}