/**
 * 
 * @param {*Object} header 
 */
module.exports = function convertHeader(request) {
    // rename header property
    if (request['header'] && request['headers']) {
        const oldHeader = request['header']
        request['header'] = request['headers']
        request['old_header'] = oldHeader
    }
    else {
        console.log(`the object has no property "header" or "headers"`)
    }
    return request
}