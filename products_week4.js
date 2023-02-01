import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.31/vue.esm-browser.min.js";
import pagination from "./pagination.js";

const site = "https://vue3-course-api.hexschool.io";
const api_path = "david-2023vue";

let productModal = {};
let delProductModal = {};

const app = createApp({
    data(){
        return{
            products: [],
            tempProduct:{
                imagesUrl: [],
            },
            isNew:false,  //用來確認是編輯或者新增
            page: {},
            imgFile:"", //圖片內容
        }
    },
    components:{
        pagination
    },
    methods:{
        //帳號驗證
        checkLogin() {
            const url = `${site}/v2/api/user/check`;
            axios.post(url)
                .then((res) => {
                    console.log(res);
                    this.getProducts();
                })
                .catch((err) => {
                    console.log(err);
                    window.location = './login.html';
                })
        },
        //取得產品列表
        getProducts(page=1){
            const url = `${site}/v2/api/${api_path}/admin/products/?page=${page}`;
            axios.get(url)
                .then((res)=>{
                    console.log(res);
                    this.products = res.data.products;
                    this.page = res.data.pagination;
                })
                .catch((err)=>{
                    console.log(err)
                })
        },
        //打開新增產品modal
        openModal(status, product){
            if(status === 'create'){
                this.isNew = true;
                //帶入初始化資料
                this.tempProduct = {
                    imagesUrl:[],
                };
                productModal.show();
            }else if(status ==='edit'){
                this.isNew = false;
                //會帶入當前要編輯的資料
                this.tempProduct = {...product};
                //如果多圖的部分有陣列，就直接打開modal
                if(this.tempProduct.imagesUrl){
                    productModal.show();
                }else{ //如果沒有多圖的部分，先補上一個空陣列，再打開modal
                    this.tempProduct.imagesUrl = [];
                    productModal.show();
                }
            }else if(status === 'delete'){ //如果參數是delete
                this.tempProduct = {...product} ; //等等要取id用
                this.tempProduct.imagesUrl = [];
                delProductModal.show(); //打開delProduct的Modal
            }
        },
        //打新增產品api或者編輯產品api
        updateProduct(){
            let url ='';
            let methods = '';
            //如果是新增產品的狀況時
            if(this.isNew){
                url = `${site}/v2/api/${api_path}/admin/product`;
                methods = 'post';
            }
            //如果是編輯產品的狀況時(isNew是false時)
            if (!this.isNew){
                //將url改成有id的
                url = `${site}/v2/api/${api_path}/admin/product/${this.tempProduct.id}`;
                //將methods改成post
                methods = 'put'
            }
            axios[methods](url, {data: this.tempProduct})
                .then((res)=>{
                    console.log(res);
                    this.getProducts();
                    productModal.hide(); //送出後關閉modal
                })
                .catch((err)=>{
                    console.log(err)
                })
        },
        //刪除刪品API
        deleteProduct(){
            const url = `${site}/v2/api/${api_path}/admin/product/${this.tempProduct.id}`;
            axios.delete(url)
                .then((res)=>{
                    console.log(res)
                    this.getProducts();
                    delProductModal.hide(); //關閉delProductModal
                })
                .catch((err)=>{
                    console.log(err)
                })
        },
        //上傳圖片API
        uploadImage(){
            const fileInput = document.querySelector('#imgFile');
            const file = fileInput.files[0];
            const formData = new FormData();
            formData.append('file-to-upload', file);
            const url = `${site}/v2/api/${api_path}/admin/upload`
            axios.post(url, formData)
                .then((res) => {
                    console.log(res);
                    this.tempProduct.imagesUrl = [];
                    this.imgFile = res.data.imageUrl;
                    console.log(this.imgFile)
                })
                .catch((err) => {
                    console.log(err.response);
                })
        },
        //複製文字
        copyUrl(){
            if (this.imgFile==""){
                alert('請先放入圖片');
                return
            }else{
                navigator.clipboard.writeText(this.imgFile);
            }
        }

    },
    mounted(){
        const cookieValue = document.cookie
            .split('; ')
            .find((row) => row.startsWith('davidToken='))
            ?.split('=')[1];
        axios.defaults.headers.common['Authorization'] = cookieValue;
        this.checkLogin();
        productModal = new bootstrap.Modal(document.getElementById('productModal'), {
            keyboard: false
        });
        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
            keyboard: false
        });
    }
})

//全域元件
//新增、修改modal
app.component('product-modal',{
    props: ['tempProduct', 'updateProduct', 'uploadImage', 'imgFile','copyUrl'],
    template: '#product-modal-template',
})
//刪除modal
app.component('delete-product-modal',{
    props: ['tempProduct', 'deleteProduct'],
    template: '#delete-product-modal-template'
})
app.mount("#app")