import {
  getUserByEmail,
  getUserByUsername,
  insertUser,
} from '../models/UsersModel.js';
import { generateToken } from '../utils/jwt.js';
import { comparePassword, hashPassword } from '../utils/password.js';

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ error: 'Username and password are required' });

  try {
    const result = await getUserByUsername(username);
    if (!result) return res.status(401).json({ error: 'Invalid Username' });

    const isPasswordValid = await comparePassword(password, result.password);

    if (!isPasswordValid)
      return res.status(401).json({ error: 'Invalid username or password' });

    res.json({ token: generateToken(result.id) });
  } catch (err) {
    console.log(err);
    if (err) return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const signup = async (req, res) => {
  const { username, email, first_name, last_name, password } = req.body;

  if (!username || !password || !first_name || !last_name || !email)
    return res
      .status(400)
      .json({ error: 'Please provide all required fields' });

  if (first_name.length < 4)
    return res
      .status(400)
      .json({ error: 'First name must be at least three characters long' });

  if (last_name.length < 4)
    return res
      .status(400)
      .json({ error: 'Last name must be at least three characters long' });

  let pattern = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  if (!email.match(pattern))
    return res.status(400).json({ error: 'Invalid email' });

  try {
    let result = await getUserByUsername(username);
    if (result)
      return res.status(400).json({ error: 'Username already taken' });
    result = await getUserByEmail(email);
    if (result)
      return res
        .status(400)
        .json({ error: 'User with provided email already exists' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  const hashedPassword = await hashPassword(password);

  try {
    const result = await insertUser({
      username,
      email,
      first_name,
      last_name,
      password: hashedPassword,
    });

    res.status(201).json({ token: generateToken(result.id) });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const profile = (req, res) => {
  res.json(req.user);
};
