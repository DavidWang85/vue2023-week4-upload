// export default{
//     props: ['pages', 'getProducts'],
//     template: `<nav aria-label="Page navigation example">
//     {{pages}}
//     <ul class="pagination">
//         <li :class="{disabled: !pages.has_pre}" class="page-item">
//             <a @click.prevent="getProducts(pages.current_page -1)" class="page-link" href="#" aria-label="Previous">
//                 <span aria-hidden="true">&laquo;</span>
//             </a>
//         </li>

//         <li :class="{active: page === pages.current_page}" v-for="page in pages.total_pages" :key="page+'3'" class="page-item">
//             <a @click.prevent="getProducts(page)" class="page-link" href="#">
//                 {{page}}
//             </a>
//         </li>

//         <li class="page-item" :class="{disabled: !pages.has_next}">
//             <a @click.prevent="getProducts(pages.current_page +1)" class="page-link" href="#" aria-label="Next">
//                 <span aria-hidden="true">&raquo;</span>
//             </a>
//         </li>
//     </ul>
// </nav>`
// }

//emit方法
export default {
    props: ['pages'],
    template: `<nav aria-label="Page navigation example">
    <ul class="pagination">
        <li :class="{disabled: !pages.has_pre}" class="page-item">
            <a @click.prevent="$emit('change-page',pages.current_page -1)" class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>

        <li :class="{active: page === pages.current_page}" v-for="page in pages.total_pages" :key="page+'3'" class="page-item">
            <a @click.prevent="$emit('change-page', page)" class="page-link" href="#">
                {{page}}
            </a>
        </li>

        <li class="page-item" :class="{disabled: !pages.has_next}">
            <a @click.prevent="$emit('change-page',pages.current_page +1)" class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
</nav>`
}