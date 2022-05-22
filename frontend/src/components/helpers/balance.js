function balance ({user, transactions}) {
    let balance = 0;
    transactions.map((transaction) => {
        balance += Number(transaction.value);
    })

    console.log(balance)
    return balance;
}

export default balance