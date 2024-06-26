// paymentController.js
import axios from 'axios';
import Payment from '../models/payment.model.js';
const khaltiKey = 'test_public_key_80439eb517954a30980b1ced36a71fb5';
const khaltiSecret = 'test_secret_key_a236160f332242859c3a53af02fba901';
async function initiateKhaltiPayment(req, res) {
  try {
    const { amount, transactionId, productName, successUrl, failureUrl } = req.body;

    const response = await axios.post(
      'https://khalti.com/api/v2/payment/initiate',
      {
        amount,
        transactionId,
        productName,
        successUrl,
        failureUrl,
      },
      {
        headers: {
          Authorization: `Key ${khaltiKey}:${khaltiSecret}`,
        },
      }
    );

    // Handle the response from Khalti
    console.log(response.data);

    // Save payment details to the database (you might want to customize this part)
    const newPayment = new Payment({
      amount,
      transactionId,
      productName,
      successUrl,
      failureUrl,
    });

    const savedPayment = await newPayment.save();

    res.status(201).json({ payment: savedPayment, khaltiResponse: response.data });
  } catch (error) {
    console.error('Error initiating Khalti payment:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


let data = {
  "token": "QUao9cqFzxPgvWJNi9aKac",
  "amount": 1000
};

let config = {
  headers: {'Authorization': 'test_secret_key_a236160f332242859c3a53af02fba901'}
};

axios.post("https://khalti.com/api/v2/payment/verify/", data, config)
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.log(error);
});

export { initiateKhaltiPayment };
