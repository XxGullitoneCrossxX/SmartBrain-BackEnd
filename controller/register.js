
const handledRegister = (postgres,bcrypt) =>(req,res) => {

const {email,password,name} = req.body;

const hash = bcrypt.hashSync(password);

postgres.transaction( trx => {

 trx('login')
 .returning('email')
 .insert(
 {
 	email:email,
 	hash:hash
 }
 ).then( loginEmail => {

 	return trx('users')
	.returning('*')
	.insert(
		{
		name: name,
		email: loginEmail[0],
		joined: new Date()
		}
		).then(user => {
			res.json(user[0])
		})
		.catch(err => res.status(400).json('UNABLE TO REGISTER'))	
}).then(trx.commit)
.catch(error =>  {
  res.status(400).json('UNABLE TO REGISTER @(Login)');
  trx.rollback;
});

 })
.catch(error =>  {
  res.status(400).json('UNABLE TO REGISTER @(Login)');
});
}

module.exports = {
	handledRegister : handledRegister
}