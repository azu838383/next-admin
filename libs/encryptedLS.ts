import SecureLS from "secure-ls";

let secureLS: any;
try {
	secureLS = new SecureLS({ encodingType: "aes", isCompression: true });
} catch (err) {
	if (typeof window !== "undefined") {
		window.localStorage.clear();
		secureLS = new SecureLS({ encodingType: "aes", isCompression: true });
	}
}

const encryptedLS = !process.browser
	? secureLS
	: {
			get: (key: any) => {
				try {
					return secureLS.get(key);
				} catch (err) {
					console.warn("encryptedLS.get", err);
					localStorage.clear();
				}
			},
			set: (key: any, obj: any) => {
				try {
					return secureLS.set(key, obj);
				} catch (err) {
					console.warn("encryptedLS.set", err);
					localStorage.clear();
				}
			},
	  };
export default encryptedLS;

// export default secureLS;
