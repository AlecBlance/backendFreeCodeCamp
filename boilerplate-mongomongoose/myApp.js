require('dotenv').config();
let mongoose = require('mongoose');

mongoose.connect('MONGODB', { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods : [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'Alec Blance',
    age: 22, 
    favoriteFoods: ['you', 'yieee']
  });
  person.save((err, data) => {
    if (err) {
      done(error);
    }
    done(null, data);
  });
  
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      done(error);
    }
    done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({
    name: personName
  }, (err, data) => {
    if (err) {
      done(error);
    }
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({
    favoriteFoods: food
  }, (err, data) => {
    if (err) {
      done(error);
    }
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({
    _id: personId
  }, (err, data) => {
    if (err) {
      done(error);
    }
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  findPersonById(personId, (err, data) => {
    data.favoriteFoods.push(foodToAdd);
    const person = new Person(data);
    person.save((err, data) => {
      if (err) {
        done(err);
      } 
      done(null, data);
    })
  });
  
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
  {
    name: personName // search query
  },
  {
    age: ageToSet // field:values to update
  },
  {
    new: true, // return updated doc
    runValidators: true // validate before update
  }).then((data) => {
     done(null, data);
  }).catch((err) => {
    done(err);
  });
};

const removeById = (personId, done) => {
  Person.findOneAndRemove({
    _id: personId
  }).then(data => done(null, data))
    .catch(err => done(err));
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({
    name: nameToRemove
  }).then(data => done(null, data))
    .catch(err => done(err));
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({
    favoriteFoods: foodToSearch
  }).sort({
    name: 1
  }).limit(2).select({
    age: false
  }).exec().then(data => done(null, data))
  .catch(err => done(err));
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
