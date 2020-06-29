
const handledSignin = (postgres,bcrypt) =>(req,res) => {

postgres.select('*').from('login')
	.where(
		'email','=',req.body.email
	)
	.then(
		data => {
			
      if(bcrypt.compareSync(req.body.password, data[0].hash))
      {

      	postgres.returning('*').select('*').from('users')
      	.where('email','=',req.body.email)
      	.then( user => {
      		res.json(user[0]);
      	})
      }
		}).catch( error => {
			res.status(400).json("LOGIN FAILED,INVALID CREDENTIALS");
		})
		
}

module.exports = {
	handledSignin : handledSignin
}