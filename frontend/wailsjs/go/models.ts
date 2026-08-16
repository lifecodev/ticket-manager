export namespace backend {
	
	export class User {
	    id: number;
	    login: string;
	    PasswordHash: string;
	    name: string;
	
	    static createFrom(source: any = {}) {
	        return new User(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.login = source["login"];
	        this.PasswordHash = source["PasswordHash"];
	        this.name = source["name"];
	    }
	}

}

