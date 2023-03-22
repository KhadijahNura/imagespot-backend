import { getUserById } from '../models/UsersModel.js';
import { verifyJwt } from '../utils/jwt.js';

export default async (req, res, next) => {
  let token = req.header('Authorization');
  if (!token)
    return res
      .status(401)
      .json({ message: 'Token is missing or not provided' });

  token = token.split(' ')[1];

  try {
    const tokenData = verifyJwt(token);
    const [err, user] = await getUserDetails(tokenData.id);

    if (err) return res.status(500).json({ message: 'Internal Server Error' });
    if (!user)
      return res
        .status(401)
        .json({ message: 'Invalid or malfunctioned token provide' });

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(403)
      .json({ message: 'Invalid or malfunctioned token provided' });
  }
};

const getUserDetails = async (id) => {
  try {
    const user = await getUserById(id);

    if (user) delete user.password;
    return [null, user];
  } catch (err) {
    return [err, {}];
  }
};
