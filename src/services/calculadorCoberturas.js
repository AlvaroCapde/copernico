const riesgoPorCuenta = (plataforma, cobertura) => {
    const riesgos = {
        Instagram: { "1": 0.03, "2": 0.07, "3": 0.005 },
        Facebook: { "1": 0.04, "2": 0.08, "3": 0.006 },
        TikTok: { "1": 0.025, "2": 0.06, "3": 0.01 },
        Youtube: { "1": 0.02, "2": 0.05, "3": 0.015 },
        X: { "1": 0.03, "2": 0.07, "3": 0.02 },
        Twitch: { "1": 0.015, "2": 0.03, "3": 0.005 },
        LinkedIn: { "1": 0.01, "2": 0.03, "3": 0.002 }
    };
    return riesgos[plataforma]?.[cobertura] || null;
};
const valorPorSeguidores = (seguidores) => {
    if (seguidores <= 10000) return seguidores * 1.00;
    if (seguidores <= 100000) return seguidores * 0.80;
    if (seguidores <= 500000) return seguidores * 0.60;
    if (seguidores <= 1000000) return seguidores * 0.40;
    if (seguidores <= 5000000) return seguidores * 0.30;
    if (seguidores <= 10000000) return seguidores * 0.20;
    return seguidores * 0.10;
};
const gastoOperativo = (factorPuro, umbral) => {
    return factorPuro * (Math.min(0.3 - (factorPuro/umbral), 0.3))
}
const getFactorDeAjuste = (factorPuro, go, agravantes) => {
    return 1 + (go / factorPuro) + (Math.log(1 + agravantes) / Math.log(1 + factorPuro))
}

const umbral = {
    "1": 1000000,
    "2": 100000,
    "3": 1000000
}
const valueMap = {
    personal_familiar: { "1": 0.00, "2": 0.00, "3": 0.00 },
    educativo_cultural: { "1": 0.05, "2": 0.04, "3": 0.03 },
    entretenimiento_deportes: { "1": 0.05, "2": 0.05, "3": 0.05 },
    humor_memes: { "1": 0.07, "2": 0.08, "3": 0.08 },
    finanzas_negocios: { "1": 0.10, "2": 0.10, "3": 0.12 },
    opiniones_conspiraciones: { "1": 0.12, "2": 0.13, "3": 0.15 },
    noticias_activismo: { "1": 0.15, "2": 0.15, "3": 0.18 },
    contenido_adulto: { "1": 0.20, "2": 0.20, "3": 0.20 }
};

function getTiempoEstimadoSuspensionPorCategoria(label) {
    switch (label) {
        case 'Personal / Familiar':
            return 7.5; // Similar a "Cuenta personal sin actividad comercial"
        case 'Educativo / Cultural':
            return 14;  // Se aproxima a un riesgo moderado
        case 'Entretenimiento / Deportes / Lifestyle':
            return 18;  // Más probabilidad de strikes que el educativo
        case 'Humor / Memes / Reacciones':
            return 21;  // Sube más el riesgo (parodias, copyright, etc.)
        case 'Finanzas / Criptomonedas / Negocios':
            return 26;  // Riesgo mayor (posible spam, estafas denunciadas, etc.)
        case 'Opiniones Polémicas / Conspiraciones':
            return 37;  // Muy alto riesgo de reportes
        case 'Noticias / Activismo / Política':
            return 37;  // Riesgo similar a opiniones polémicas
        case 'Contenido adulto / Apuestas / Violencia':
            return 52;  // Máximo riesgo de bloqueos o suspensiones
        default:
            // Por si la etiqueta no coincide, devolvemos un mínimo o un genérico
            return 7.5;
    }
}

export function calcularCoberturaSingular(cobertura, ag, impactoEconomico, tasaDeRiesgo){
    const factorPuro = impactoEconomico * tasaDeRiesgo
    const go = gastoOperativo(factorPuro, umbral[cobertura])
    const factorDeAjuste = getFactorDeAjuste(factorPuro, go, ag)
    return 1.22 * (factorPuro * factorDeAjuste)
}
function getCompensation(followers) {
    if (followers < 10000) {
        return 50000;
    } else if (followers >= 10000 && followers <= 100000) {
        return 200000;
    } else if (followers > 100000 && followers <= 500000) {
        return 750000;
    } else {
        return 1500000;
    }
}


export function calculadorCoberturas(values, coberturas) {
    let resultados = []
    for(const cobertura of coberturas) {
        const tasaRiesgo = riesgoPorCuenta(values.plataforma, cobertura)
        if(cobertura === "1") {
            const impactoEconomico = valorPorSeguidores(values.numeroSeguidores) + 1000 + (values.ingresoMensualDeclarado *6)
            //TOPE DE 1.8 PARA EL FACTOR DE AJUSTE
            console.log(values.tipoContenido[cobertura])
            const ag = values.historialSuspension + values.hackeo + values.tipoContenido[cobertura] + values.frecuenciaReportes
            const prima = calcularCoberturaSingular(cobertura, ag, impactoEconomico, tasaRiesgo)
            resultados.push({tasaRiesgo ,agravos: ag ,coberturaId: cobertura, prima: prima.toFixed(2) , indemnizacion: impactoEconomico, startingValue: impactoEconomico})
        }else if(cobertura === "2") {

            const tes = getTiempoEstimadoSuspensionPorCategoria(values.tipoContenido.name)
            const impactoEconomico = Math.ceil(tes * values.ingresoMensualDeclarado / 30)
            const ag = values.historialSuspension + values.frecuenciaReportes + values.tipoContenido[cobertura] + (values.numeroSeguidores * 0.000005)
            const prima = calcularCoberturaSingular(cobertura, ag, impactoEconomico, tasaRiesgo)
            resultados.push({tasaRiesgo, agravos: ag ,coberturaId: cobertura, prima: prima.toFixed(2) , indemnizacion: impactoEconomico, startingValue: impactoEconomico})

        }else if (cobertura === "3") {
            const impactoEconomico = 100000 + getCompensation(values.numeroSeguidores)
            // const factorPuro = tasaRiesgo
            const ag = values.frecuenciaReportes + values.tipoContenido[cobertura]
            const prima = calcularCoberturaSingular(cobertura, ag, impactoEconomico, tasaRiesgo)
            resultados.push({tasaRiesgo, agravos: ag ,coberturaId: cobertura, prima: prima.toFixed(2) , indemnizacion: impactoEconomico, startingValue: impactoEconomico})

        }
    }
    return resultados
}