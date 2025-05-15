const { getAllTrips, getTripsByUser } = require('../services/trip');
const {isUser} = require('../middlewares/guards');

const router = require('express').Router();
const preload = require('../middlewares/preload');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/trips', async(req, res) => {
    const trips = await getAllTrips();
    res.render('catalog', { title: 'Shared Trip', trips });
});

router.get('/trips/:id', preload(true), async (req, res) => {
    const trip = res.locals.trip
    trip.remainingSeats = trip.seats - trip.buddies.length;
    trip.buddiesList = trip.buddies.map(b => b.email).join(', ');
    console.log(trip.buddiesList);
    if (req.session.user) {
        trip.hasUser = true;
        trip.isOwner = req.session.user._id == trip.owner._id;

        if (trip.buddies.some(b => b._id == req.session.user._id)) {
            trip.isJoined = true;
        }

    }
    res.render('details', { title: 'Trip Details', trip: trip});
});

router.get('/profile', isUser(), async (req, res) => {
    const tripsByUser = await getTripsByUser(res.locals.user._id);
    res.locals.user.tripCount = tripsByUser.length;
    res.locals.user.trips = tripsByUser
    res.render('profile', {title: 'Profile Page', })
})

module.exports = router;