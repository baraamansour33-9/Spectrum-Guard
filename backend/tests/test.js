// Dynamic import of Chai
import('chai').then(chai => {
//const chai = require ('ch')
    const { assert } = chai;
    const {app} = require('../server'); // Make sure the path is correct to your Express applicatio
    const request = require('supertest');

    //  unit tests
    describe('Test de aanmeldingsfunctionaliteit', () => {
      it('Het aanmeldingsverzoek zou een nieuwe gebruiker moeten toevoegen', (done) => {
        request(app)
          .post('/signup')
          .send({ Name: 'TestUser', Email: 'test@test.com', Password: 'testpassword' })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'User registered successfully');
            done();
          });
      });
  
      it('Het aanmeldingsverzoek zou een foutmelding moeten geven als de e-mail al bestaat', (done) => {
        request(app)
          .post('/signup')
          .send({ Name: 'ExistingUser', Email: 'test@test.com', Password: 'existingpassword' })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'E-mail already in use');
            done();
          });
      });
    });
  
    describe('Test de inlogfunctionaliteit', () => {
      it('Het inlogverzoek zou moeten slagen bij geldige referenties', (done) => {
        request(app)
          .post('/login')
          .send({ email: 'test@test.com', password: 'testpassword' })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, 'Success');
            done();
          });
      });
  
      it('Het inlogverzoek zou moeten mislukken bij ongeldige referenties', (done) => {
        request(app)
          .post('/login')
          .send({ email: 'test@test.com', password: 'wrongpassword' })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, 'Failed');
            done();
          });
      });
    });
  
    }).catch(error => {
      console.error('Failed to import Chai:', error);
    });

  