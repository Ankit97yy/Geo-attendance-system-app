const pdfDocument=require('pdfkit')

function buildPdf(dataCallback,endCallback){
const doc= new pdfDocument()
doc.on('data',dataCallback)
doc.on('end',endCallback)
doc.fontSize(25).text("Hello world")
doc.end()
}

module.exports=buildPdf