<script>
    import {onMount} from "svelte";
    import { functions } from "../services/Firebase.js";
    import { httpsCallable } from "firebase/functions";
    import {calcularCoberturaSingular} from "../services/calculadorCoberturas.js";
    export let results;
    export let values;
    let pdfElement
    const generatePolizaPDF = httpsCallable(functions, "generatePolizaPDF");
    const policyData = {
        insuredName: "John Doe",
        policyNumber: "POL123456",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        coverages: [
            { type: "Life Insurance", description: "Covers accidental death." },
            { type: "Health Insurance", description: "Covers medical expenses." },
        ],
    };

    const onGenerate = async () => {
        try{
        const response = await generatePolizaPDF({policyData})
        const pdfBase64 = response.data.pdfBase64;
            const cleanedBase64 = pdfBase64.replace(/\s/g, "");
        // Convert Base64 to Blob
        const pdfBlob = new Blob(
            [Uint8Array.from(atob(cleanedBase64), (c) => c.charCodeAt(0))],
            { type: "application/pdf" }
        );
        const link = document.createElement("a");
        link.href = URL.createObjectURL(pdfBlob);
        link.download = "PolizaDeSeguro.pdf";
        link.click();

        console.log("PDF generated and downloaded.");
        }catch (error){
            console.error("Error generating PDF: ", error);
        }
    }

    function mock_calcularCoberturaSingular(cobertura, values, ag, impactoEconomico) {
        const tasaDeRiesgo = Math.random() * (0.2 - 0.01) + 0.01; // Simulating a random risk rate between 0.01 and 0.2
        const factorPuro = impactoEconomico * tasaDeRiesgo;
        const go = factorPuro * (Math.min(0.3 - (factorPuro / 100000), 0.3));
        const factorDeAjuste = 1 + (go / factorPuro) + (Math.log(1 + ag) / Math.log(1 + factorPuro));
        const factorReal = 1.22 * (factorPuro * factorDeAjuste);

        return {
            coberturaId: cobertura,
            prima: parseFloat(factorReal.toFixed(2)),
            indemnizacion: parseFloat(impactoEconomico.toFixed(2)),
            startingValue: parseFloat(impactoEconomico.toFixed(2)),
            agravos: ag,
            tasaDeRiesgo: tasaDeRiesgo
        };
    }
    $values = {
        plataforma: 'Instagram'
    }

    function mock_calculadorCoberturas(values, coberturas) {
        let resultados = [];
        for (const cobertura of coberturas) {
            const impactoEconomico = Math.floor(Math.random() * (50000 - 5000) + 5000); // Simulating economic impact between 5,000 and 50,000
            const ag = Math.random() * 2; // Simulating aggravating factors
            const result = mock_calcularCoberturaSingular(cobertura, values, ag, impactoEconomico);
            resultados.push(result);
        }

        return resultados;
    }

    // Mock test input
    const mock_values = {
        plataforma: "Instagram",
        numeroSeguidores: 50000,
        ingresoMensualDeclarado: 2000,
        ingresoDiarioDeclarado: 100,
        historial: 0.05,
        hackeo: 0.1,
        tipoContenido: 0.08,
        frecuenciaReportes: 0.05,
        tes: 30  // Assumed value for testing
    };

    // Running the test
    let mock_results = mock_calculadorCoberturas(mock_values, ["1", "2"]);
    console.log(results)


    const recalcularPrima = (indemnizacion) => {
        const factorPuro =  indemnizacion * 0.03;
        const umbral = 1000000
        //necesitamos gastos operativos y agravantes
        //TOPE DE 1.8 PARA EL FACTOR DE AJUSTE
        //factor de ajuste = 1+ (GO/FP) + (ln(1+AGRAVANTES) / ln(1 + FP))
        // GO = FP * (0.3 - (fp/umbral))
        const go = factorPuro * (Math.min(0.3 - (factorPuro/umbral), 0.3))
        const ag = $values.historial + $values.medidasSeguridad + $values.hackeo + $values.tipoContenido + $values.reportes
        const factorDeAjuste = 1 + (go / factorPuro) + (Math.log(1 + ag) / Math.log(1 + factorPuro))
        const factorReal = 1.22 * (factorPuro * factorDeAjuste)
        return factorReal
    }
    const coberturaMap = {
        "1": {
            title: 'Perdida Total de Cuenta',
            description: 'Protegid@ ante la pérdida definitiva de acceso a tus cuentas digitales.',
        },
        "2": {
            title: 'Perdida temporal de Cuenta',
            description: 'Protegid@ ante la pérdida temporal de acceso a tus cuentas digitales.',
        },
        "3": {
            title: 'Responsabilidad civil por daños a terceros',
            description: 'Protegid@ ante la responsabilidad por daños a terceros.',
        }
    }
    const platformIcons = {
        Facebook: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Facebook</title><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/></svg>`,
        X: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>X</title><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>`,
        YouTube: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>YouTube</title><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
        Instagram: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839"/></svg>`,
        TikTok: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>TikTok</title><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`,
        Twitch: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitch</title><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/></svg>`
    };

    const handleInput = (event, index) => {
        let newValue = Number(event.target.value);
        results[index].indemnizacion = newValue
        const cobertura = results[index]
        results[index].prima = parseFloat(calcularCoberturaSingular(cobertura.coberturaId, cobertura.agravos, newValue ,cobertura.tasaRiesgo).toFixed(2))
    }
    $: primaTotal = Array.isArray(results) && results.length > 0
        ? parseFloat(results.reduce((acc, cobertura) => acc + (Number(cobertura.prima) || 0), 0).toFixed(2))
        : 0;
    let billingCycle = "Mensual"; // Default state

    function toggleBilling() {
        billingCycle = billingCycle === "Mensual" ? "Anual" : "Mensual";
    }
    function getPrimaWithBillingCycle(prima) {
        return billingCycle === "Mensual" ? parseFloat((prima / 12).toFixed(2)) : parseFloat((prima * 0.9).toFixed(2));
    }
</script>

<div class="pb-20 pt-10 flex flex-col md:flex-row md:space-x-16 space-y-6 px-4 md:space-y-0 md:px-0">
    <div>
        <h1 class="  font-bold sm:text-xl">Tus coberturas</h1>
        <div class="mt-6 space-y-5">
            {#each results as cobertura, index}
                <div class="bg-white p-4 shadow-lg space-y-3 rounded-2xl">
                    <div class="flex items-center space-x-3">
                        <div class="w-[25px] h-[25px] flex items-center justify-center bg-gray-50 rounded-2xl">
                            <img src="/{cobertura.coberturaId}.svg" alt="">
                        </div>
                        <h2 class="text-[20px] font-semibold">{coberturaMap[cobertura.coberturaId].title}</h2>

                    </div>
                    <div>
                        <p class="text-sm">{coberturaMap[cobertura.coberturaId].description}</p>
                    </div>
                    <div class="flex items-center justify-between">
                        <div>
                            <p>Tarifa {billingCycle}</p>
                            <p class="text-xl font-semibold primary-text">${getPrimaWithBillingCycle(cobertura.prima)}</p>
                        </div>
                        <div>
                            <p>Indemnizacion</p>
                            <div class="text-xl font-semibold primary-text flex items-center gap-1">
                                <span>$</span>
                                <input
                                        type="number"
                                        value={cobertura.indemnizacion}
                                        on:input={(e) => handleInput(e, index)}
                                        class="border rounded px-2 py-1 primary-text focus:outline-none focus:ring-2
             focus:ring-primary w-32" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <input
                                type="range"
                                min="{cobertura.startingValue}"
                                max="{cobertura.startingValue * 2}"
                                value={cobertura.indemnizacion}
                                on:input={(e) => handleInput(e, index)}
                                class="w-full h-2 rounded-full appearance-none bg-gray-300
        [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full
        [&::-webkit-slider-runnable-track]:bg-gradient-to-r [&::-webkit-slider-runnable-track]:from-purple-500 [&::-webkit-slider-runnable-track]:to-blue-500
        [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full
        [&::-moz-range-track]:bg-gradient-to-r [&::-moz-range-track]:from-purple-500 [&::-moz-range-track]:to-blue-500
        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
        [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gray-400
        [&::-webkit-slider-thumb]:shadow-md /* Adds a subtle shadow for better visibility */
        [&::-webkit-slider-thumb]:-mt-1 /* Fix thumb alignment */
        [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4
        [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:rounded-full
        [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-gray-400
        [&::-moz-range-thumb]:shadow-md
        [&::-moz-range-thumb]:-mt-1"
                        />
                    </div>
                </div>
            {/each}
        </div>
    </div>
    <div class="">
        <div class="bg-[#E7E7E7] p-8 rounded-2xl space-y-3">
            <p class="text-2xl font-semibold">Tarifa Total</p>
            <div class="flex space-x-1">
                <h4 class="font-semibold ">Plataforma cubierta:</h4>
                <div class="primary-text font-semibold"> {$values.plataforma}</div>
            </div>
            <div class="flex md:w-[440px] items-center justify-center p-4">
                <div
                        class="relative w-full h-[60px] bg-gray-300 rounded-full flex items-center p-1 cursor-pointer"
                        on:click={toggleBilling}
                >
                    <!-- Animated Toggle -->
                    <div
                            class="{billingCycle === 'Anual'? 'md:translate-x-48 translate-x-36':''} absolute left-1 top-1 h-[50px] w-1/2 flex items-center justify-center bg-white  rounded-full shadow-md transition-transform duration-300"

                    ><span class="primary-text font-bold text-lg">{billingCycle}</span></div>

                    <!-- Labels -->
                    <div class="flex w-full justify-around px-4 text-lg font-semibold">
                        <span class="text-gray-600">
                            Mensual
                        </span>
                                    <span class="text-gray-600">
                            Anual
                        </span>
                    </div>
                </div>
            </div>
            <p class="text-3xl font-bold">${getPrimaWithBillingCycle(primaTotal)} {#if billingCycle === 'Anual'} <span class="text-sm text-gray-600">(10% descuento por tarifa anual)</span> {/if}</p>
            <button class="w-full bg-primary px-4 py-3 rounded-full bg-white border-2 border-primary font-semibold">Asegurarme</button>
        </div>
    </div>
</div>
