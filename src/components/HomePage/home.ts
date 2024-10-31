import { defineComponent } from 'vue'
import TechTrendsVisualization from '../SolarSystem/SolarSystem.vue'

export default defineComponent({
    name: 'HomePage',
    components: {
        TechTrendsVisualization
    },
    data() {
        return {
            showVisualization: false
        }
    }
})