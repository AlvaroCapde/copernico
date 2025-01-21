
export function calculadorCoberturas(values, coberturas) {
    let prima = 0;
    let indemnizacion = 0;
    let deducibles = 0;
    for(const cobertura of coberturas) {
        let factorDeAjuste = 0;
        if(cobertura === "1") {
            const tasaRiesgo = 0.025
            factorDeAjuste = values.historial + values.medidasSeguridad + values.frecuenciaUso + values.tipoContenido + values.interaccionUsuarios
            prima = prima + (tasaRiesgo * factorDeAjuste * values.valorDeclarado)
            indemnizacion = indemnizacion + values.valorDeclarado;
        }else if(cobertura === "2") {
            const tasaRiesgo = 0.15
            const duracionPromedio = 4.0
             factorDeAjuste = values.historial + values.medidasSeguridad + values.frecuenciaUso + values.tipoContenido + values.interaccionUsuarios
            prima = prima + (tasaRiesgo * factorDeAjuste * values.ingresoDiarioDeclarado * duracionPromedio)
            indemnizacion = indemnizacion + values.ingresoDiarioDeclarado;
            break;
        }else if (cobertura === "3") {
            const tasaRiesgo = 0.04
            console.log(values)
            factorDeAjuste = values.tipoContenido + values.numeroSeguidores
            prima = prima + (tasaRiesgo * factorDeAjuste * values.coberturaSolicitada)
            indemnizacion = indemnizacion + values.coberturaSolicitada;
        }

    }
    return prima.toFixed(2)
}