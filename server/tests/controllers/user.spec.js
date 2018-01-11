import request from 'supertest';
import app from '../../controllers/usercontrollers';

describe('Get Users Request', () => {
  it('Get all users', (done) => {
    request(app).get('/users')
      .expect(200)
      .expect([{ email: 'kk', username: 'bb', password: 23 }], done);
  });
});

// describe('Post User request', () => {
//   it('Enters an entry into the database', () => {
//     request(app).post('/user')
//       .send({ email: 'kk', username: 'bb', password: 23 })  
//       .expect(200);
//   });
// });

