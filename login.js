import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.31/vue.esm-browser.min.js";

const site = "https://vue3-course-api.hexschool.io";
const app = createApp({
    data(){
        return {
            user:{
                username: "",
                password: ""
            }
        }
    },
    methods:{
        login(){
            const url = `${site}/v2/admin/signin`;
            axios.post(url,this.user)
                .then((res)=>{
                    console.log(res);
                    const {expired, token} = res.data;
                    console.log(expired, token);
                    document.cookie = `davidToken=${token}; expires=${expired}`; //存cookie
                    window.location = './products_week4.html'
                })
                .catch((err)=>{
                    console.log(err);
                })
        }
    }
})
app.mount("#app");