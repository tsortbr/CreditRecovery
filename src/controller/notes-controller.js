let sample = { 
    fieldname: 'notes',
    originalname: '52190606341338000274550010003263401844465970.xml',
    encoding: '7bit',
    mimetype: 'text/xml',
    destination:'/home/r4m1r35/Development/RecuperacaoDeCredito/src/public/xmlfiles',
    filename: '01b70a473bbf15d058ab331643832e93',
    path:'/home/r4m1r35/Development/RecuperacaoDeCredito/src/public/xmlfiles/01b70a473bbf15d058ab331643832e93',
    size: 9010 
};

class NotesController{
    
}

NotesController.processNotesMiddleware = (req,res,next) => {
    if(req.files){
        console.log('Hi');
        console.log(req.files);
    }
    next();
};

module.exports = NotesController;