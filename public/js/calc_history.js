const calcHistory = Vue.component('calchistory', {
    props: ['history'],
    data() {
        return {}
    },

    methods: {
        sendCalc(calc) {
            this.$emit("sendcalc", calc) //calc is already an array so it does not need [] like result in sendResult
        },

        sendResult(result) {
            this.$emit("sendresult", [result]) //output works as array so you have to send result as an array by adding []
        }
    },

    template: `
      <div id="calc-history">
        <ul>
          <li v-for="calc in history" >

            <span @click="sendCalc(calc.calcArray)"> {{calc.calcString}} </span> = <span @click="sendResult(calc.result)"> {{calc.result}} </span>

            <!-- pasamos el calc array para que vuleva a funcionar con la calculadora -->

          </li>
        </ul>
      </div>
    `
})

// siempre utilizamos props para pasar informacion y objetocs de padres a hijos. En sendCalc, debemos pasar informacion desde desde calc_history que es un hijo hacia cal que es un elemento padre. Para esto debemos crear un evento utilizando "$emit".