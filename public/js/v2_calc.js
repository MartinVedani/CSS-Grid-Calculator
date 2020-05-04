/*  Tutorial videos v1: https://www.youtube.com/watch?v=LHKu6oDyZwg&feature=youtu.be 
                    https://www.youtube.com/watch?v=LNGNJa0bCV8&feature=youtu.be 
                    
                    v2_FIREBASE: https://www.youtube.com/watch?v=LNGNJa0bCV8&feature=youtu.be*/

const calc = Vue.component('calc', {
    props: ['db', 'userdata', 'history'],
    data() {
        return {
            numbers: [{ name: 'zeroo', value: 0 }, { name: 'one', value: 1 }, { name: 'two', value: 2 }, { name: 'three', value: 3 }, { name: 'four', value: 4 }, { name: 'five', value: 5 }, { name: 'six', value: 6 }, { name: 'seven', value: 7 }, { name: 'eight', value: 8 }, { name: 'nine', value: 9 }, { name: 'float', value: '.' }],

            /* el nombre de zeroo lo q tengo q escribir con dos "o" porque zero con 1 sola 0 es una variable reservada de css */

            ops: [{ name: 'plus', value: '+' }, { name: 'minus', value: '-' }, { name: 'by', value: '*' }, { name: 'divided', value: '/' }],

            actions: [{ name: 'equal', value: '=' }, { name: 'clear', value: 'C' }, { name: 'backspace', value: '<<' }, { name: 'sqrt', value: '√' }, { name: 'power', value: '^2' }],

            output: []
        }
    },

    methods: {
        print(key) {
            if (this.output.includes('SyntaxError')) {
                this.output = []
            }
            this.output.push(key.value)
                /* agrega el valor de la tecla donde se hizo click en al array output */
        },

        handleFunction(function_name) {
            return this[function_name]()
        },

        clear() {
            this.output = []
        },

        backspace() {
            if (this.output.includes('SyntaxError')) {
                this.output = []
            }
            this.output.pop()
        },

        equal() {
            try {
                let calc = this.output
                this.output = [eval(this.output.join(''))]
                this.db.ref('/calc/' + this.userdata.uid).push({
                    calcArray: calc,
                    calcString: calc.join(''),
                    result: this.output.join('')
                })

                /* las referencias a la base de datos funciona como estructura de árbol de carpetas aca cada usuario tendra su propia carpeta de caluclos identificada con su id de usuario (único) */

            } catch (error) {
                this.output = [error.name]
            }
        },

        sqrt() {
            try {
                let calc = this.output
                this.output = [Math.sqrt(this.output.join(''))]
                this.db.ref('/calc/' + this.userdata.uid).push({
                    calcArray: calc,
                    calcString: '√ ' + calc.join(''),
                    result: this.output.join('')
                })
            } catch (error) {
                this.output = [error.name]
            }
        },

        power() {
            try {
                let calc = this.output
                this.output = [Math.pow(this.output.join(''), 2)]
                this.db.ref('/calc/' + this.userdata.uid).push({
                    calcArray: calc,
                    calcString: calc.join('') + '^2',
                    result: this.output.join('')
                })
            } catch (error) {
                this.output = [error.name]
            }
        }
    },

    computed: {
        fancyOutput() {
            return this.output.map(e => this.ops.some(op => e == op.value) || e == 'SyntaxError' ? `<span style="color:red"> ${e} </span>` : e)
        }
    },

    template: `

        <div id='calc-container' class="container">
            <div class="flex-container">

                <div id="calc">
                    <div v-for="number in numbers" v-bind:id="number.name" v-bind:style=" 'grid-area:' + number.name " class="key" @click="print(number)"> {{number.value}} </div>

                    <div v-for="op in ops" v-bind:id="op.name" v-bind:style=" 'grid-area:' + op.name " class="key op" @click="print(op)"> {{op.value}} </div>

                    <div v-for="action in actions" v-bind:id="action.name" v-bind:style=" 'grid-area:' + action.name " @click="handleFunction(action.name)">{{action.value}} </div>
                </div>

                <div id="output"><template v-for="value in fancyOutput"><span v-html="value"></span></template></div>

                <!-- fancyOutput return an HTML string, so we need Vue to read the result as such in between "span" to display properly-->

            </div>
            <calchistory @sendcalc="output = $event" @sendresult="output = $event" :history="history"></calchistory>

            <!-- prop history belongs to element <calchistory>, which was created in file calc_history.js and gets its  v-bind values from data object calcHistory in main.js 
            
            In the opposite direction, with $event in  @sendcalc we are receiving data/indormation back from calchistory (a child element) back up towards calc (the parent element).

            -->

        </div> 

    `
        /* Un template va entre ` ` y no puede tener divs hermanos a la misma altura, así que creamos un 1 div padre con id calc-cointainer y class="container" para que aplique los estilos del .container en el css. */
})