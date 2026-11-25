import React from "react";

function CheckOut() {
  const pay = () => {
    const dataToPost = {
      token: "YOUR_MAKTAPP_TOKEN",
      "FcmToken ": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      currencyCode: "",
      orderId: "5",
      amount: "50",
      customerEmail: "customer@example.com",
      customerName: "ahmed",
      customerPhone: "0100000000",
      customerCountry: "egypt",
      lang: "ar",
      note: "",
    };

    fetch("https://maktapp.credit/v3/AddTransaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToPost),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        alert("error: " + error);
      });
  };

  return (
    <form>
      <input type="button" id="SubmitPay" name="SubmitPay" value="submit" onClick={pay} />
    </form>
  );
}

export default CheckOut;
