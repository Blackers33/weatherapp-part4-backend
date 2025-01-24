function checkBody(body, params) {

    result = true
    params.forEach(param => {
        if (!(body[param])) result = false
        if (body[param] == '') result = false
    })
    //returns true if valid
    return result
}

module.exports = { checkBody };