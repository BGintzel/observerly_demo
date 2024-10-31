import { VisAxis, VisLine, VisXYContainer } from '@unovis/vue'

export default {
    components: {
        VisXYContainer,
        VisLine,
        VisAxis
    },

    data() {
        return {
            timeStep: 0.04383561*3,
            time: Date.parse("2000-01-01"),
            planets: [
                {
                    name: 'Mercury',
                    color: '#808080',
                    period: 8,
                    size: 8,
                    baseDistance: 58,
                    degree: 0,
                    angularSpeed: 45,
                    currentTime: Date.parse("2000-01-01"),
                    startDistance: 77,
                    currentDegree: 0
                },
                {
                    name: 'Venus',
                    color: '#FFA500',
                    period: 12,
                    size: 15,
                    baseDistance: 108.2,
                    degree: 0,
                    angularSpeed: 30,
                    currentTime: Date.parse("2000-01-01"),
                    startDistance: 38,
                    currentDegree: 0
                },
                {
                    name: 'Earth',
                    color: '#4169E1',
                    period: 16,
                    size: 16,
                    baseDistance: 149.6,
                    degree: 0,
                    angularSpeed: 22.5,
                    currentTime: Date.parse("2000-01-01"),
                    startDistance: 0,
                    currentDegree: 0
                },
                {
                    name: 'Mars',
                    color: '#FF4500',
                    period: 20,
                    size: 12,
                    baseDistance: 227.9,
                    degree: 0,
                    angularSpeed: 18,
                    currentTime: Date.parse("2000-01-01"),
                    startDistance: 54.6,
                    currentDegree: 0
                }
            ],
            distanceData: []
        }
    },

    computed: {
        planetsExceptEarth() {
            return this.planets.filter(p => p.name !== 'Earth')
        }
    },

    methods: {
        formatToMonth(seconds) {
            const date = new Date(seconds);
            return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        },

        updatePlanetPositions() {
            this.planets.forEach(planet => {
                planet.currentTime += this.timeStep;
                planet.currentDegree += planet.angularSpeed * this.timeStep;
                planet.currentDegree = planet.currentDegree % 360;
            });
        },

        generateDistanceData() {
            this.time +=86400000*3;
            return {
                time: this.time,
                Mercury: this.calculateDistance(this.planets[0]),
                Venus: this.calculateDistance(this.planets[1]),
                Mars: this.calculateDistance(this.planets[3])
            }
        },

        calculateDistance(planet) {
            return this.polarDistance(
                planet.baseDistance,
                planet.currentDegree,
                this.planets[2].baseDistance,
                this.planets[2].currentDegree
            );
        },

        polarDistance(r1,theta1,r2,theta2) {
            const theta1Rad = (theta1 * Math.PI) / 180;
            const theta2Rad = (theta2 * Math.PI) / 180;
            const deltaTheta = theta1Rad - theta2Rad;
            return Math.sqrt(
                r1 * r1 + r2 * r2 - 2 * r1 * r2 * Math.cos(deltaTheta)
            );
        },

        updateDistances() {
            this.updatePlanetPositions();
            const newData = this.generateDistanceData();
            this.distanceData = [...this.distanceData.slice(-365), newData];
        }
    },

    mounted() {
        setInterval(this.updateDistances, this.timeStep*1000);
    }
}