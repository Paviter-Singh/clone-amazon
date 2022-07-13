import jwt from "jsonwebtoken";

let refreshTokens = [];
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "59m"}) 
    }
    // refreshTokens
function generateRefreshToken(user) {
    const refreshToken = 
    jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "59m"})
    refreshTokens.push(refreshToken)
    return refreshToken
    }
function refreshTokensSet(arr){
    refreshTokens = arr;
}
export {
    generateAccessToken,
    generateRefreshToken,
    refreshTokens, refreshTokensSet
};