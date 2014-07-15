//processes the given nic number and sends the appropriate reply
//


var process=function process(number,res){

	var votingPower;
	var year;
	var gender;
	var birthYear;
	var birthMonth;
	var birthDate;
	var serialNumber;
	var birthDay;
	var fullBirthday;
	var age;

	console.log("Checking number: "+number);

	if(number === undefined || number === ''){
			console.log("Bad NIC number: "+number+"\n");
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
			console.log("Bad NIC number: "+number+"\n");
			res.writeHead(400, {"Content-Type": "text/plain"});
			res.write("400 Bad Request. Please send a valid NIC number for Sri Lanka.");
			res.end();

		}
		//process the nic
		else{
			//get the year
			//todo - what about people who have born after 2000 who haven't got an NIC yet?
			birthYear=parseInt("19"+number.slice(0,2));


			//get the birth date and gender
			var days=number.slice(2,5);
			days = parseInt(days);

			if(days>500){
				gender="Female";
				days=days-500;

			}
			else{
				gender="Male";
			}


			var mon =
                {
                    "1": ["Jan", 31],
                    "2": ["Feb", 29],
                    "3": ["Mar", 31],
                    "4": ["Apr", 30],
                    "5": ["May", 31],
                    "6": ["Jun", 30],
                    "7": ["Jul", 31],
                    "8": ["Aug", 30],
                    "9": ["Sep", 31],
                    "10": ["Oct", 31],
                    "11": ["Nov", 30],
                    "12": ["Dec", 31]
                };

            var key;
            for (key in mon)
            {
                if (days > mon[key][1])
                {
                    days = days - mon[key][1];
                }
                else
                {
                    break;
                }
            }

            birthMonth= mon[key][0];
            birthDate=days;

            //get age too
            fullBirthday=new Date(birthYear,parseInt(key)-1,birthDate+1);
            var ageDifMs = Date.now() - fullBirthday.getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            age = ageDate.setUTCFullYear(Math.abs(ageDate.getUTCFullYear() - 1970))


            //get day of week of the b'day
            birthDay=fullBirthday.getDay()-1;

            //get serial number
            serialNumber=parseInt(number.slice(5,8));


			res.json(
				{ 	
					number: number, 
					votingPower: votingPower,
					gender: gender,
					birthYear : birthYear,
					birthMonth: birthMonth,
					birthDate: birthDate,
					birthDay: birthDay,
					age: ageDate,
					fullBirthday: fullBirthday,
					serialNumber: serialNumber 
				}

				);
			console.log("NIC details: "+number+"-"+votingPower+"-"+gender+"-"+birthYear+"-"+birthMonth+"-"+birthDate+"\n");
			res.end();
		}

		

		
	}




}

exports.process=process;