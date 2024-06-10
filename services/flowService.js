const Astrologer = require('../model/astrologerModel');
const User = require("../model/userModel");

async function distributeUserToAstrologer(userId) {
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        const astrologers = await Astrologer.find();
        if (astrologers.length === 0) throw new Error('No astrologers available');

        let selectedAstrologer = null;
        if (astrologers.some(astrologer => astrologer.isTop)) {
            const topAstrologers = astrologers.filter(astrologer => astrologer.isTop);
            selectedAstrologer = topAstrologers.reduce((prev, curr) => prev.connectionCount < curr.connectionCount ? prev : curr);
        } else {
            selectedAstrologer = astrologers.reduce((prev, curr) => prev.connectionCount < curr.connectionCount ? prev : curr);
        }

        selectedAstrologer.connectionCount += 1;
        user.connectedTo = selectedAstrologer._id;

        await Promise.all([selectedAstrologer.save(), user.save()]);

        return selectedAstrologer;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function toggleAstrologerTopStatus(astrologerId, status) {
    try {
        const astrologer = await Astrologer.findById(astrologerId);
        if (!astrologer) throw new Error('Astrologer not found');

        astrologer.isTop = status;
        await astrologer.save();

        return astrologer;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    distributeUserToAstrologer,
    toggleAstrologerTopStatus
};
