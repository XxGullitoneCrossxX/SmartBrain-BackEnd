
const handledImageEntries = (postgres) =>(req,res) => {

const {id} = req.body;

postgres('users').returning('entries')
  .where('id', '=', id)
  .increment('entries', 1)
  .then(
  	data => {
  		console.log(data);
  		res.json(data[0]);}
  	)
  .catch(err => res.json('Entries was not updated, User not found'));
		
}

module.exports = {
	handledImageEntries : handledImageEntries
}