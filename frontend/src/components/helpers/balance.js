import localeString from './localeString';

function balance ({user, transactions}) {
    let balance = 0;
    transactions.map((transaction) => {
        balance += Number(transaction.value);
    })

    if (String(balance).includes('-0')) {
        return 0;
    }

    return localeString(balance);
}

export function balanceNumber ({user, transactions}) {
    let balance = 0;
    transactions.map((transaction) => {
        balance += Number(transaction.value);
    })

    if (String(balance).includes('-0')) {
        return 0;
    }

    return localeString(Number(balance).toFixed(2));
}

export default balance