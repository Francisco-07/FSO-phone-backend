const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://francisco:${password}@cluster0.z6iqb.mongodb.net/fullstackopen?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 4) {
  mongoose.connect(url).then((result) => {
    Person.find({}).then((result) => {
      result.forEach((person) => {
        console.log(person)
      })
      mongoose.connection.close()
    })
  })
} else if (process.argv.length > 4) {
  mongoose
    .connect(url)
    .then((result) => {
      console.log('connected')

      const person = new Person({
        name: name,
        number: number,
      })

      return person.save()
    })
    .then(() => {
      console.log('person saved!')
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}
