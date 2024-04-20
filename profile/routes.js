import * as dao from "./dao.js";
import bcrypt from 'bcryptjs'; // JavaScript library for hashing and comparing password

export default function UserRoutes(app) {
    const createUser = async (req, res) => {
        try {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            const user = await dao.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    const findAllUsers = async (req, res) => {
        try {
            const users = await dao.findAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const findUserById = async (req, res) => {
        try {
            const user = await dao.findUserById(req.params.userId);
            if (user) {
                res.json(user);
            } else {
                res.status(404).send('User not found');
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const updateUser = async (req, res) => {
        try {
            await dao.updateUser(req.params.userId, req.body);
            res.send('User updated successfully');
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    const deleteUser = async (req, res) => {
        try {
            await dao.deleteUser(req.params.userId);
            res.send('User deleted');
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const signup = async (req, res) => {
        try {
            const { username, password } = req.body;
            const existingUser = await dao.findUserByUsername(username);
            if (existingUser) {
                return res.status(409).send('Username already exists');
            }
            req.body.password = bcrypt.hashSync(password, 10);
            const user = await dao.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    const signin = async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await dao.findUserByCredentials(username, bcrypt.hashSync(password, 10));
            if (user) {
                res.json(user);
            } else {
                res.status(401).send('Invalid credentials');
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const signout = async (req, res) => {
      req.session.destroy((err) => {
          if (err) {
              res.status(500).send('Error signing out');
          } else {
              res.send('Signed out successfully');
          }
      });
  };
  
    const profile = async (req, res) => {
      if (!req.session.userId) {
          return res.status(403).send('You must be logged in to view this page.');
      }    
      try {
          const user = await dao.findUserById(req.session.userId);
          if (!user) {
              res.status(404).send('User not found');
          } else {
              const { password, ...userWithoutPassword } = user._doc; 
              res.json(userWithoutPassword);
          }
      } catch (error) {
          res.status(500).send('Server error');
      }
  };
  

    const followUser = async (req, res) => {
        try {
            const { userId, targetUserId } = req.params;
            const updatedUser = await dao.followUser(userId, targetUserId);
            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const unfollowUser = async (req, res) => {
        try {
            const { userId, targetUserId } = req.params;
            const updatedUser = await dao.unfollowUser(userId, targetUserId);
            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/signup", signup);
    app.post("/api/signin", signin);
    app.post("/api/signout", signout);
    app.post("/api/profile", profile); //  GET request ?
    app.put("/api/users/:userId/follow/:targetUserId", followUser);
    app.put("/api/users/:userId/unfollow/:targetUserId", unfollowUser);
}
