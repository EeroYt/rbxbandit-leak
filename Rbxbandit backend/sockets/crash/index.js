// Load database models
const User = require('../../database/models/User');

// Load middleware
const {
    rateLimiter,
    rateLimiterStrict
} = require('../../middleware/rateLimiter');

// Load utils
const {
    socketCheckUserData,
    socketCheckConnectionLimit,
    socketSetConnectionAuth,
    socketAddConnectionLimit,
    socketRemoveConnectionLimit,
    socketCheckAntiSpam,
    socketRemoveAntiSpam
} = require('../../utils/socket');
const {
    settingCheck
} = require('../../utils/setting');

// Load controllers
const {
    crashGetData,
    crashSendBetSocket,
    crashSendCashoutSocket,
    crashInit
} = require('../../controllers/crash');

module.exports = (io) => {

    io.of('/crash').use(async(socket, next) => {
        try {
            const identifier = socket.handshake.headers['cf-connecting-ip'] || socket.conn.remoteAddress;
            await socketCheckConnectionLimit('crash', identifier);

            try {
                await socketSetConnectionAuth(socket, false);
            } catch(err) {
                next(err);
            }

            // Get crash data from controller and send data to frontend
            const dataCrash = crashGetData();
            socket.emit('init', dataCrash);

            next();
        } catch(err) {
            return next({ success: false, error: { type: 'error', message: err.message } });
        }
    });

    io.of('/crash').on('connection', (socket) => {
        const identifier = socket.handshake.headers['cf-connecting-ip'] || socket.conn.remoteAddress;
        socketAddConnectionLimit('crash', identifier);

        socket.on('sendBet', async(data, callback) => {
            if(callback === undefined || typeof callback !== 'function') { return; }
            if(socket.decoded !== undefined && socket.decoded !== null) {
                try {
                    const identifier = socket.handshake.headers['cf-connecting-ip'] || socket.conn.remoteAddress;
                    await rateLimiter.consume(identifier);
                    await socketCheckAntiSpam(socket.decoded._id);
                    try {
                        const user = await User.findById(socket.decoded._id).select('username avatar rank balance xp stats limits affiliates anonymous mute ban createdAt').lean();
                        socketCheckUserData(user, true);
                        settingCheck(user, 'games.crash.enabled');
                        crashSendBetSocket(io, socket, user, data, callback);
                    } catch(err) {
                        socketRemoveAntiSpam(socket.decoded._id);
                        callback({ success: false, error: { type: 'error', message: err.message } });
                    }
                } catch(err) {
                    callback({ success: false, error: { type: 'error', message: err.message !== undefined ? err.message : 'You need to slow down, you have send to many request. Try again in a minute.' } });
                }
            } else { callback({ success: false, error: { type: 'error', message: 'You need to sign in to perform this action.' } }); }
        });

        socket.on('sendCashout', async(data, callback) => {
            if(callback === undefined || typeof callback !== 'function') { return; }
            if(socket.decoded !== undefined && socket.decoded !== null) {
                try {
                    const identifier = socket.handshake.headers['cf-connecting-ip'] || socket.conn.remoteAddress;
                    await rateLimiter.consume(identifier);
                    await socketCheckAntiSpam(socket.decoded._id);
                    try {
                        const user = await User.findById(socket.decoded._id).select('username avatar rank mute ban').lean();
                        socketCheckUserData(user, true);
                        settingCheck(user);
                        crashSendCashoutSocket(io, socket, user, data, callback);
                    } catch(err) {
                        socketRemoveAntiSpam(socket.decoded._id);
                        callback({ success: false, error: { type: 'error', message: err.message } });
                    }
                } catch(err) {
                    callback({ success: false, error: { type: 'error', message: err.message !== undefined ? err.message : 'You need to slow down, you have send to many request. Try again in a minute.' } });
                }
            } else { callback({ success: false, error: { type: 'error', message: 'You need to sign in to perform this action.' } }); }
        });

        socket.on('disconnect', async() => {
            const identifier = socket.handshake.headers['cf-connecting-ip'] || socket.conn.remoteAddress;
            socketRemoveConnectionLimit('crash', identifier);
        });

    });

    // Init crash game
    crashInit(io);
}
