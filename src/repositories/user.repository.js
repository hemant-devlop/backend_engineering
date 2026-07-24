
import { UserModel } from "../models/user.model.js";

export const userRepository = {

    async create(userData) {
        return UserModel.create(userData);
    },
    async findByEmail(email) {
        return UserModel.findOne({ email }).lean();
    },
    async findByEmailWithPassword(email) {
        return UserModel.findOne({ email }).select("+passwordHash").lean();
    },
    async findById(id) {
        return UserModel.findById(id);
    },
    async exists(email) {
        return UserModel.exists({ email });

    },
    async updateLastLogin(id) {
        return UserModel.findByIdAndUpdate(id,
            { lastLoginAt: new Date() },
            { new: true }
        );
    },
    async incrementFailedAttempts(id) {
        return UserModel.findByIdAndUpdate(id,
            { $inc: { failedLoginAttempts: 1 } }
        );
    },
    async resetFailedAttempts(id) {
        return UserModel.findByIdAndUpdate(id,
            { failedLoginAttempts: 0, lockUntil: null }
        );
    },
    async updatePassword(id, passwordHash) {
        return UserModel.findByIdAndUpdate( id,
            {  passwordHash,  passwordChangedAt: new Date()}
        );
    }
};