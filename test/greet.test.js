import assert from 'assert';
import db from '../db.js';
import Greetings from '../db-logic.js';


describe('Database Tests For Greetings WebApp', () => {
  let greetings;

  beforeEach(async () => {
    // Initialize the Greetings factory 
    greetings = Greetings(db);
    // Reset the database before each test
    await greetings.reset();
  });

  it('should insert and retrieve a name', async () => {
    await greetings.insertValues('Nonzwakazi');

    const result = await greetings.getName('Nonzwakazi');

    assert.strictEqual(result.name, 'Nonzwakazi');
    assert.strictEqual(result.count, 1);
  });

  it('should update the count for an existing name', async () => {

    await greetings.insertValues('Zandisile');

    await greetings.insertValues('Zandisile');

    const result = await greetings.getName('Zandisile');

    assert.strictEqual(result.count, 2);
  });

  it('should reset the database', async () => {

    await greetings.insertValues('Ntomboxolo');

    await greetings.reset();

    const result = await greetings.getName('Ntomboxolo');

    assert.strictEqual(result, null);
  });

  it('should update the count when calling updateName', async () => {
    await greetings.insertValues('Yamisile');

    await greetings.updateName('Yamisile', 2);

    const result = await greetings.getName('Yamisile');
    assert.strictEqual(result.count, 2);
  });


  it('should retrieve all names and counts from the database', async () => {
    await greetings.insertValues('Asi');
    await greetings.insertValues('Asiphe');
    await greetings.insertValues('Asisiphe');
    
    // Retrieve all names and counts from the database
    const allData = await greetings.getAll();

    assert.deepStrictEqual(allData, [
      {
        count: 1,
        name: 'Asi'
      },
      {
        count: 1,
        name: 'Asiphe'
      },
      {
        count: 1,
        name: 'Asisiphe'
      }
    ]);
});

  it('should retrieve an empty array when there are no entries in the database', async () => {
    // Retrieve all names and counts from the empty database
    const allData = await greetings.getAll();

    assert.strictEqual(allData.length, 0);
  });

  after(function () {
    db.$pool.end;
});

});
