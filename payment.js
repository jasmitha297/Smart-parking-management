// ======================================================
// SMART PARKING - PAYMENT SIMULATION
// ======================================================


// ------------------------------------------------------
// DEMO BOOKING DATA
// ------------------------------------------------------

// These values are used because this payment page is
// currently independent from the existing project files.
//
// Later, these values can be received from booking.html.

const bookingData = {

    slot: "A-12",

    vehicle: "TN38AB1234",

    duration: 3,

    amount: 120

};


// ------------------------------------------------------
// DISPLAY BOOKING INFORMATION
// ------------------------------------------------------

document.getElementById("slot").textContent =
    bookingData.slot;

document.getElementById("vehicle").textContent =
    bookingData.vehicle;

document.getElementById("duration").textContent =
    bookingData.duration + " Hours";

document.getElementById("amount").textContent =
    "₹" + bookingData.amount;


// Update payment button

document.getElementById("pay-button").textContent =
    "Pay ₹" + bookingData.amount;


// ------------------------------------------------------
// PAYMENT METHOD SELECTION
// ------------------------------------------------------

const paymentMethods =
    document.querySelectorAll(
        'input[name="payment"]'
    );


const upiSection =
    document.getElementById("upi-section");

const cardSection =
    document.getElementById("card-section");

const bankSection =
    document.getElementById("bank-section");


paymentMethods.forEach(method => {

    method.addEventListener("change", function () {

        // Hide everything first

        upiSection.classList.add("hidden");

        cardSection.classList.add("hidden");

        bankSection.classList.add("hidden");


        // Show selected section

        if (this.value === "upi") {

            upiSection.classList.remove("hidden");

        }

        else if (this.value === "card") {

            cardSection.classList.remove("hidden");

        }

        else if (this.value === "netbanking") {

            bankSection.classList.remove("hidden");

        }

    });

});


// ------------------------------------------------------
// PAY BUTTON
// ------------------------------------------------------

const payButton =
    document.getElementById("pay-button");

const processing =
    document.getElementById("processing");

const success =
    document.getElementById("success");


payButton.addEventListener("click", function () {

    const selectedMethod =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;


    // Validate payment information

    if (!validatePayment(selectedMethod)) {

        return;

    }


    // Disable button

    payButton.disabled = true;

    payButton.textContent =
        "Processing...";


    // Show processing screen

    processing.classList.remove("hidden");


    // Simulate payment processing

    setTimeout(function () {

        processing.classList.add("hidden");

        showSuccess();

    }, 2500);

});


// ------------------------------------------------------
// PAYMENT VALIDATION
// ------------------------------------------------------

function validatePayment(method) {


    // UPI

    if (method === "upi") {

        const upi =
            document.getElementById("upi-id").value.trim();


        if (upi === "") {

            alert("Please enter your UPI ID.");

            return false;

        }

    }


    // Card

    if (method === "card") {

        const card =
            document.getElementById("card-number")
                .value.trim();

        const expiry =
            document.getElementById("expiry")
                .value.trim();

        const cvv =
            document.getElementById("cvv")
                .value.trim();


        if (
            card === "" ||
            expiry === "" ||
            cvv === ""
        ) {

            alert(
                "Please enter all card details."
            );

            return false;

        }


        if (card.length < 16) {

            alert(
                "Please enter a valid card number."
            );

            return false;

        }


        if (cvv.length < 3) {

            alert(
                "Please enter a valid CVV."
            );

            return false;

        }

    }


    // Net Banking

    if (method === "netbanking") {

        const bank =
            document.getElementById("bank").value;


        if (bank === "") {

            alert(
                "Please select your bank."
            );

            return false;

        }

    }


    return true;

}


// ------------------------------------------------------
// SUCCESS
// ------------------------------------------------------

function showSuccess() {


    // Generate demo transaction ID

    const transactionId =
        "SP" +
        Date.now().toString().slice(-8);


    // Display information

    document.getElementById("success-slot")
        .textContent =
        bookingData.slot;


    document.getElementById("success-vehicle")
        .textContent =
        bookingData.vehicle;


    document.getElementById("success-duration")
        .textContent =
        bookingData.duration + " Hours";


    document.getElementById("success-amount")
        .textContent =
        "₹" + bookingData.amount;


    document.getElementById("transaction-id")
        .textContent =
        transactionId;


    // Store payment information

    const paymentData = {

        slot: bookingData.slot,

        vehicle: bookingData.vehicle,

        duration: bookingData.duration,

        amount: bookingData.amount,

        paymentStatus: "SUCCESS",

        transactionId: transactionId,

        paymentMethod:
            document.querySelector(
                'input[name="payment"]:checked'
            ).value,

        paymentTime:
            new Date().toLocaleString()

    };


    localStorage.setItem(
        "smartParkingPayment",
        JSON.stringify(paymentData)
    );


    // Show success popup

    success.classList.remove("hidden");

}


// ------------------------------------------------------
// DONE BUTTON
// ------------------------------------------------------

function closeSuccess() {

    success.classList.add("hidden");

    payButton.disabled = false;

    payButton.textContent =
        "Payment Completed";

}