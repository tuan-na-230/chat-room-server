const mongoose = require('mongoose');
const mongooseString = 'mongodb+srv://nguyenanhtuan:anhtuanqwe@cluster0-vud3p.mongodb.net/SCAN_PARTY?retryWrites=true&w=majority';

mongoose.connect(mongooseString, {
    //options
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => {
    console.log('Connect mongo atlas successfully!');
})
.catch(err => {
    console.error('Connect mongo atlas failed');
    console.error(err.message)
})