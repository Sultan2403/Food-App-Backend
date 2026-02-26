const paystackApiClient = require("../Apis/paystack.api");
const { v4: uuidv4 } = require("uuid");

const initialize_User_Order_Payment = async (req, res) => {
  const userId = req.user.id;
  const reference = uuidv4(); // Acts as an id for the transaction.

  try {
    //     Here logic for init order payment
    const response = await paystackApiClient.post("/transaction/initialize", {
      amount: amount * 100, // Because paystack expects kobo
      email,
      reference,
    });

    const { authorization_url } = response.data;

    res.status(200).json({ authorization_url, success: true, reference });
  } catch (error) {
    console.error("Payment init error:", error.message);
    res.status(500).json({
      success: false,
      message:
        "Unable to initialize payment at this time. Please try again later.",
    });
  }
};

const verify_Transaction_Status = async (req, res) => {
  try {
    const { reference } = req.body;

    const transactionStatus = await paystackApiClient.get(
      `/transaction/verify/${reference}`,
    );

    res.status(200).json({ success: true, transactionStatus });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch payment details. Please try again later.",
    });
  }
};

const webhook_Handler = async (req, res) => {
  const message = JSON.parse(req.body.toString());  const reference = message.data.reference;

  // Success event

  if (message.event === "charge.success") {
    try {
      res.sendStatus(200);
    } catch (error) {
      console.error("Error updating transaction:", error);
      res.status(500).json({ success: false, message: "An error occured" });
    }
  }

  // Failure event
  else if (message.event === "charge.failure") {
    try {
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  }
};

module.exports = {
  initialize_User_Order_Payment,
  verify_Transaction_Status,
  webhook_Handler,
};
