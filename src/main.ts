import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import './style.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret, faHouse, faListCheck } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(store, key).use(router).mount('#app')
