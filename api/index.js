import express from 'express'
import Stripe from 'stripe'

const stripe = new Stripe('sk_test_51JNGORSAIbATCDvBaF8O0qlhC157ZVOztX2maPP9p0hbx0yPt6jqbcKp9TI4aPhX1LZubGtFFmgVsu4Gd7Jo55tU00IhEhlZqa',{

    apiVersion:'2020-08-27',
    typescript:true,
});

const app = express();

app.use(express.json)

app.post('/create-payment-intent',async (req , res)=>{

    const paymentintent = await stripe.paymentIntents.create({
        amount:5000,
        currency:'usd',
    });

    res.send({
        clientSecret:paymentintent.client_secret,
    });
    
})
app.listen(3000 , () => console.log("Running!"))

//npm install typescript express @types/express stripe nodemon ts-node
//to add express as backend..