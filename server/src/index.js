import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
import express from 'express';
import db from './db';

db.sync();
dotenv.config();
console.log(process.env.GOOGLE_CLIENT_ID);
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const app = express();

// app.use(async (req, res, next) => {
//   const user = await db.User.findFirst({where: { id:  req.session.userId }})
//   req.user = user
//   next()
// })
app.get("/me", async (req, res) => {
  res.status(200)
  res.json(req.user)
})

app.post("/api/v1/auth/google", async (req, res) => {
  const { token } = req.body
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID
  });
  const { name, email, picture } = ticket.getPayload();
  const user = await db.User.upsert({
    where: { email: email },
    update: { name, picture },
    create: { name, email, picture }
  });
  
  req.session.userId = user.id;
  res.status(201).json(user)
})

app.delete("/api/v1/auth/logout", async (req, res) => {
  await req.session.destroy()
  res.status(200)
  res.json({
      message: "Logged out successfully"
  })
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`)
});
