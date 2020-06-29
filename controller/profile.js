
const handledProfileGet = (postgres,bcrypt) =>(req,res) => {

const {id} = req.params;


postgres
.select('*')
.from('users')
.where('id','=',id)
.then(data =>{
	if(data[0].id){
	console.log(data);
	res.json(data[0]);
	}
	else{
		res.json("NO SUCH USER");
		console.log("NO SUCH USER");
	}
}
	)
	.catch( err => {
		res.json("NO SUCH USER");
	})
		
}

module.exports = {
	handledProfileGet : handledProfileGet
}