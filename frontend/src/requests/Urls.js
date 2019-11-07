
const local = true;
const domain = local ? "http://localhost" : "http://142.244.163.57";

export default {
    domain: domain,
    port: local ? 8000 : 9000,
    endpoints: {
    	roots:{
    		address:'database',
		    methods:['GET']
	    },
    }
}