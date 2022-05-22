function localeString(value) {
    return value.toLocaleString(undefined, {'minimumFractionDigits':2,'maximumFractionDigits':2})
}

export default localeString