export const serializeUser = (user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
};

export const serializeUserWithToken = (user, token) => {
    return {
        user: serializeUser(user),
        token
    };
};
