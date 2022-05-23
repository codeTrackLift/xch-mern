function account ({user}) {
    const account = user._id.replace(/\D/g,'');
    return account
}

export default account