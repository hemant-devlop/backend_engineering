import { SessionModel } from "../models/session.model.js";

class SessionRepository {
    async create(sessionData) {

        return SessionModel.create(sessionData);

    }
    async findById(sessionId) {

        return SessionModel

            .findById(sessionId)

            .lean();

    }
    async findByJti(jti) {

        return SessionModel

            .findOne({

                jti,

            })

            .select("+refreshTokenHash")

            .lean();

    }
    async findActiveByUserId(userId) {

        return SessionModel

            .find({

                userId,

                revokedAt: null,

            })

            .lean();

    }
    async touchLastActivity(sessionId) {

        return SessionModel.findByIdAndUpdate(

            sessionId,

            {

                lastActivityAt: new Date(),

            }

        );

    }
    async updateRefreshToken({

        sessionId,

        refreshTokenHash,

        jti,

        expiresAt,

    }) {

        return SessionModel.findByIdAndUpdate(

            sessionId,

            {

                refreshTokenHash,

                jti,

                expiresAt,

                lastActivityAt: new Date(),

            },

            {

                new: true,

            }

        );

    }
    async revoke(

        sessionId,

        reason

    ) {

        return SessionModel.findByIdAndUpdate(

            sessionId,

            {

                revokedAt: new Date(),

                revokeReason: reason,

            }

        );

    }
    async revokeAllByUserId(

        userId,

        reason

    ) {

        return SessionModel.updateMany(

            {

                userId,

                revokedAt: null,

            },

            {

                revokedAt: new Date(),

                revokeReason: reason,

            }

        );

    }
    async deleteExpired() {

    return SessionModel.deleteMany({

        expiresAt: {

            $lt: new Date(),

        },

    });

}
}

export const sessionRepository =

new SessionRepository();