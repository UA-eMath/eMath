
const local = true;
const domain = local ? "http://localhost" : "somewhere.backend";

export default {
    domain: domain,
    port: 8000,
    endpoints: {
    	roots:{
    		address:'database',
		    methods:['GET']
	    },
    }
}