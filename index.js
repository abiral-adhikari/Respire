console.log("Hello World!")
const https=require('https')
const app=require('./app')
require('dotenv').config()
const { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar, TransferTransaction } = require("@hashgraph/sdk");

    //Grab your Hedera testnet account ID and private key from your .env file
    const myAccountId = process.env.MY_ACCOUNT_ID;
    const myPrivateKey = process.env.MY_PRIVATE_KEY;
    // If we weren't able to grab it, we should throw a new error
    if (!myAccountId || !myPrivateKey) {
        throw new Error("Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be present");
    }

//Create your Hedera Testnet client
const client = Client.forTestnet();
//Set your account as the client's operator
client.setOperator(myAccountId, myPrivateKey);
//Set the default maximum transaction fee (in Hbar)
client.setDefaultMaxTransactionFee(new Hbar(20));
//Set the maximum payment for queries (in Hbar)
client.setMaxQueryPayment(new Hbar(10));


const routes=require('./routes/routes.js')
app.use('/api',routes)
app.get('/',(req,res)=>{console.log("Hello World");res.status(200).json({"message":"Hello World"})})

// need o update