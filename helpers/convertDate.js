function convertDate(tgl) {

    return tgl.toLocaleString('en-CA', {year: 'numeric', month: 'numeric', day: 'numeric'})
    
}

module.exports = convertDate