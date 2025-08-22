// Link for the documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration

// Add button code documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration#code-to-add-pay-button

document.getElementById("rzp-button1").onclick = function (e) {
  // Get total price text from span
  let totalText = document.getElementById("total-price").innerText; 
  
  // Extract number (remove Rs and /-)
  let totalAmount = parseInt(totalText.replace(/[^0-9]/g, ""), 10); 

  let amountInPaise = totalAmount * 100;
  
  var options = {
    key: "rzp_test_PV1oQ0oMtgXOsq", // Enter the Key ID generated from the Dashboard
    amount: amountInPaise, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "MyShop Checkout",
    description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    theme: {
      color: "#000",
    },
    handler: function (response) {
      alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
      // Clear cart after successful payment
      localStorage.removeItem("cart");
      location.reload();
    },
    image:
      "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
  };

  var rzpy1 = new Razorpay(options);
  rzpy1.open();
  // clear mycart - localStorage
  e.preventDefault();
};
