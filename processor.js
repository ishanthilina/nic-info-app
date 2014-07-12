//processes the given nic number and sends the appropriate reply
//


var process=function process(number,res){

	var votingPower;

	if(number === 'undefined' || number === ''){
			
			res.writeHead(400, {"Content-Type": "text/plain"});
			res.write("400 Bad Request. Please send a valid NIC number for Sri Lanka.");
			res.end();
	}
	else{

		//if the last character is a letter , get the voting power
		if(number.slice(-1).toLowerCase().match(/[a-zA-Z]/g)){
			var char=number.slice(-1);
			if(char.toLowerCase() === "v"){
				votingPower=true;
			}
			else{
				votingPower=false;
			}
			number=number.slice(0, - 1);
			//console.log("Trimmed");
		}

		//if the number contains any other characters than numbers or the length is incorrect
		if(!(/^\d+$/.test(number)) || number. length != 9){
			console.log("Bad NIC number: "+number);
			res.writeHead(400, {"Content-Type": "text/plain"});
			res.write("400 Bad Request. Please send a valid NIC number for Sri Lanka.");
			res.end();

		}
		//process the nic
		else{
			res.json({ number: number, votingPower: votingPower });
			res.end();
		}

		

		
	}




}

exports.process=process;