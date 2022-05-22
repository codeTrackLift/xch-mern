function account ({user}) {
    const account = user._id.replace(/\D/g,'').substring(0,8);
    return account
}

export default account