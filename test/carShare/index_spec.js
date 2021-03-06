/* global describe it expect api beforeEach*/

const CarShare = require('../../models/car-share');
const Festival = require('../../models/festival');

const carShareData = [{
  rideStartTime: '12.00PM',
  estimatedRideEndTime: '3.30PM',
  from: {
    postcode: 'W2 1HQ',
    lat: 51.5167,
    lng: 0.1769
  }
}, {
  rideStartTime: '11.30AM',
  estimatedRideEndTime: '12.30PM',
  from: {
    postcode: 'W2 1HQ',
    lat: 51.5167,
    lng: 0.1769
  }
}, {
  rideStartTime: '10.00AM',
  estimatedRideEndTime: '12.30PM',
  from: {
    postcode: 'EC3N 1AH',
    lat: 51.5167,
    lng: 0.1769
  }
}];

const festivalData = [{
  name: 'LoveBox',
  startDate: '13th July',
  endDate: '14th July',
  location: 'Gunnersbury Park',
  camping: 'No',
  headlining: ['Childish Gambino', 'Skepta', 'SZA'],
  photoUrl: 'https://24e8e3b95851cffc9b46-ce987c743c8a722dc56cea7f8eb55a8f.ssl.cf3.rackcdn.com/LBXLogoSimple.svg'

}];
let festivalId;

describe('GET /carShares', () => {

  beforeEach(done => {

    // Festival.remove({})
    //   .then(() => {
    //     return CarShare.remove({})
    //   })
    Promise.all([
      Festival.remove({}),
      CarShare.remove({})
    ])
    // TODO PICK ONE OF THE ABOVE
      .then(() => Festival.create(festivalData))

      .then(festival => {
        festivalId = festival._id;
        carShareData.forEach(carShare => {
          carShare.festival = festivalId;
        });
        CarShare.create(carShareData);
      })
      .then(() => done());
  });

  it('should return a 200 response',
    done => {
      api.get(`/api/festivals/${festivalId}/carShares`)
        .end((err, res) => {
          expect(res.status).to.eq(200);
          done();
        });
    });

  it('should return an array',
    done => {
      api.get(`/api/festivals/${festivalId}/carShares`)
        .end((err, res) => {
          expect(res.body).to.be.an('array');
          done();
        });
    });

  it('should return an array of the correct length',
    done => {
      api.get(`/api/festivals/${festivalId}/carShares`)
        .end((err, res) => {
          expect(res.body.length).to.eq(carShareData.length);
          done();
        });
    });
  it('should return an array of objects',
    done => {
      api.get(`/api/festivals/${festivalId}/carShares`)
        .end((err, res) => {
          res.body.forEach(carShare => {
            expect(carShare).to.be.an('object');
          });
          console.log('festivalId is', festivalId);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  // This is the last test for index - finish it later.
  it('should return the correct data', done => {
    api.get(`/api/festivals/${festivalId}/carShares`)
      .end((err, res) => {
        res.body.forEach(carShare => {

          const correspondingCarShare = carShareData.filter(chosenCarShare =>
            chosenCarShare.rideStartTime === carShare.rideStartTime)[0];

          expect(correspondingCarShare.estimatedRideEndTime).to.eq(carShare.estimatedRideEndTime);
          for (const locationInfo in carShare.from) {
            expect(carShare.from[locationInfo]).to.eq(correspondingCarShare.from[locationInfo]);
          }
        });
        done();
      });
  });

});
