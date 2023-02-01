import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.31/vue.esm-browser.min.js";
const site = "https://vue3-course-api.hexschool.io";
const api_path = 'david-2023vue'

const app = createApp({
    data(){
        return{
            products:[],
            tempProduct:{}
        }
    },
    methods:{
        checkLogin(){
            const url = `${site}/v2/api/user/check`;
            console.log(url)
            axios.post(url)
                .then((res)=>{
                    console.log(res);
                    this.getProducts();
                })
                .catch((err)=>{
                    console.log(err);
                    window.location='./login.html'
                })
        },
        getProducts(){
            const url = `${site}/v2/api/${api_path}/admin/products`;
            axios.get(url)
                .then((res)=>{
                    this.products = res.data.products;
                })
                .catch((err)=>{
                    console.log(err)
                })
        }
    },
    mounted(){
        const cookieValue = document.cookie
            .split('; ')
            .find((row) => row.startsWith('davidToken='))
            ?.split('=')[1];
        console.log(cookieValue);//token內容
        axios.defaults.headers.common['Authorization'] = cookieValue;
        this.checkLogin();
    }
})
app.mount('#app');