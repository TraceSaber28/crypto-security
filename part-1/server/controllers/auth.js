const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          const matches = bcrypt.compareSync(password, users[i].passwordHash)
          if(matches){
            let usersToReturn = {...users[i]}
            delete usersToReturn.passwordHash
            res.status(200).send(usersToReturn)
          }
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        const {username, email, firstName, lastName, password} = req.body
        const salt = bcrypt.genSaltSync(5)
        const passwordHash = bcrypt.hashSync(password, salt)
        const newUser = {
          username,
          email,
          firstName,
          lastName,
          passwordHash
        }
        users.push(newUser)
        
        let usersToReturn = {...newUser}
        delete usersToReturn.passwordHash
        res.status(200).send(usersToReturn)
    }
}