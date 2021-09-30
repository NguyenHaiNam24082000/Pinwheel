import { auth } from "../firebase";
const axios = require("axios").default;
const postNewUser = async (user) => {
    await axios.post("/api/user/post", user)
        .then((response) => {

                // use/access the results
                console.log(response);
            })
        .catch((errors) => {
            // react on errors.
            console.error(errors);
        });
};

const getUserInfo = async () => {
    const res = await axios.get(`/api/user/getInfo?email=${auth.currentUser.email}`)
    return res;
};


export { getUserInfo };
export { postNewUser };
