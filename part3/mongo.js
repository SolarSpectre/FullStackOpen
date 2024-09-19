const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const url =`mongodb+srv://josephcaza32:${password}@cluster0.b96tvq8.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`  
mongoose.set('strictQuery', false);
mongoose.connect(url);


const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Note = mongoose.model('Note', noteSchema);

if (process.argv.length==3) {
  console.log(`phonebook:`)
  Note.find({}).then(result => {
  result.forEach(note => {
    console.log(`${note.name} ${note.number}`)
  })
  mongoose.connection.close()
  })
}
const note = new Note({
  name: name,
  number: number,
})
note.save().then(result => {
  console.log(`added ${note.name} number ${note.number} to phonebook`)
  mongoose.connection.close()
})

