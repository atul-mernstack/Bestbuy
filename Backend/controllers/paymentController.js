
const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

//configure dot env

const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/.env" });
exports.processPayment = async (req, res, next) => {
    try {
        
        const myPayment = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "inr",
            metadata: {
                company: "Ecommerce"
            }
        })
       // console.log(myPayment);
        res.status(200).json({
            success: true,
            client_secret: myPayment.client_secret
        })
    } catch (error) {
        console.log(error);
        res.status(401).json(error.message);
    }
}

exports.sendStripeApiKey = async (req, res, next) => {
    try {

       
        res.status(200).json({
          stripeApiKey:`${process.env.STRIPE_API_KEY}`
        });
        next();
    } catch (error) {
        res.status(401).json(error.message);
    }
}